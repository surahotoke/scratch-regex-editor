# Scratch風のRegexエディター
正規表現をScratchで作成できます  

- 機能
  - 正規表現の作成/コピー
  - 置換の作成/コピー
  - マッチ（ハイライト付き）
  - 置換（ハイライト付き）
  - 空白文字（半角・全角スペース、タブ、改行）の可視化
  - データの保存/読み込み
  - 各ブロックの軽い説明
  - ヘルプページ（日本語・英語。上のメニューの「ヘルプ」、またはブロックの右クリック → 「ヘルプ」から開けます）
    - [ブロック一覧](https://surahotoke.github.io/scratch-regex-editor/reference/ja/blocks.html)：全ブロックの説明と使用例
    - [機能紹介](https://surahotoke.github.io/scratch-regex-editor/reference/ja/features.html)：画面の見方や、右クリックメニューなどの機能の使い方
  - スマホでも操作可能（Scratchを参考にした）
  - テーマ（自動/ライト/ダーク）の切り替え
  - 4つのサンプル
  - 右クリックでテキストとブロックの相互変換（ブロック化/テキスト化）
  - 右クリックで連結ブロックの中身をまとめる/まとめを解除
    - 右クリックの「外部入力」「インライン入力」と組み合わせると、長く複雑な正規表現を意味のまとまりごとに整理して見やすくできます

- 今後やること
  - `ui.js`の整理・分離

リンク：https://surahotoke.github.io/scratch-regex-editor/

## ライセンス
[MIT License](LICENSE)

---

# Scratch-like Regex Editor
Create regular expressions with a Scratch-style visual editor.

- Features
  - Create/copy regex
  - Create/copy replacement strings
  - Match (with highlighting)
  - Replace (with highlighting)
  - Visualize whitespace (half-/full-width spaces, tabs, newlines)
  - Save/load data
  - Short explanations for each block
  - Help pages (open from "Help" in the top menu, or right-click a block → "Help")
    - [Block Reference](https://surahotoke.github.io/scratch-regex-editor/reference/en/blocks.html): descriptions and examples for every block
    - [Features](https://surahotoke.github.io/scratch-regex-editor/reference/en/features.html): how to use the screen, right-click menu, and other features
  - Usable on mobile (inspired by Scratch)
  - Theme switching (auto / light / dark)
  - 4 sample patterns included
  - Convert between text and blocks from the right-click menu
  - Group/ungroup items in join blocks from the right-click menu
    - Combined with "External Inputs" / "Inline Inputs" in the right-click menu, this helps you organize long, complex regexes into meaningful chunks that are easier to read

- Future Work
  - Refactor/separate `ui.js`

Demo: https://surahotoke.github.io/scratch-regex-editor/

## License
[MIT License](LICENSE)
