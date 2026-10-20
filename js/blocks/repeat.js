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
      "%{BKY_QUESTION_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#question",
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
      "%{BKY_STAR_PLUS_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#star_plus",
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
    tooltip: "%{BKY_QUANTIT_EXACT_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#quantit_exact",
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
    tooltip: "%{BKY_QUANTIT_MIN_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#quantit_min",
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
    tooltip: "%{BKY_QUANTIT_RANGE_TOOLTIP}",
    helpUrl: "reference/%{BKY_REFERENCE_DIR}/blocks.html#quantit_range",
    extensions: ["validate_count_range"],
  },
])
