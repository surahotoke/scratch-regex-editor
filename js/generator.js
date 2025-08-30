export const regexGenerator = new Blockly.Generator("REGEX")
// コード生成

const Order = {
  ATOMIC: 0,
}
// ルートブロックのコード生成
regexGenerator.forBlock["root"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const flags = block.getFieldValue("FLAGS")
  const substitute = regexGenerator.valueToCode(
    block,
    "SUBSTITUTE",
    Order.ATOMIC
  )
  const data = {
    pattern: pattern,
    flags: flags,
    substitute: substitute,
  }
  return JSON.stringify(data)
}
regexGenerator.forBlock["regex_input"] = function (block) {
  const code = block.getFieldValue("PATTERN")
  return [code, Order.ATOMIC]
}

// 位置ブロックのコード生成
regexGenerator.forBlock["anchor_start"] = function (block) {
  const code = "^"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["anchor_end"] = function (block) {
  const code = "$"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["boundary"] = function (block) {
  const kind = block.getFieldValue("KIND")
  const code = `\\${kind}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["look"] = function (block) {
  const lt = block.getFieldValue("LT")
  const eql = block.getFieldValue("EQL")
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const code = `(?${lt}${eql}${pattern})`
  return [code, Order.ATOMIC]
}

// 文字ブロックのコード生成
regexGenerator.forBlock["chars_input"] = function (block) {
  const code = block.getFieldValue("TEXT")
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["dot"] = function (block) {
  const code = "."
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["dw"] = function (block) {
  const kind = block.getFieldValue("KIND")
  const code = `\\${kind}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["s"] = function (block) {
  const kind = block.getFieldValue("KIND")
  const code = `\\${kind}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["unicode_property"] = function (block) {
  const kind = block.getFieldValue("KIND")
  const script = block.getFieldValue("SCRIPT")
  const property = block.getFieldValue("PROPERTY")
  const code = `\\${kind}{${script}${property}}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["tab"] = function (block) {
  const code = "\\t"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["newline"] = function (block) {
  const code = "\\n"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["escaped_special"] = function (block) {
  const char = block.getFieldValue("CHAR")
  const code = `\\${char}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["char_class"] = function (block) {
  const negate = block.getFieldValue("NEGATE")
  const content = regexGenerator.valueToCode(block, "CONTENT", Order.ATOMIC)
  const code = `[${negate}${content}]`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["char_class_join"] = function (block) {
  const inputs = []
  for (let i = 0; i < block.itemCount_; i++) {
    const input = regexGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
    inputs.push(input)
  }
  const code = inputs.join("")
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["char_class_range"] = function (block) {
  const start = block.getFieldValue("START")
  const end = block.getFieldValue("END")
  const code = `${start}-${end}`
  return [code, Order.ATOMIC]
}

// 結合・選択ブロックのコード生成
regexGenerator.forBlock["join"] = function (block) {
  const inputs = []
  for (let i = 0; i < block.itemCount_; i++) {
    const input = regexGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
    inputs.push(input)
  }
  const code = inputs.join("")
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["choice"] = function (block) {
  const inputs = []
  for (let i = 0; i < block.itemCount_; i++) {
    const input = regexGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
    inputs.push(input)
  }
  const code = inputs.join("|")
  return [code, Order.ATOMIC]
}

// グループ化ブロックのコード生成
regexGenerator.forBlock["group_noncapturing"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const code = `(?:${pattern})`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["group"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const code = `(${pattern})`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["group_named"] = function (block) {
  const varId = block.getFieldValue("VAR")
  const name = block.workspace.getVariableMap().getVariableById(varId).getName()
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const code = `(?<${name}>${pattern})`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["backreference"] = function (block) {
  const number = block.getFieldValue("NUMBER")
  const code = `\\${number}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["backreference_named"] = function (block) {
  const varId = block.getFieldValue("VAR")
  const name = block.workspace.getVariableMap().getVariableById(varId).getName()
  const code = `\\k<${name}>`
  return [code, Order.ATOMIC]
}

// 繰り返しブロックのコード生成
regexGenerator.forBlock["question"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const lazy = block.getFieldValue("LAZY")
  const code = `${pattern}?${lazy}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["star_plus"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const kind = block.getFieldValue("KIND")
  const lazy = block.getFieldValue("LAZY")
  const code = `${pattern}${kind}${lazy}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["quantit_exact"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const count = block.getFieldValue("COUNT")
  const code = `${pattern}{${count}}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["quantit_min"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const count = block.getFieldValue("COUNT")
  const lazy = block.getFieldValue("LAZY")
  const code = `${pattern}{${count},}${lazy}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["quantit_range"] = function (block) {
  const pattern = regexGenerator.valueToCode(block, "PATTERN", Order.ATOMIC)
  const min = block.getFieldValue("MIN")
  const max = block.getFieldValue("MAX")
  const lazy = block.getFieldValue("LAZY")
  const code = `${pattern}{${min},${max}}${lazy}`
  return [code, Order.ATOMIC]
}

// 置換ブロックのコード生成
regexGenerator.forBlock["no_substitute"] = function (block) {
  const code = "$&"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["substitute_join"] = function (block) {
  const inputs = []
  for (let i = 0; i < block.itemCount_; i++) {
    const input = regexGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
    inputs.push(input)
  }
  const code = inputs.join("")
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["dollar"] = function (block) {
  const code = "$$"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["ampersand"] = function (block) {
  const code = "$&"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["match_before"] = function (block) {
  const code = "$`"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["match_after"] = function (block) {
  const code = "$'"
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["match_backreference"] = function (block) {
  const number = block.getFieldValue("NUMBER")
  const code = `$${number}`
  return [code, Order.ATOMIC]
}
regexGenerator.forBlock["match_named_backreference"] = function (block) {
  const varId = block.getFieldValue("VAR")
  const name = block.workspace.getVariableMap().getVariableById(varId).getName()
  const code = `$<${name}>`
  return [code, Order.ATOMIC]
}
