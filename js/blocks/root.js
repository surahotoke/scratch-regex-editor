// ルートブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "root",
    message0: "%{BKY_ROOT_MESSAGE0}",
    args0: [
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
      {
        type: "field_label",
        name: "FLAGS",
        text: "gmud",
      },
      {
        type: "input_end_row",
      }
    ],
    message1: "%{BKY_ROOT_MESSAGE1}",
    args1: [
      {
        type: "input_value",
        name: "SUBSTITUTE",
        check: "substitute",
      },
    ],
    style: "root",
    tooltip: "%{BKY_ROOT_TOOLTIP}",
  },
  {
    type: "regex_input",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "PATTERN",
        text: "",
        spellcheck: false,
        autocorrect: "off",
        autocapitalize: "off",
      },
    ],
    output: "regex",
    tooltip: "%{BKY_REGEX_INPUT_TOOLTIP}",
  },
])
