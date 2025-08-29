// 位置ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "anchor_start",
    message0: "^",
    output: "regex",
    style: "position",
    tooltip: "行頭位置",
  },
  {
    type: "anchor_end",
    message0: "$",
    output: "regex",
    style: "position",
    tooltip: "行末位置",
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
    tooltip: "単語境界（\\wと\\Wの間の位置）",
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
      "=先読み・!否定先読み・<後読み・<!否定後読み。先読みは直後がこれになるような位置を表します",
  },
])
