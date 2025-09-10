// html関連（textContent, placeholder, titleなど）
const ui = {
  pageName: "Scratch शैली Regex संपादक",
  title: "Scratch शैली Regex संपादक",
  setting: "सेटिंग्स",
  language: "भाषा",
  theme: "थीम",
  autoTheme: "स्वचालित",
  lightTheme: "लाइट",
  darkTheme: "डार्क",
  file: "फ़ाइल",
  newFile: "नई फ़ाइल",
  load: "कंप्यूटर से लोड करें",
  save: "कंप्यूटर में सहेजें",
  sample: "नमूना",
  sampleDate: "तिथि पहचान",
  sampleNum: "संख्या विभाजक",
  regex: "नियमित अभिव्यक्ति पैटर्न",
  cppy: "कॉपी",
  replace: "प्रतिस्थापन स्ट्रिंग",
  target: "लक्षित टेक्स्ट",
  targetPlaceholder: "यहाँ टेक्स्ट दर्ज करें (टैब भी समर्थित हैं)",
  result: "परिणाम",
}

// blockly関連
const blockly = {
  CATEGORY_POSITION: "स्थिति",
  CATEGORY_CHARS: "अक्षर",
  CATEGORY_JOIN: "जोड़ / विकल्प",
  CATEGORY_GROUPS: "समूह",
  CATEGORY_REPEAT: "पुनरावृत्ति",
  CATEGORY_SUBSTITUTE: "प्रतिस्थापन",
  ROOT_MESSAGE0: "Regex: /%1/%2%3",
  ROOT_MESSAGE1: "प्रतिस्थापन: %1",
  ROOT_TOOLTIP:
    "नियमित अभिव्यक्ति का मूल ब्लॉक। पैटर्न बनाने के लिए यहाँ ब्लॉक कनेक्ट करें।",
  REGEX_INPUT_TOOLTIP:
    "Regex इनपुट ब्लॉक। आप सीधे टेक्स्ट भी टाइप कर सकते हैं।",
  ANCHOR_START_TOOLTIP: "पंक्ति की शुरुआत",
  ANCHOR_END_TOOLTIP: "पंक्ति का अंत",
  BOUNDARY_TOOLTIP: "शब्द सीमा (\\w और \\W के बीच)",
  LOOK_TOOLTIP:
    "= Lookahead, ! नकारात्मक Lookahead, < Lookbehind, <! नकारात्मक Lookbehind। यह पहले या बाद की सामग्री पर निर्भर करता है।",
  CHARS_INPUT_TOOLTIP:
    "मुक्त टेक्स्ट इनपुट। विशेष अक्षरों के साथ सावधान रहें। प्रतिस्थापन में भी उपयोग किया जा सकता है।",
  DOT_TOOLTIP:
    "नई पंक्ति को छोड़कर कोई भी एकल अक्षर। वर्ण वर्ग के अंदर उपयोग योग्य नहीं।",
  DW_TOOLTIP: "अंक [0-9], अक्षर और अंडरस्कोर [a-zA-Z0-9_]",
  S_TOOLTIP: "Whitespace: स्पेस, टैब, या नई पंक्ति [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "यूनिकोड गुण। उदाहरण: P विराम चिह्न, S प्रतीक, Script=Hiragana, Han (चीनी अक्षर)। अधिक जानकारी के लिए दाएँ-क्लिक → सहायता।",
  TAB_TOOLTIP: "टैब अक्षर। प्रतिस्थापन में भी उपयोग योग्य।",
  NEWLINE_TOOLTIP: "नई पंक्ति का अक्षर। प्रतिस्थापन में भी उपयोग योग्य।",
  ESCAPED_SPECIAL_TOOLTIP:
    "एस्केप किया गया विशेष अक्षर। उदाहरण: '-' केवल वर्ण वर्ग में। प्रतिस्थापन में भी उपयोग योग्य (लेकिन $ वहाँ मान्य नहीं)।",
  CHAR_CLASS_TOOLTIP:
    "वर्ण वर्ग। शुरुआत में ^ का उपयोग नकारने के लिए करें। स्वयं और '.' को छोड़कर अन्य अक्षर शामिल हो सकते हैं।",
  CHAR_CLASS_JOIN_TOOLTIP: "केवल वर्ण वर्ग के अंदर जोड़ें।",
  CHAR_CLASS_RANGE_TOOLTIP:
    "रेंज (उदा: a-z)। दोनों सिरों पर एकल अक्षर होना चाहिए। केवल वर्ण वर्ग में उपयोग योग्य।",
  JOIN_TOOLTIP: "कई तत्वों को अनुक्रम में जोड़ें।",
  CHOICE_TOOLTIP: "कई तत्वों में से किसी एक से मेल खाएँ। बाएँ से दाएँ जाँचें।",
  MUTATOR_CONTAINER_TOOLTIP: "ब्लॉक के इनपुट स्लॉट की संख्या।",
  MUTATOR_ITEM_MESSAGE0: "आइटम",
  MUTATOR_ITEM_TOOLTIP: "एक इनपुट स्लॉट।",
  GROUP_NONCAPTURING_TOOLTIP: "कैप्चर किए बिना समूह",
  GROUP_TOOLTIP: "समूह",
  GROUP_NAMED_TOOLTIP: "नामित समूह",
  BACKREFERENCE_TOOLTIP:
    "समूह के लिए बैकरेफ़रेंस। समूह संख्या चुनें। ध्यान दें: नामित समूह भी शामिल हैं।",
  BACKREFERENCE_NAMED_TOOLTIP: "नामित समूह के लिए बैकरेफ़रेंस",
  QUESTION_TOOLTIP:
    "वैकल्पिक (यदि संभव हो तो एक बार मेल खाएँ, अन्यथा कोई नहीं)। ? लगाने पर कम मेल खाता है। उदाहरण: /^a??a/ 'aa' पर।",
  STAR_PLUS_TOOLTIP:
    "कई बार दोहराएँ: * = 0 या अधिक, + = 1 या अधिक। ? लगाने पर कम मेल खाता है।",
  QUANTIT_EXACT_TOOLTIP: "सटीक N बार दोहराएँ {N}",
  QUANTIT_MIN_TOOLTIP:
    "कम से कम N बार दोहराएँ {N,}। ? लगाने पर कम मेल खाता है।",
  QUANTIT_RANGE_TOOLTIP: "N से M बार दोहराएँ {N,M}। ? लगाने पर कम मेल खाता है।",
  NO_SUBSTITUTE_MESSAGE0: "कोई प्रतिस्थापन नहीं",
  NO_SUBSTITUTE_TOOLTIP: "केवल मेल खाएँ, प्रतिस्थापित न करें।",
  SUBSTITUTE_JOIN_TOOLTIP:
    "केवल प्रतिस्थापन के अंदर उपयोग योग्य जोड़ ब्लॉक। प्रतिस्थापन के बाहर आप स्वतंत्र इनपुट, टैब, नई पंक्ति, या एस्केप का उपयोग कर सकते हैं।",
  DOLLAR_TOOLTIP: "प्रतिस्थापन में $ एस्केप करें",
  AMPERSAND_TOOLTIP: "मेल खाया हुआ टेक्स्ट (या स्थिति)",
  MATCH_BEFORE_TOOLTIP: "मेल खाए हुए हिस्से से पहले का टेक्स्ट (या स्थिति)",
  MATCH_AFTER_TOOLTIP: "मेल खाए हुए हिस्से के बाद का टेक्स्ट (या स्थिति)",
  MATCH_BACKREFERENCE_TOOLTIP:
    "प्रतिस्थापन में समूह का संदर्भ। नामित समूह भी शामिल हैं।",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "प्रतिस्थापन में नामित समूह का संदर्भ",
}
export default { ui, blockly }
