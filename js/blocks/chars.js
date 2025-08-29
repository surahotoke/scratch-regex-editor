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
      "自由入力欄。特殊文字を入力する際は注意してください。置換でも使用可能",
  },
  {
    type: "dot",
    message0: ".",
    output: "regex",
    style: "chars",
    tooltip: "改行除く任意の1文字。文字クラス内では使用不可",
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
    tooltip: "数字[0-9]、英数字と_[a-zA-Z0-9_]",
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
    tooltip: "半角スペース、タブ文字、改行文字[ \\t\\n]",
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
      "Unicodeの文字プロパティ。P句読点、S記号や、Script=Hiraganaひらがな、Han漢字など色々指定可能。詳しくは右クリック→ヘルプ",
    helpUrl:
      "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Regular_Expressions/Unicode_Property_Escapes",
    extensions: ["validate_unicode_property"],
  },
  {
    type: "tab",
    message0: "\\t",
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip: "タブ文字。置換でも使用可能",
  },
  {
    type: "newline",
    message0: "\\n",
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip: "改行文字。置換でも使用可能",
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
          ["[", "["],
          ["-", "-"],
          ["]", "]"],
          ["|", "|"],
          ["?", "?"],
          ["*", "*"],
          ["+", "+"],
          ["{", "{"],
          ["}", "}"],
        ],
        columns: 4,
      },
    ],
    output: ["regex", "charclass", "substitute"],
    style: "chars",
    tooltip:
      "エスケープされた特殊文字。-は文字クラス内でのみ使用可能。置換でも使用可能（$は置換では使用不可）",
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
    tooltip: "文字クラス。先頭に^で否定。自身と.以外の「文字」のものを使用可能",
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
    tooltip: "文字クラス内でのみ使用可能な連結ブロック",
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
    tooltip: "範囲指定(例：a-z)。どちらも1文字。文字クラス内のみ使用可能",
    extensions: ["validate_char_range"],
  },
])
