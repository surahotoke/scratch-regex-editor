// html関連（textContent, placeholder, titleなど）
const ui = {
  pageName: "Scratch 스타일 정규식 에디터",
  title: "Scratch 스타일 정규식 에디터",
  setting: "설정",
  language: "언어",
  theme: "테마",
  autoTheme: "자동",
  lightTheme: "라이트",
  darkTheme: "다크",
  file: "파일",
  newFile: "새 파일",
  load: "컴퓨터에서 불러오기",
  save: "컴퓨터에 저장",
  sample: "샘플",
  sampleDate: "날짜 감지",
  sampleNum: "숫자 구분",
  regex: "정규식 패턴",
  cppy: "복사",
  replace: "치환 문자열",
  target: "대상 텍스트",
  targetPlaceholder: "여기에 텍스트 입력 (탭도 지원됨)",
  result: "결과",
}

// blockly関連
const blockly = {
  CATEGORY_POSITION: "위치",
  CATEGORY_CHARS: "문자",
  CATEGORY_JOIN: "연결 / 선택",
  CATEGORY_GROUPS: "그룹화",
  CATEGORY_REPEAT: "반복",
  CATEGORY_SUBSTITUTE: "치환",
  ROOT_MESSAGE0: "정규식: /%1/%2%3",
  ROOT_MESSAGE1: "치환: %1",
  ROOT_TOOLTIP:
    "정규식의 루트 블록입니다. 여기에 블록을 연결하여 패턴을 만듭니다.",
  REGEX_INPUT_TOOLTIP: "정규식 입력 블록. 직접 입력도 가능합니다.",
  ANCHOR_START_TOOLTIP: "행의 시작",
  ANCHOR_END_TOOLTIP: "행의 끝",
  BOUNDARY_TOOLTIP: "단어 경계 (\\w 와 \\W 사이)",
  LOOK_TOOLTIP:
    "= 전방 탐색, ! 부정 전방 탐색, < 후방 탐색, <! 부정 후방 탐색. 앞뒤 조건에 따라 위치를 매칭합니다.",
  CHARS_INPUT_TOOLTIP:
    "자유 입력. 특수문자 사용 시 주의하세요. 치환에서도 사용 가능.",
  DOT_TOOLTIP: "개행을 제외한 임의의 한 문자. 문자 클래스 내에서는 사용 불가.",
  DW_TOOLTIP: "숫자 [0-9], 영문자 및 밑줄 [a-zA-Z0-9_]",
  S_TOOLTIP: "공백 문자: 스페이스, 탭, 개행 [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "유니코드 속성. 예: P 구두점, S 기호, Script=Hiragana 히라가나, Han 한자. 자세한 내용은 오른쪽 클릭 → 도움말.",
  TAB_TOOLTIP: "탭 문자. 치환에서도 사용 가능.",
  NEWLINE_TOOLTIP: "개행 문자. 치환에서도 사용 가능.",
  ESCAPED_SPECIAL_TOOLTIP:
    "이스케이프된 특수문자. '-'는 문자 클래스 내에서만 사용 가능. 치환에서도 사용 가능 (단 $는 불가).",
  CHAR_CLASS_TOOLTIP:
    "문자 클래스. 시작에 ^를 붙이면 부정. 자신과 '.'을 제외한 문자 포함 가능.",
  CHAR_CLASS_JOIN_TOOLTIP: "문자 클래스 내에서만 연결 가능.",
  CHAR_CLASS_RANGE_TOOLTIP:
    "범위 (예: a-z). 양쪽은 한 글자여야 함. 문자 클래스 내에서만 사용 가능.",
  JOIN_TOOLTIP: "여러 요소를 순서대로 연결.",
  CHOICE_TOOLTIP: "여러 요소 중 하나와 매칭. 왼쪽부터 검사.",
  MUTATOR_CONTAINER_TOOLTIP: "블록의 입력 슬롯 수.",
  MUTATOR_ITEM_MESSAGE0: "항목",
  MUTATOR_ITEM_TOOLTIP: "입력 슬롯.",
  GROUP_NONCAPTURING_TOOLTIP: "캡처하지 않는 그룹화",
  GROUP_TOOLTIP: "그룹화",
  GROUP_NAMED_TOOLTIP: "이름 있는 그룹화",
  BACKREFERENCE_TOOLTIP:
    "그룹에 대한 역참조. 그룹 번호를 선택. 이름 있는 그룹도 포함.",
  BACKREFERENCE_NAMED_TOOLTIP: "이름 있는 그룹에 대한 역참조",
  QUESTION_TOOLTIP:
    "옵션 (가능하면 한 번, 아니면 없음). ?를 붙이면 더 적게 매칭. 예: /^a??a/ 를 'aa'에 적용.",
  STAR_PLUS_TOOLTIP:
    "여러 번 반복: * = 0회 이상, + = 1회 이상. ?를 붙이면 더 적게 매칭.",
  QUANTIT_EXACT_TOOLTIP: "정확히 N회 반복 {N}",
  QUANTIT_MIN_TOOLTIP: "최소 N회 반복 {N,}. ?를 붙이면 더 적게 매칭.",
  QUANTIT_RANGE_TOOLTIP: "N~M회 반복 {N,M}. ?를 붙이면 더 적게 매칭.",
  NO_SUBSTITUTE_MESSAGE0: "치환 없음",
  NO_SUBSTITUTE_TOOLTIP: "매칭만 하고 치환하지 않음.",
  SUBSTITUTE_JOIN_TOOLTIP:
    "치환 내에서만 사용 가능한 연결 블록. 치환 외에서는 자유 입력, 탭, 개행, 이스케이프 가능.",
  DOLLAR_TOOLTIP: "치환 내에서 $ 이스케이프",
  AMPERSAND_TOOLTIP: "매칭된 문자열 (또는 위치)",
  MATCH_BEFORE_TOOLTIP: "매칭된 부분 앞의 문자열 (또는 위치)",
  MATCH_AFTER_TOOLTIP: "매칭된 부분 뒤의 문자열 (또는 위치)",
  MATCH_BACKREFERENCE_TOOLTIP: "치환에서 그룹 참조. 이름 있는 그룹도 포함.",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "치환에서 이름 있는 그룹 참조",
}
export default { ui, blockly }
