// html関連（textContent, placeholder, titleなど）
const ui = {
  pageName: "Scratch風Regexエディター",
  title: "Scratch風Regexエディター",
  setting: "設定",
  language: "言語",
  theme: "テーマ",
  autoTheme: "自動",
  lightTheme: "ライト",
  darkTheme: "ダーク",
  file: "ファイル",
  newFile: "新規作成",
  load: "コンピューターから読み込む",
  save: "コンピューターに保存する",
  sample: "サンプル",
  sampleDate: "日付検出",
  sampleNum: "数字区切り",
  regex: "正規表現パターン",
  cppy: "コピー",
  replace: "置換文字列",
  target: "対象テキスト",
  targetPlaceholder: "ここにテキストを入力（タブも入力可能）",
  result: "結果",
}

// blockly関連
const blockly = {
  CATEGORY_POSITION: "位置",
  CATEGORY_CHARS: "文字",
  CATEGORY_JOIN: "結合・選択",
  CATEGORY_GROUPS: "グループ化",
  CATEGORY_REPEAT: "繰り返し",
  CATEGORY_SUBSTITUTE: "置換",
  ROOT_TOOLTIP:
    "正規表現のルートブロックです。接続するとパターンが生成されます",
  REGEX_INPUT_TOOLTIP: "正規表現の入力ブロック。テキスト入力も可能です",
  ROOT_MESSAGE0: "正規表現：/%1/%2%3",
  ROOT_MESSAGE1: "置換：%1",
}
export default { blockly, ui }
