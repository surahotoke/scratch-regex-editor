// ルートブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "root",
    message0: "正規表現：/%1/%2%3",
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
    message1: "置換：%1",
    args1: [
      {
        type: "input_value",
        name: "SUBSTITUTE",
        check: "substitute",
      },
    ],
    style: "root",
    tooltip: "正規表現のルートブロックです。接続するとパターンが生成されます",
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
  },
])
