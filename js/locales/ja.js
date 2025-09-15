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
  copy: "コピー",
  replace: "置換文字列",
  target: "対象テキスト",
  targetPlaceholder: "ここにテキストを入力（タブも入力可能）",
  result: "結果",
}

// blockly関連
const blockly = {
  DUPLICATE_BLOCK: "複製",
  EXTERNAL_INPUTS: "外部入力",
  DELETE_BLOCK: "ブロックを削除",
  UNDO: "取り消す",
  REDO: "やり直す",
  CLEAN_UP: "ブロックを整理する",
  DELETE_X_BLOCKS: "%1個のブロックを削除",
  DELETE_ALL_BLOCKS: "%1個あるすべてのブロックを削除しますか？",
  HELP: "ヘルプ",
  RENAME_VARIABLE: "グループの名前を変える…",
  DELETE_VARIABLE: "グループ '%1' を削除",
  DELETE_VARIABLE_CONFIRMATION:
    "%1か所で使われているグループ '%2' を削除しますか？",
  CATEGORY_POSITION: "位置",
  CATEGORY_CHARS: "文字",
  CATEGORY_JOIN: "結合・選択",
  CATEGORY_GROUPS: "グループ化",
  CATEGORY_REPEAT: "繰り返し",
  CATEGORY_SUBSTITUTE: "置換",
  ROOT_MESSAGE0: "正規表現：/%1/%2%3",
  ROOT_MESSAGE1: "置換：%1",
  ROOT_TOOLTIP:
    "正規表現のルートブロックです。接続するとパターンが生成されます",
  REGEX_INPUT_TOOLTIP: "正規表現の入力ブロック。テキスト入力も可能です",
  ANCHOR_START_TOOLTIP: "行頭位置",
  ANCHOR_END_TOOLTIP: "行末位置",
  BOUNDARY_TOOLTIP: "単語境界（\\wと\\Wの間の位置）",
  LOOK_TOOLTIP:
    "=先読み・!否定先読み・<後読み・<!否定後読み。先読みは直後がこれになるような位置を表します",
  CHARS_INPUT_TOOLTIP:
    "自由入力欄。特殊文字を入力する際は注意してください。置換でも使用可能",
  DOT_TOOLTIP: "改行除く任意の1文字。文字クラス内では使用不可",
  DW_TOOLTIP: "数字[0-9]、英数字と_[a-zA-Z0-9_]",
  S_TOOLTIP: "半角スペース、タブ文字、改行文字[ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "Unicodeの文字プロパティ。P句読点、S記号や、Script=Hiraganaひらがな、Han漢字など色々指定可能。詳しくは右クリック→ヘルプ",
  TAB_TOOLTIP: "タブ文字。置換でも使用可能",
  NEWLINE_TOOLTIP: "改行文字。置換でも使用可能",
  ESCAPED_SPECIAL_TOOLTIP:
    "エスケープされた特殊文字。-は文字クラス内でのみ使用可能。置換でも使用可能（$は置換では使用不可）",
  CHAR_CLASS_TOOLTIP:
    "文字クラス。先頭に^で否定。自身と.以外の「文字」のものを使用可能",
  CHAR_CLASS_JOIN_TOOLTIP: "文字クラス内でのみ使用可能な連結ブロック",
  CHAR_CLASS_RANGE_TOOLTIP:
    "範囲指定(例：a-z)。どちらも1文字。文字クラス内のみ使用可能",
  JOIN_TOOLTIP: "複数の要素を並べて連結",
  CHOICE_TOOLTIP: "複数の要素のうち、いずれかにマッチ。左から順に評価する",
  MUTATOR_CONTAINER_TOOLTIP: "ブロックの入力欄の数",
  MUTATOR_ITEM_MESSAGE0: "要素",
  MUTATOR_ITEM_TOOLTIP: "入力枠",
  GROUP_NONCAPTURING_TOOLTIP: "キャプチャしないグループ化",
  GROUP_TOOLTIP: "グループ化",
  GROUP_NAMED_TOOLTIP: "名前付きグループ化",
  BACKREFERENCE_TOOLTIP:
    "グループの後方参照。グループ番号を選択します。注意：名前付きのグループも含めたグループ番号です",
  BACKREFERENCE_NAMED_TOOLTIP: "名前付きグループの後方参照",
  QUESTION_TOOLTIP:
    "なるべくあれば1回取り入れる（なければ無し）。？でなるべく取り入れないになります。例：/^a??a/をaaに適用",
  STAR_PLUS_TOOLTIP:
    "0回以上（*）、1回以上（+）なるべく繰り返す。？でなるべく少なくになります",
  QUANTIT_EXACT_TOOLTIP: "ピッタリN回繰り返す{N}",
  QUANTIT_MIN_TOOLTIP:
    "最低N回、なるべく多く繰り返す{N,}。？でなるべく少なくなります",
  QUANTIT_RANGE_TOOLTIP:
    "N~M回、なるべく多く繰り返す{N,M}。？でなるべく少なくなります",
  NO_SUBSTITUTE_MESSAGE0: "置換しない",
  NO_SUBSTITUTE_TOOLTIP: "マッチさせる",
  SUBSTITUTE_JOIN_TOOLTIP:
    "置換内でのみ使用可能な連結ブロック。置換以外では自由入力、タブ、改行、エスケープ文字も可能です",
  DOLLAR_TOOLTIP: "置換内の$のエスケープ",
  AMPERSAND_TOOLTIP: "マッチした部分文字列（または位置）",
  MATCH_BEFORE_TOOLTIP: "マッチした部分文字列の前の文字列（または位置）",
  MATCH_AFTER_TOOLTIP: "マッチした部分文字列の後ろの文字列（または位置）",
  MATCH_BACKREFERENCE_TOOLTIP:
    "グループの置換の参照。注意：名前付きのグループも含めたグループ番号です",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP: "名前付きグループの置換の参照",
}

// 自作メッセージ、エラーなど
export const others = {
  CREATE_VARIABLE: "グループ名を作成…",
  CREATE_VARIABLE_MESSAGE: "新しいグループ名",
  RENAME_VARIABLE_MESSAGE: "グループ名'%1'を変更",
  VARIDATE_VARIABLE_ALERT:
    "グループ名は英字で始まり、英数字とアンダースコアのみ使用できます",
  DUPLICATE_VARIABLE_ALERT: "そのグループ名はすでに存在します",
  fileLoadError: "ファイルの読み込みに失敗しました:",
  fileLoadAlert:
    "ファイルの読み込みに失敗しました。有効なJSONファイルではありません。",
  fileSaveError: "保存に失敗しました:",
  fileSaveAlert: "ワークスペースの保存に失敗しました。",
  sampleLoadError: "サンプルの読み込みに失敗しました:",
  sampleLoadAlert: "サンプルの読み込みに失敗しました。",
  copyError: "クリップボードへのコピーに失敗:",
}
export default { ui, blockly, others }
