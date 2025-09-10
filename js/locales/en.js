// html related (textContent, placeholder, title, etc.)
const ui = {
  pageName: "Scratch-style Regex Editor",
  title: "Scratch-style Regex Editor",
  setting: "Settings",
  language: "Language",
  theme: "Theme",
  autoTheme: "Auto",
  lightTheme: "Light",
  darkTheme: "Dark",
  file: "File",
  newFile: "New File",
  load: "Load from Computer",
  save: "Save to Computer",
  sample: "Sample",
  sampleDate: "Date Detection",
  sampleNum: "Number Separator",
  regex: "Regular Expression Pattern",
  cppy: "Copy",
  replace: "Replacement String",
  target: "Target Text",
  targetPlaceholder: "Enter text here (tabs are also supported)",
  result: "Result",
}

// blockly related
const blockly = {
  CATEGORY_POSITION: "Position",
  CATEGORY_CHARS: "Characters",
  CATEGORY_JOIN: "Join / Choice",
  CATEGORY_GROUPS: "Grouping",
  CATEGORY_REPEAT: "Repetition",
  CATEGORY_SUBSTITUTE: "Substitution",
  ROOT_MESSAGE0: "Regex: /%1/%2%3",
  ROOT_MESSAGE1: "Replace: %1",
  ROOT_TOOLTIP:
    "The root block for a regular expression. Connect blocks here to create a pattern.",
  REGEX_INPUT_TOOLTIP: "Regex input block. You can also type text directly.",
  ANCHOR_START_TOOLTIP: "Start of a line",
  ANCHOR_END_TOOLTIP: "End of a line",
  BOUNDARY_TOOLTIP: "Word boundary (between \\w and \\W)",
  LOOK_TOOLTIP:
    "= Lookahead, ! Negative lookahead, < Lookbehind, <! Negative lookbehind.\n" +
    "These blocks don’t match characters directly, but check if certain text exists before or after a position.",
  CHARS_INPUT_TOOLTIP:
    "Free text input. Be careful with special characters. Can also be used in replacement.",
  DOT_TOOLTIP:
    "Any single character except newline. Not usable inside a character class.",
  DW_TOOLTIP: "Digits [0-9], letters, and underscore [a-zA-Z0-9_]",
  S_TOOLTIP: "Whitespace: space, tab, or newline [ \\t\\n ]",
  UNICODE_PROPERTY_TOOLTIP:
    "Unicode property. For example: P = punctuation, S = symbol, Script=Hiragana (hiragana), Han (Chinese characters).\n" +
    "Right-click → Help for more details.",
  TAB_TOOLTIP: "Tab character. Can also be used in replacement.",
  NEWLINE_TOOLTIP: "Newline character. Can also be used in replacement.",
  ESCAPED_SPECIAL_TOOLTIP:
    "Escaped special character. For example: '-' only inside character class.\n" +
    "Also usable in replacement (but $ is not allowed there).",
  CHAR_CLASS_TOOLTIP:
    "Character class. Use ^ at the beginning to negate. Can include everything except itself and '.'.",
  CHAR_CLASS_JOIN_TOOLTIP: "Join inside a character class only.",
  CHAR_CLASS_RANGE_TOOLTIP:
    "Range (e.g., a-z). Both ends must be a single character. Only works inside a character class.",
  JOIN_TOOLTIP: "Put multiple elements together in order.",
  CHOICE_TOOLTIP: "Match one of several elements. Checked from left to right.",
  MUTATOR_CONTAINER_TOOLTIP: "Number of input slots of the block.",
  MUTATOR_ITEM_MESSAGE0: "element",
  MUTATOR_ITEM_TOOLTIP: "An input slot.",
  GROUP_NONCAPTURING_TOOLTIP: "Grouping without capturing",
  GROUP_TOOLTIP: "Grouping",
  GROUP_NAMED_TOOLTIP: "Named grouping",
  BACKREFERENCE_TOOLTIP:
    "Use the text captured by a group again. Choose the group number.\n" +
    "Note: Includes both normal and named groups.",
  BACKREFERENCE_NAMED_TOOLTIP: "Backreference to a named group",
  QUESTION_TOOLTIP:
    "Optional (match once if possible, or none). With ? it tries to match less.\n" +
    "Example: /^a??a/ applied to 'aa'.",
  STAR_PLUS_TOOLTIP:
    "Repeat many times: * = 0 or more, + = 1 or more.\n" +
    "With ? it tries to repeat less.",
  QUANTIT_EXACT_TOOLTIP: "Repeat exactly N times {N}",
  QUANTIT_MIN_TOOLTIP:
    "Repeat at least N times {N,}. With ? it tries to repeat less.",
  QUANTIT_RANGE_TOOLTIP:
    "Repeat between N and M times {N,M}. With ? it tries to repeat less.",
  NO_SUBSTITUTE_MESSAGE0: "No replacement",
  NO_SUBSTITUTE_TOOLTIP: "Only match, do not replace.",
  SUBSTITUTE_JOIN_TOOLTIP:
    "Join block usable only inside replacement.\n" +
    "Outside replacement you can also use free input, tab, newline, or escape.",
  DOLLAR_TOOLTIP: "Escape $ inside replacement",
  AMPERSAND_TOOLTIP: "The matched text (or position)",
  MATCH_BEFORE_TOOLTIP: "Text before the matched part (or position)",
  MATCH_AFTER_TOOLTIP: "Text after the matched part (or position)",
  MATCH_BACKREFERENCE_TOOLTIP:
    "Reuse the text captured by a group in replacement.\n" +
    "Note: Includes both normal and named groups.",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "Reuse a named group in replacement",
}
export default { ui, blockly }
