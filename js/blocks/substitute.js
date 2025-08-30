// 置換ブロックの定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "no_substitute",
    message0: "置換しない",
    output: "substitute",
    style: "substituteShadow",
    tooltip: "マッチさせる",
  },
  {
    type: "substitute_join",
    message0: "%1%2",
    args0: [
      { type: "input_value", name: "ADD0", check: "substitute" },
      { type: "input_value", name: "ADD1", check: "substitute" },
    ],
    inputsInline: true,
    output: "substitute",
    style: "substitute",
    tooltip:
      "置換内でのみ使用可能な連結ブロック。置換以外では自由入力、タブ、改行、エスケープ文字も可能です",
    mutator: "substitute_join_mutator",
  },
  {
    type: "dollar",
    message0: "$$",
    output: "substitute",
    style: "substitute",
    tooltip: "置換内の$のエスケープ",
  },
  {
    type: "ampersand",
    message0: "$&",
    output: "substitute",
    style: "substitute",
    tooltip: "マッチした部分文字列（または位置）",
  },
  {
    type: "match_before",
    message0: "$`",
    output: "substitute",
    style: "substitute",
    tooltip: "マッチした部分文字列の前の文字列（または位置）",
  },
  {
    type: "match_after",
    message0: "$'",
    output: "substitute",
    style: "substitute",
    tooltip: "マッチした部分文字列の後ろの文字列（または位置）",
  },
  {
    type: "match_backreference",
    message0: "$%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "NUMBER",
        options: [["", ""]],
        columns: 5,
      },
    ],
    output: "substitute",
    style: "substitute",
    tooltip:
      "グループの置換の参照。注意：名前付きのグループも含めたグループ番号です",
    extensions: ["dynamic_substitute_backreference"],
  },
  {
    type: "match_named_backreference",
    message0: "$<%1>",
    args0: [
      {
        type: "field_variable_named",
        name: "VAR",
        variable: "name",
      },
    ],
    output: "substitute",
    style: "substitute",
    tooltip: "名前付きグループの置換の参照",
  },
])
