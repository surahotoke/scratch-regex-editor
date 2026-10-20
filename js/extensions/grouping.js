// 連結ブロックの中身をまとめる・まとめを解除する（右クリックメニュー）
import { textWithHelp } from "./menuHelp.js"

// 入れ子にしても意味が変わらないブロック（[ ] は入れ子にすると意味が変わるので対象外）
const GROUPABLE_TYPES = ["join", "choice", "substitute_join"]

// 「N個まとめる」を何個まで並べるか（これより多いときは個数を入力する）
const MAX_GROUP_COUNT = 5

/** ブロックがつながっている連結ブロックと、その中での位置（なければ null） */
function getPosition(block) {
  if (block.isInFlyout) return null
  const parent = block.getParent()
  if (!parent || !GROUPABLE_TYPES.includes(parent.type)) return null
  const connection = block.outputConnection?.targetConnection
  for (let i = 0; i < parent.itemCount_; i++) {
    if (parent.getInput("ADD" + i).connection === connection)
      return { parent, index: i }
  }
  return null
}

/** まとめられる最大の個数（全部をまとめても入れ子が1つ増えるだけなので除く） */
function getMaxGroupCount({ parent, index }) {
  const max = parent.itemCount_ - index
  return index === 0 ? max - 1 : max
}

/** 個数を入力してもらってまとめる（範囲外ならもう一度聞く） */
function promptGroupItems(block, defaultValue = "") {
  const max = getMaxGroupCount(getPosition(block))
  const message = Blockly.Msg.GROUP_ITEMS_PROMPT.replace("%1", max)
  Blockly.dialog.prompt(message, defaultValue, (value) => {
    if (value === null) return // キャンセル
    const count = Number(value)
    if (!Number.isInteger(count) || count < 2 || count > max) {
      Blockly.dialog.alert(
        Blockly.Msg.GROUP_ITEMS_INVALID.replace("%1", max),
        () => promptGroupItems(block, value)
      )
      return
    }
    groupItems(block, count)
  })
}

/** 入力数を変える（Ctrl+Z で戻せるよう、ミューテーターと同じ変更イベントを出す） */
function setItemCount(block, count) {
  const oldState = JSON.stringify(block.saveExtraState())
  block.itemCount_ = count
  block.updateShape_()
  const newState = JSON.stringify(block.saveExtraState())
  const BlockChange = Blockly.Events.get(Blockly.Events.BLOCK_CHANGE)
  Blockly.Events.fire(
    new BlockChange(block, "mutation", null, oldState, newState)
  )
}

/** ADD from 以降につながっているブロックを外して返す（空の欄は null） */
function unplugFrom(block, from) {
  const blocks = []
  for (let i = from; i < block.itemCount_; i++) {
    const child = block.getInputTargetBlock("ADD" + i)
    if (child) child.unplug()
    blocks.push(child)
  }
  return blocks
}

/** ADD from から順にブロックをつなぐ（null の欄は空のまま） */
function plugFrom(block, from, blocks) {
  blocks.forEach((child, i) => {
    if (child)
      block.getInput("ADD" + (from + i)).connection.connect(child.outputConnection)
  })
}

/**
 * 操作の順番は Ctrl+Z のために決めている
 * （逆順に戻したとき、戻し先の入力欄が必ずあるようにする）
 */
function groupItems(block, count) {
  const { parent, index } = getPosition(block)
  Blockly.Events.setGroup(true)
  try {
    const wrapper = Blockly.serialization.blocks.append(
      { type: parent.type, extraState: { itemCount: count } },
      parent.workspace,
      { recordUndo: true }
    )
    const rest = unplugFrom(parent, index)
    plugFrom(wrapper, 0, rest.slice(0, count))
    setItemCount(parent, parent.itemCount_ - count + 1)
    plugFrom(parent, index, [wrapper, ...rest.slice(count)])
  } finally {
    Blockly.Events.setGroup(false)
  }
}

function ungroupItems(block) {
  const { parent, index } = getPosition(block)
  Blockly.Events.setGroup(true)
  try {
    const children = unplugFrom(block, 0)
    const rest = unplugFrom(parent, index + 1)
    block.dispose(false)
    setItemCount(parent, parent.itemCount_ - 1 + children.length)
    plugFrom(parent, index, [...children, ...rest])
  } finally {
    Blockly.Events.setGroup(false)
  }
}

for (let count = 2; count <= MAX_GROUP_COUNT; count++) {
  Blockly.ContextMenuRegistry.registry.register({
    id: `group_items_${count}`,
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    weight: 110 + count,
    // 「?」は常に出る「2個まとめる」にだけ付ける（全部に付けると目障りなので）
    displayText: () => {
      const text = Blockly.Msg.GROUP_ITEMS.replace("%1", count)
      return count === 2 ? textWithHelp(text, "group-items") : text
    },
    preconditionFn: ({ block }) => {
      const position = getPosition(block)
      if (!position) return "hidden"
      return count <= getMaxGroupCount(position) ? "enabled" : "hidden"
    },
    callback: ({ block }) => groupItems(block, count),
  })
}

Blockly.ContextMenuRegistry.registry.register({
  id: "group_items_prompt",
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  weight: 110 + MAX_GROUP_COUNT + 1,
  displayText: () =>
    Blockly.Msg.GROUP_ITEMS_MORE.replace("%1", MAX_GROUP_COUNT + 1),
  preconditionFn: ({ block }) => {
    const position = getPosition(block)
    if (!position) return "hidden"
    // 並べた項目で足りるときは出さない
    return getMaxGroupCount(position) > MAX_GROUP_COUNT ? "enabled" : "hidden"
  },
  callback: ({ block }) => promptGroupItems(block),
})

Blockly.ContextMenuRegistry.registry.register({
  id: "ungroup_items",
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  weight: 110,
  displayText: () => textWithHelp(Blockly.Msg.UNGROUP_ITEMS, "group-items"),
  preconditionFn: ({ block }) => {
    const position = getPosition(block)
    return position?.parent.type === block.type ? "enabled" : "hidden"
  },
  callback: ({ block }) => ungroupItems(block),
})
