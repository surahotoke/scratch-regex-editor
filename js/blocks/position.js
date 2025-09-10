// 位置ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "anchor_start",
    message0: "^",
    output: "regex",
    style: "position",
    tooltip: "%{BKY_ANCHOR_START_TOOLTIP}",
  },
  {
    type: "anchor_end",
    message0: "$",
    output: "regex",
    style: "position",
    tooltip: "%{BKY_ANCHOR_END_TOOLTIP}",
  },
  {
    type: "boundary",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "KIND",
        options: [
          ["b", "b"],
          ["B", "B"],
        ],
      },
    ],
    output: "regex",
    style: "position",
    tooltip: "%{BKY_BOUNDARY_TOOLTIP}",
  },
  {
    type: "look",
    message0: "(?%1%2%3)",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "LT",
        options: [
          ["", ""],
          ["<", "<"],
        ],
      },
      {
        type: "field_grid_dropdown",
        name: "EQL",
        options: [
          ["=", "="],
          ["!", "!"],
        ],
      },
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "position",
    tooltip:
      "%{BKY_LOOK_TOOLTIP}",
  },
])
