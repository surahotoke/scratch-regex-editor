// 繰り返しブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "question",
    message0: "%1?%2",
    args0: [
      { type: "input_value", name: "PATTERN", check: "regex" },
      {
        type: "field_grid_dropdown",
        name: "LAZY",
        options: [
          ["", ""],
          ["?", "?"],
        ],
      },
    ],
    output: "regex",
    style: "repeat",
    tooltip:
      "なるべくあれば1回取り入れる（なければ無し）。？でなるべく取り入れないになります。例：/^a??a/をaaに適用",
  },
  {
    type: "star_plus",
    message0: "%1%2%3",
    args0: [
      { type: "input_value", name: "PATTERN", check: "regex" },
      {
        type: "field_grid_dropdown",
        name: "KIND",
        options: [
          ["*", "*"],
          ["+", "+"],
        ],
      },
      {
        type: "field_grid_dropdown",
        name: "LAZY",
        options: [
          ["", ""],
          ["?", "?"],
        ],
      },
    ],
    output: "regex",
    style: "repeat",
    tooltip:
      "0回以上（*）、1回以上（+）なるべく繰り返す。？でなるべく少なくになります",
  },
  {
    type: "quantit_exact",
    message0: "%1{%2}",
    args0: [
      { type: "input_value", name: "PATTERN", check: "regex" },
      { type: "field_number", name: "COUNT", value: 1, min: 0, precision: 1 },
    ],
    output: "regex",
    style: "repeat",
    tooltip: "ピッタリN回繰り返す{N}",
  },
  {
    type: "quantit_min",
    message0: "%1{%2,}%3",
    args0: [
      { type: "input_value", name: "PATTERN", check: "regex" },
      { type: "field_number", name: "COUNT", value: 1, min: 0, precision: 1 },
      {
        type: "field_grid_dropdown",
        name: "LAZY",
        options: [
          ["\u200B", ""],
          ["?", "?"],
        ],
      },
    ],
    output: "regex",
    style: "repeat",
    tooltip: "最低N回、なるべく多く繰り返す{N,}。？でなるべく少なくなります",
  },
  {
    type: "quantit_range",
    message0: "%1{%2,%3}%4",
    args0: [
      { type: "input_value", name: "PATTERN", check: "regex" },
      {
        type: "field_number",
        name: "MIN",
        value: 1,
        min: 0,
        precision: 1,
      },
      {
        type: "field_number",
        name: "MAX",
        value: 3,
        min: 0,
        precision: 1,
      },
      {
        type: "field_grid_dropdown",
        name: "LAZY",
        options: [
          ["\u200B", ""],
          ["?", "?"],
        ],
      },
    ],
    output: "regex",
    style: "repeat",
    tooltip: "N~M回、なるべく多く繰り返す{N,M}。？でなるべく少なくなります",
    extensions: ["validate_count_range"],
  },
])
