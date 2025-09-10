const ui = {
  pageName: "Scratch Regex Editor",
  title: "Scratch Regex Editor",
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
    "The root block for a regular expression. Connect blocks here to build a pattern.",
  REGEX_INPUT_TOOLTIP:
    "Input block for a regex. You can also type text directly.",
  ANCHOR_START_TOOLTIP: "Start of line",
  ANCHOR_END_TOOLTIP: "End of line",
  BOUNDARY_TOOLTIP: "Word boundary (between \\w and \\W)",
  LOOK_TOOLTIP:
    "= Lookahead, ! Negative lookahead, < Lookbehind, <! Negative lookbehind. They match a position depending on what comes before or after.",
  CHARS_INPUT_TOOLTIP:
    "Free text input. Be careful with special characters. Can also be used in replacement.",
  DOT_TOOLTIP:
    "Any single character except newline. Not usable inside a character class.",
  DW_TOOLTIP: "Digits [0-9], letters and underscore [a-zA-Z0-9_]",
  S_TOOLTIP: "Whitespace: space, tab, or newline [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "Unicode property. For example: P (punctuation), S (symbols), Script=Hiragana, Han (Chinese characters). Right-click → Help for more details.",
  TAB_TOOLTIP: "Tab character. Can also be used in replacement.",
  NEWLINE_TOOLTIP: "Newline character. Can also be used in replacement.",
  ESCAPED_SPECIAL_TOOLTIP:
    "Escaped special character. For example: '-' only inside character class. Can also be used in replacement (but $ is not allowed there).",
  CHAR_CLASS_TOOLTIP:
    "Character class. Use ^ at the beginning to negate. Can include characters except itself and '.'.",
  CHAR_CLASS_JOIN_TOOLTIP: "Join inside a character class only.",
  CHAR_CLASS_RANGE_TOOLTIP:
    "Range (e.g., a-z). Both ends must be a single character. Only inside character class.",
  JOIN_TOOLTIP: "Put multiple elements together in sequence.",
  CHOICE_TOOLTIP: "Match one of several elements. Checked from left to right.",
  MUTATOR_CONTAINER_TOOLTIP: "Number of input slots of the block.",
  MUTATOR_ITEM_MESSAGE0: "item",
  MUTATOR_ITEM_TOOLTIP: "An input slot.",
  GROUP_NONCAPTURING_TOOLTIP: "Grouping without capturing",
  GROUP_TOOLTIP: "Grouping",
  GROUP_NAMED_TOOLTIP: "Named grouping",
  BACKREFERENCE_TOOLTIP:
    "Backreference to a group. Select group number. Note: Includes both normal and named groups.",
  BACKREFERENCE_NAMED_TOOLTIP: "Backreference to a named group",
  QUESTION_TOOLTIP:
    "Optional (match once if possible, or none). With ? it tries to match less. Example: /^a??a/ applied to 'aa'.",
  STAR_PLUS_TOOLTIP:
    "Repeat many times: * = 0 or more, + = 1 or more. With ? it tries to match less.",
  QUANTIT_EXACT_TOOLTIP: "Repeat exactly N times {N}",
  QUANTIT_MIN_TOOLTIP:
    "Repeat at least N times {N,}. With ? it tries to match less.",
  QUANTIT_RANGE_TOOLTIP:
    "Repeat between N and M times {N,M}. With ? it tries to match less.",
  NO_SUBSTITUTE_MESSAGE0: "No replacement",
  NO_SUBSTITUTE_TOOLTIP: "Match only, do not replace.",
  SUBSTITUTE_JOIN_TOOLTIP:
    "Join block usable only inside replacement. Outside replacement you can also use free input, tab, newline, or escape.",
  DOLLAR_TOOLTIP: "Escape $ inside replacement",
  AMPERSAND_TOOLTIP: "The matched text (or position)",
  MATCH_BEFORE_TOOLTIP: "Text before the matched part (or position)",
  MATCH_AFTER_TOOLTIP: "Text after the matched part (or position)",
  MATCH_BACKREFERENCE_TOOLTIP:
    "Reference a captured group in replacement. Note: Includes both normal and named groups.",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "Reference a named group in replacement",
}

export default { ui, blockly }
