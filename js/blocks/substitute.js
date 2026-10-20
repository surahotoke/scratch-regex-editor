// 置換ブロックの定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "no_substitute",
    message0: "%{BKY_NO_SUBSTITUTE_MESSAGE0}",
    output: "substitute",
    style: "substituteShadow",
    tooltip: "%{BKY_NO_SUBSTITUTE_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#root",
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
      "%{BKY_SUBSTITUTE_JOIN_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#substitute_join",
    mutator: "substitute_join_mutator",
  },
  {
    type: "dollar",
    message0: "$$",
    output: "substitute",
    style: "substitute",
    tooltip: "%{BKY_DOLLAR_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#dollar",
  },
  {
    type: "ampersand",
    message0: "$&",
    output: "substitute",
    style: "substitute",
    tooltip: "%{BKY_AMPERSAND_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#ampersand",
  },
  {
    type: "match_before",
    message0: "$`",
    output: "substitute",
    style: "substitute",
    tooltip: "%{BKY_MATCH_BEFORE_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#match_before",
  },
  {
    type: "match_after",
    message0: "$'",
    output: "substitute",
    style: "substitute",
    tooltip: "%{BKY_MATCH_AFTER_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#match_after",
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
      "%{BKY_MATCH_BACKREFERENCE_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#match_backreference",
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
    tooltip: "%{BKY_MATCH_NAMED_BACKREFERENCE_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#match_named_backreference",
  },
])
