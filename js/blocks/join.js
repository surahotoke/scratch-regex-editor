// 結合・分割ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "join",
    message0: "%1%2",
    args0: [
      { type: "input_value", name: "ADD0", check: "regex" },
      { type: "input_value", name: "ADD1", check: "regex" },
    ],
    inputsInline: true,
    output: "regex",
    style: "join",
    tooltip: "%{BKY_JOIN_TOOLTIP}",
    mutator: "join_mutator",
  },
  {
    type: "choice",
    message0: "%1|%2",
    args0: [
      { type: "input_value", name: "ADD0", check: "regex" },
      { type: "input_value", name: "ADD1", check: "regex" },
    ],
    inputsInline: true,
    output: "regex",
    style: "join",
    tooltip: "%{BKY_CHOICE_TOOLTIP}",
    mutator: "choice_mutator",
  },
])

// ミューテーター用の汎用ヘルパーブロックの定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "mutator_container",
    message0: "%1",
    args0: [{ type: "input_statement", name: "STACK" }],
    style: "join",
    tooltip: "%{BKY_MUTATOR_CONTAINER_TOOLTIP}",
  },
  {
    type: "mutator_item",
    message0: "%{BKY_MUTATOR_ITEM_MESSAGE0}",
    style: "join",
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    tooltip: "%{BKY_MUTATOR_ITEM_TOOLTIP}",
  },
])
