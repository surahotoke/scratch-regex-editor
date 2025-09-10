// 文字関連ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "chars_input",
    message0: "\u200B%1",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
        text: "a",
        spellcheck: false,
        autocorrect: "off",
        autocapitalize: "off",
      },
    ],
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip:
      "%{BKY_CHARS_INPUT_TOOLTIP}",
  },
  {
    type: "dot",
    message0: ".",
    output: "regex",
    style: "chars",
    tooltip: "%{BKY_DOT_TOOLTIP}",
  },
  {
    type: "dw",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "KIND",
        options: [
          ["d", "d"],
          ["D", "D"],
          ["w", "w"],
          ["W", "W"],
        ],
        columns: 2,
      },
    ],
    output: ["regex", "charclass"],
    style: "chars",
    tooltip: "%{BKY_DW_TOOLTIP}",
  },
  {
    type: "s",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "KIND",
        options: [
          ["s", "s"],
          ["S", "S"],
        ],
      },
    ],
    output: ["regex", "charclass"],
    style: "chars",
    tooltip: "%{BKY_S_TOOLTIP}",
  },
  {
    type: "unicode_property",
    message0: "\\%1{%2%3}",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "KIND",
        options: [
          ["p", "p"],
          ["P", "P"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCRIPT",
        options: [
          ["\u200B", ""],
          ["Script=", "Script="],
        ],
      },
      {
        type: "field_input",
        name: "PROPERTY",
        text: "L",
        spellcheck: false,
        autocorrect: "off",
        autocapitalize: "off",
      },
    ],
    output: ["regex", "charclass"],
    style: "chars",
    tooltip:
      "%{BKY_UNICODE_PROPERTY_TOOLTIP}",
    helpUrl:
      "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Regular_Expressions/Unicode_Property_Escapes",
    extensions: ["validate_unicode_property"],
  },
  {
    type: "tab",
    message0: "\\t",
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip: "%{BKY_TAB_TOOLTIP}",
  },
  {
    type: "newline",
    message0: "\\n",
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip: "%{BKY_NEWLINE_TOOLTIP}",
  },
  {
    type: "escaped_special",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "CHAR",
        options: [
          ["/", "/"],
          ["\\", "\\"],
          ["^", "^"],
          ["$", "$"],
          ["(", "("],
          [")", ")"],
          [".", "."],
          ["?", "?"],
          ["[", "["],
          ["]", "]"],
          ["-", "-"],
          ["*", "*"],
          ["{", "{"],
          ["}", "}"],
          ["|", "|"],
          ["+", "+"],
        ],
        columns: 4,
      },
    ],
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip:
      "%{BKY_ESCAPED_SPECIAL_TOOLTIP}",
  },
  {
    type: "char_class",
    message0: "[%1%2]",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "NEGATE",
        options: [
          ["", ""],
          ["^", "^"],
        ],
      },
      {
        type: "input_value",
        name: "CONTENT",
        check: "charclass",
      },
    ],
    output: "regex",
    style: "chars",
    tooltip: "%{BKY_CHAR_CLASS_TOOLTIP}",
  },
  {
    type: "char_class_join",
    message0: "%1%2",
    args0: [
      { type: "input_value", name: "ADD0", check: "charclass" },
      { type: "input_value", name: "ADD1", check: "charclass" },
    ],
    inputsInline: true,
    output: "charclass",
    style: "charclass",
    tooltip: "%{BKY_CHAR_CLASS_JOIN_TOOLTIP}",
    mutator: "char_class_join_mutator",
  },
  {
    type: "char_class_range",
    message0: "%1-%2",
    args0: [
      { type: "field_input", name: "START", text: "a" },
      { type: "field_input", name: "END", text: "z" },
    ],
    output: "charclass",
    style: "charclass",
    tooltip: "%{BKY_CHAR_CLASS_RANGE_TOOLTIP}",
    extensions: ["validate_char_range"],
  },
])
