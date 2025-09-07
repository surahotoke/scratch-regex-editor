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
    tooltip: "複数の要素を並べて連結",
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
    tooltip: "複数の要素のうち、いずれかにマッチ。左から順に評価する",
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
    tooltip: "ブロックの入力欄の数",
  },
  {
    type: "mutator_item",
    message0: "要素",
    style: "join",
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    tooltip: "入力枠",
  },
])
