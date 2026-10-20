// テキストとブロックの相互変換（右クリックメニュー）
import { RegExpParser } from "https://unpkg.com/@eslint-community/regexpp@4/index.mjs"
import { regexGenerator } from "../generator.js"

const parser = new RegExpParser()

// escaped_special ブロックで表せる文字
const ESCAPABLE = "/\\^$().?[]-*{}|+"

// テキストとして扱うブロック（中身は生の正規表現）
const TEXT_TYPES = ["chars_input", "regex_input"]

/** 生の正規表現をそのまま持つブロック（ブロックで表せないものの受け皿にもなる） */
const text = (raw) => ({ type: "chars_input", fields: { TEXT: raw } })

/** ADD0, ADD1... を持つミューテーター付きブロック */
function listBlock(type, items, fields) {
  const inputs = {}
  items.forEach((block, i) => {
    if (block) inputs[`ADD${i}`] = { block }
  })
  return { type, fields, extraState: { itemCount: items.length }, inputs }
}

/** PATTERN 入力を1つ持つブロック */
function wrapBlock(type, pattern, fields) {
  const inputs = pattern ? { PATTERN: { block: pattern } } : {}
  return { type, fields, inputs }
}

/** 1文字分の専用ブロック（なければ null） */
function charBlock(raw) {
  if (raw === "\\t") return { type: "tab" }
  if (raw === "\\n") return { type: "newline" }
  if (raw.length === 2 && raw[0] === "\\" && ESCAPABLE.includes(raw[1]))
    return { type: "escaped_special", fields: { CHAR: raw[1] } }
  return null
}

/** 要素の並びをブロックの配列にする（専用ブロックのない文字は1つのテキストにまとめる） */
function elementsToBlocks(elements, convert) {
  const blocks = []
  let pending = ""
  for (const el of elements) {
    if (el.type === "Character" && !charBlock(el.raw)) {
      pending += el.raw
      continue
    }
    if (pending) blocks.push(text(pending))
    pending = ""
    blocks.push(convert(el))
  }
  if (pending) blocks.push(text(pending))
  return blocks
}

function alternativesToBlock(alternatives) {
  if (alternatives.length === 1) return alternativeToBlock(alternatives[0])
  return listBlock("choice", alternatives.map(alternativeToBlock))
}

function alternativeToBlock(alternative) {
  const blocks = elementsToBlocks(alternative.elements, elementToBlock)
  if (blocks.length === 0) return null
  if (blocks.length === 1) return blocks[0]
  return listBlock("join", blocks)
}

function characterSetToBlock(el) {
  switch (el.kind) {
    case "any":
      return { type: "dot" }
    case "digit":
      return { type: "dw", fields: { KIND: el.negate ? "D" : "d" } }
    case "word":
      return { type: "dw", fields: { KIND: el.negate ? "W" : "w" } }
    case "space":
      return { type: "s", fields: { KIND: el.negate ? "S" : "s" } }
    case "property": {
      const match = el.raw.match(/^\\[pP]\{(Script=)?([A-Za-z]\w*)\}$/)
      if (!match) return text(el.raw)
      const fields = {
        KIND: el.negate ? "P" : "p",
        SCRIPT: match[1] ?? "",
        PROPERTY: match[2],
      }
      return { type: "unicode_property", fields }
    }
  }
  return text(el.raw)
}

function quantifierToBlock(el) {
  const pattern = elementToBlock(el.element)
  const lazy = el.greedy ? "" : "?"
  let kind = el.raw.slice(el.element.raw.length)
  if (!el.greedy) kind = kind.slice(0, -1)
  if (kind === "?") return wrapBlock("question", pattern, { LAZY: lazy })
  if (kind === "*" || kind === "+")
    return wrapBlock("star_plus", pattern, { KIND: kind, LAZY: lazy })
  // {n}? は {n} と同じ意味だが、専用の入力欄がないのでテキストのまま残す
  if (/^\{\d+\}$/.test(kind) && el.greedy)
    return wrapBlock("quantit_exact", pattern, { COUNT: el.min })
  if (/^\{\d+,\}$/.test(kind))
    return wrapBlock("quantit_min", pattern, { COUNT: el.min, LAZY: lazy })
  if (/^\{\d+,\d+\}$/.test(kind))
    return wrapBlock("quantit_range", pattern, {
      MIN: el.min,
      MAX: el.max,
      LAZY: lazy,
    })
  return text(el.raw)
}

function elementToBlock(el) {
  switch (el.type) {
    case "Assertion":
      switch (el.kind) {
        case "start":
          return { type: "anchor_start" }
        case "end":
          return { type: "anchor_end" }
        case "word":
          return { type: "boundary", fields: { KIND: el.negate ? "B" : "b" } }
        case "lookahead":
        case "lookbehind":
          return wrapBlock("look", alternativesToBlock(el.alternatives), {
            LT: el.kind === "lookbehind" ? "<" : "",
            EQL: el.negate ? "!" : "=",
          })
      }
      break
    case "Group":
      // (?i:...) のような修飾子付きグループには対応するブロックがない
      if (el.modifiers) break
      return wrapBlock("group_noncapturing", alternativesToBlock(el.alternatives))
    case "CapturingGroup":
      if (el.name)
        return wrapBlock("group_named", alternativesToBlock(el.alternatives), {
          VAR: { name: el.name },
        })
      return wrapBlock("group", alternativesToBlock(el.alternatives))
    case "Backreference":
      if (el.ambiguous) break
      if (typeof el.ref === "number")
        return { type: "backreference", fields: { NUMBER: String(el.ref) } }
      return { type: "backreference_named", fields: { VAR: { name: el.ref } } }
    case "CharacterClass":
      if (el.unicodeSets) break
      return listBlock(
        "char_class",
        elementsToBlocks(el.elements, classElementToBlock),
        { NEGATE: el.negate ? "^" : "" }
      )
    case "CharacterSet":
      return characterSetToBlock(el)
    case "Character":
      return charBlock(el.raw) ?? text(el.raw)
    case "Quantifier":
      return quantifierToBlock(el)
  }
  return text(el.raw)
}

/** 文字クラスの中身の要素 */
function classElementToBlock(el) {
  switch (el.type) {
    case "CharacterClassRange": {
      // char_class_range は1文字（またはエスケープ1つ）しか入力できない
      const isSingle = (raw) => /^(?:[^\\]|\\.)$/.test(raw)
      if (!isSingle(el.min.raw) || !isSingle(el.max.raw)) break
      return {
        type: "char_class_range",
        fields: { START: el.min.raw, END: el.max.raw },
      }
    }
    case "CharacterSet":
      return characterSetToBlock(el)
    case "Character":
      return charBlock(el.raw) ?? text(el.raw)
  }
  return text(el.raw)
}

/** ワークスペースのフラグに合わせて正規表現テキストを解析する（失敗したら null） */
function parse(source, workspace) {
  const root = workspace.getBlocksByType("root")[0]
  const flags = root ? root.getFieldValue("FLAGS") : ""
  try {
    return parser.parsePattern(source, 0, source.length, {
      unicode: flags.includes("u"),
      unicodeSets: flags.includes("v"),
    })
  } catch {
    return null
  }
}

/** 変換の対象になるブロック（root は正規表現欄の中身。それ以外の値を持たないブロックは対象外） */
function getConvertTarget(block) {
  if (block.isInFlyout) return null
  if (block.type === "root") return block.getInputTargetBlock("PATTERN")
  return block.outputConnection ? block : null
}

/** root の正規表現欄につながっているか */
function isRootPattern(block) {
  const parent = block.getParent()
  return (
    parent?.type === "root" &&
    block.outputConnection.targetConnection === parent.getInput("PATTERN").connection
  )
}

/** 正規表現として使われている位置か（文字クラスや置換の中は文法が違うので対象外） */
function isRegexContext(block) {
  const target = block.outputConnection?.targetConnection
  if (!target) return true
  const check = target.getCheck()
  return !check || check.includes("regex")
}

function getText(block) {
  return block.getFieldValue(block.type === "regex_input" ? "PATTERN" : "TEXT")
}

/** ブロックを置き換える（つながっていた場所、またはその位置に新しいブロックを置く） */
function replaceBlock(oldBlock, state) {
  const workspace = oldBlock.workspace
  const connection = oldBlock.outputConnection.targetConnection
  const xy = oldBlock.getRelativeToSurfaceXY()
  if (!oldBlock.isShadow()) oldBlock.dispose(false)
  // recordUndo を付けないと作成が undo に記録されず、Ctrl+Z で元に戻せない
  const newBlock = Blockly.serialization.blocks.append(state, workspace, {
    recordUndo: true,
  })
  if (connection) connection.connect(newBlock.outputConnection)
  else newBlock.moveTo(xy)
  return newBlock
}

function blockify(target) {
  const source = getText(target)
  const ast = parse(source, target.workspace)
  const state = alternativesToBlock(ast.alternatives) ?? text("")
  Blockly.Events.setGroup(true)
  try {
    const newBlock = replaceBlock(target, state)
    // 変換で中身が変わってしまった場合（想定外の構文など）は元に戻す
    const [code] = regexGenerator.blockToCode(newBlock)
    if (code !== source) {
      console.warn(`ブロック化の結果が一致しません: ${source} → ${code}`)
      if (target.isShadow()) newBlock.dispose(false)
      else replaceBlock(newBlock, text(source))
    }
  } finally {
    Blockly.Events.setGroup(false)
  }
}

function textify(block) {
  const [code] = regexGenerator.blockToCode(block)
  Blockly.Events.setGroup(true)
  try {
    if (isRootPattern(block)) {
      // root の正規表現欄は、ブロックを外して下の shadow にテキストを入れる（直接書いた状態に戻す）
      const root = block.getParent()
      block.dispose(false)
      root.getInputTargetBlock("PATTERN").setFieldValue(code, "PATTERN")
    } else {
      replaceBlock(block, text(code))
    }
  } finally {
    Blockly.Events.setGroup(false)
  }
}

Blockly.ContextMenuRegistry.registry.register({
  id: "convert_to_blocks",
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  weight: 100,
  displayText: () => Blockly.Msg.CONVERT_TO_BLOCKS,
  preconditionFn: ({ block }) => {
    const target = getConvertTarget(block)
    if (!target) return "hidden"
    if (!TEXT_TYPES.includes(target.type) || !isRegexContext(target))
      return "disabled"
    return parse(getText(target), target.workspace) ? "enabled" : "disabled"
  },
  callback: ({ block }) => blockify(getConvertTarget(block)),
})

Blockly.ContextMenuRegistry.registry.register({
  id: "convert_to_text",
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  weight: 101,
  displayText: () => Blockly.Msg.CONVERT_TO_TEXT,
  preconditionFn: ({ block }) => {
    const target = getConvertTarget(block)
    if (!target) return "hidden"
    return TEXT_TYPES.includes(target.type) ? "disabled" : "enabled"
  },
  callback: ({ block }) => textify(getConvertTarget(block)),
})
