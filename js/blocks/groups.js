// グループ化ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "group_noncapturing",
    message0: "(?:%1)",
    args0: [
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "%{BKY_GROUP_NONCAPTURING_TOOLTIP}",
  },
  {
    type: "group",
    message0: "(%1)",
    args0: [
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "%{BKY_GROUP_TOOLTIP}",
  },
  {
    type: "group_named",
    message0: "(?<%1>%2)",
    args0: [
      {
        type: "field_variable_named",
        name: "VAR",
        variable: "name",
      },
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "%{BKY_GROUP_NAMED_TOOLTIP}",
  },
  {
    type: "backreference",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "NUMBER",
        options: [["", ""]],
        columns: 5,
      },
    ],
    output: "regex",
    style: "groups",
    tooltip:
      "%{BKY_BACKREFERENCE_TOOLTIP}",
    extensions: ["dynamic_backreference"],
  },
  {
    type: "backreference_named",
    message0: "\\k<%1>",
    args0: [
      {
        type: "field_variable_named",
        name: "VAR",
        variable: "name",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "%{BKY_BACKREFERENCE_NAMED_TOOLTIP}",
  },
])
