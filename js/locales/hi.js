// UI से जुड़ा (textContent, placeholder, title आदि)
const ui = {
  pageName: "Scratch शैली Regex संपादक",
  title: "Scratch शैली Regex संपादक",
  setting: "सेटिंग",
  language: "भाषा",
  theme: "थीम",
  autoTheme: "स्वचालित",
  lightTheme: "हल्का",
  darkTheme: "गहरा",
  file: "फ़ाइल",
  newFile: "नई फ़ाइल",
  load: "कंप्यूटर से लोड करें",
  save: "कंप्यूटर में सहेजें",
  sample: "उदाहरण",
  sampleDate: "तारीख़ पहचान",
  sampleNum: "संख्या विभाजक",
  regex: "रेगुलर एक्सप्रेशन पैटर्न",
  copy: "कॉपी",
  replace: "बदलने वाला टेक्स्ट",
  target: "लक्ष्य टेक्स्ट",
  targetPlaceholder: "यहाँ टेक्स्ट लिखें (टैब भी समर्थित है)",
  result: "परिणाम",
}

// Blockly से जुड़ा
const blockly = {
  DUPLICATE_BLOCK: "प्रतिलिपि करें",
  EXTERNAL_INPUTS: "बाहरी इनपुट",
  DELETE_BLOCK: "ब्लॉक हटाएँ",
  UNDO: "पूर्ववत करें",
  REDO: "फिर से करें",
  CLEAN_UP: "ब्लॉकों को व्यवस्थित करें",
  DELETE_X_BLOCKS: "%1 ब्लॉक हटाएँ",
  DELETE_ALL_BLOCKS: "क्या आप सभी %1 ब्लॉक हटाना चाहते हैं?",
  HELP: "सहायता",
  RENAME_VARIABLE: "समूह का नाम बदलें…",
  DELETE_VARIABLE: "समूह '%1' हटाएँ",
  DELETE_VARIABLE_CONFIRMATION:
    "क्या आप %1 स्थानों पर उपयोग किए गए समूह '%2' को हटाना चाहते हैं?",
  CATEGORY_POSITION: "स्थिति",
  CATEGORY_CHARS: "अक्षर",
  CATEGORY_JOIN: "जोड़ / विकल्प",
  CATEGORY_GROUPS: "समूह",
  CATEGORY_REPEAT: "दोहराव",
  CATEGORY_SUBSTITUTE: "बदलाव",
  ROOT_MESSAGE0: "Regex: /%1/%2%3",
  ROOT_MESSAGE1: "बदलें: %1",
  ROOT_TOOLTIP:
    "रेगुलर एक्सप्रेशन का मूल ब्लॉक। अन्य ब्लॉक जोड़कर पैटर्न बनाएँ।",
  REGEX_INPUT_TOOLTIP: "Regex इनपुट ब्लॉक। टेक्स्ट सीधे भी लिख सकते हैं।",
  ANCHOR_START_TOOLTIP: "पंक्ति की शुरुआत",
  ANCHOR_END_TOOLTIP: "पंक्ति का अंत",
  BOUNDARY_TOOLTIP: "शब्द की सीमा (\\w और \\W के बीच)",
  LOOK_TOOLTIP:
    "= आगे देखना, ! नकारात्मक आगे देखना, < पीछे देखना, <! नकारात्मक पीछे देखना। आस-पास के अनुसार स्थिति तय।",
  CHARS_INPUT_TOOLTIP:
    "स्वतंत्र इनपुट। विशेष अक्षरों पर ध्यान दें। बदलाव में भी मान्य।",
  DOT_TOOLTIP: "न्यूलाइन को छोड़कर कोई भी 1 अक्षर। अक्षर वर्ग में उपयोग नहीं।",
  DW_TOOLTIP: "अंकों [0-9], अक्षरों और _ [a-zA-Z0-9_]",
  S_TOOLTIP: "व्हाइटस्पेस: स्पेस, टैब, या न्यूलाइन [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "यूनिकोड गुण। उदाहरण: P विराम चिह्न, S प्रतीक, Script=Hiragana, Han (चीनी अक्षर)। अधिक जानकारी: राइट-क्लिक → सहायता।",
  TAB_TOOLTIP: "टैब अक्षर। बदलाव में भी मान्य।",
  NEWLINE_TOOLTIP: "न्यूलाइन अक्षर। बदलाव में भी मान्य।",
  ESCAPED_SPECIAL_TOOLTIP:
    "एस्केप किया गया विशेष अक्षर। उदाहरण: '-' केवल अक्षर वर्ग में। बदलाव में भी मान्य (लेकिन $ नहीं)।",
  CHAR_CLASS_TOOLTIP:
    "अक्षर वर्ग। शुरुआत में ^ से नकारें। स्वयं और '.' को छोड़कर अन्य अक्षर।",
  CHAR_CLASS_JOIN_TOOLTIP: "केवल अक्षर वर्ग में जोड़ें।",
  CHAR_CLASS_RANGE_TOOLTIP:
    "सीमा (उदा: a-z)। दोनों ओर एक अक्षर। केवल अक्षर वर्ग में।",
  JOIN_TOOLTIP: "कई तत्वों को क्रम में जोड़ें।",
  CHOICE_TOOLTIP: "कई तत्वों में से एक से मेल खाएँ। बाएँ से दाएँ जाँच।",
  MUTATOR_CONTAINER_TOOLTIP: "ब्लॉक के इनपुट स्लॉट की संख्या।",
  MUTATOR_ITEM_MESSAGE0: "तत्व",
  MUTATOR_ITEM_TOOLTIP: "इनपुट स्लॉट।",
  GROUP_NONCAPTURING_TOOLTIP: "कैप्चर न करने वाला समूह",
  GROUP_TOOLTIP: "समूह",
  GROUP_NAMED_TOOLTIP: "नामित समूह",
  BACKREFERENCE_TOOLTIP:
    "समूह का बैकरेफ़रेंस। समूह संख्या चुनें। नाम वाले समूह भी शामिल।",
  BACKREFERENCE_NAMED_TOOLTIP: "नामित समूह का बैकरेफ़रेंस",
  QUESTION_TOOLTIP:
    "यदि हो तो 1 बार, अन्यथा 0 बार। ? से कम मेल खाता है। उदाहरण: /^a??a/ 'aa' पर लागू।",
  STAR_PLUS_TOOLTIP: "* = 0 या अधिक, + = 1 या अधिक। ? से कम मेल खाता है।",
  QUANTIT_EXACT_TOOLTIP: "ठीक N बार दोहराएँ {N}",
  QUANTIT_MIN_TOOLTIP: "कम से कम N बार {N,}। ? से कम।",
  QUANTIT_RANGE_TOOLTIP: "N से M बार {N,M}। ? से कम।",
  NO_SUBSTITUTE_MESSAGE0: "कोई बदलाव नहीं",
  NO_SUBSTITUTE_TOOLTIP: "केवल मेल खाएँ, बदलाव न करें।",
  SUBSTITUTE_JOIN_TOOLTIP:
    "केवल बदलाव में जोड़ें। बाहर स्वतंत्र इनपुट, टैब, न्यूलाइन, एस्केप मान्य।",
  DOLLAR_TOOLTIP: "बदलाव में $ एस्केप करें",
  AMPERSAND_TOOLTIP: "मेल खाया हुआ टेक्स्ट (या स्थिति)",
  MATCH_BEFORE_TOOLTIP: "मेल से पहले का टेक्स्ट (या स्थिति)",
  MATCH_AFTER_TOOLTIP: "मेल के बाद का टेक्स्ट (या स्थिति)",
  MATCH_BACKREFERENCE_TOOLTIP: "बदलाव में समूह संदर्भ। नाम वाले समूह भी शामिल।",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "बदलाव में नामित समूह संदर्भ",
}

// कस्टम संदेश और त्रुटि टेक्स्ट
export const others = {
  CREATE_VARIABLE: "समूह नाम बनाएँ…",
  CREATE_VARIABLE_MESSAGE: "नया समूह नाम",
  RENAME_VARIABLE_MESSAGE: "समूह नाम '%1' बदलें",
  VARIDATE_VARIABLE_ALERT:
    "समूह नाम अक्षर से शुरू होना चाहिए और केवल अक्षर, अंक और अंडरस्कोर का उपयोग कर सकता है",
  DUPLICATE_VARIABLE_ALERT: "यह समूह नाम पहले से मौजूद है",
  fileLoadError: "फ़ाइल लोड करने में विफल:",
  fileLoadAlert: "फ़ाइल लोड करने में विफल। यह मान्य JSON फ़ाइल नहीं है।",
  fileSaveError: "सहेजने में विफल:",
  fileSaveAlert: "वर्कस्पेस सहेजने में विफल।",
  sampleLoadError: "नमूना लोड करने में विफल:",
  sampleLoadAlert: "नमूना लोड करने में विफल।",
  copyError: "क्लिपबोर्ड पर कॉपी करने में विफल:",
}
export default { ui, blockly, others }
