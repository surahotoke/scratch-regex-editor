# Scratch風Regexエディター
Scratchのようなブロックを組み立てて、正規表現を作成できます  

- 機能
  - 正規表現の作成/コピー
  - 置換の作成/コピー
  - マッチ（ハイライト付き）
  - 置換（ハイライト付き）
  - 空白文字（半角・全角スペース、タブ、改行）の可視化
  - データの保存/読み込み
  - 各ブロックの軽い説明
  - ヘルプページ（エディターと同じ6言語。上のメニューの「ヘルプ」、またはブロックの右クリック → 「ヘルプ」から開けます）
    - [ブロック一覧](https://surahotoke.github.io/scratch-regex-editor/reference/ja/blocks.html)：全ブロックの説明と使用例
    - [機能紹介](https://surahotoke.github.io/scratch-regex-editor/reference/ja/features.html)：画面の見方や、右クリックメニューなどの機能の使い方
  - スマホでも操作可能（Scratchを参考にした）
  - テーマ（自動/ライト/ダーク）の切り替え
  - 言語（日本語・English・简体中文・Español・한국어・हिंदी）の切り替え
  - 4つのサンプル
  - 右クリックでテキストとブロックの相互変換（ブロック化/テキスト化）
  - 右クリックで連結ブロックの中身をまとめる/まとめを解除
    - 右クリックの「外部入力」「インライン入力」と組み合わせると、長く複雑な正規表現を意味のまとまりごとに整理して見やすくできます

- 今後やること
  - `ui.js`の整理・分離

- 開発用
  - ヘルプページの画像は、スクリプトで撮り直せます（Chrome と Node.js 22 以降が必要です）
    - `node tools/export-block-images.mjs`：ブロック一覧のブロック画像
    - `node tools/capture-feature-screenshots.mjs`：機能紹介の画面のスクリーンショット
    - どちらも `--lang ja` のように言語を指定すると、その言語だけを撮り直します
    - Chrome は Mac の標準の場所から起動します。ほかの場所にあるときは、環境変数 `CHROME` で指定します

リンク：https://surahotoke.github.io/scratch-regex-editor/

## ライセンス
[MIT License](LICENSE)

---

# Scratch-style Regex Editor
Create regular expressions with a Scratch-style visual editor.

- Features
  - Create/copy regex
  - Create/copy replacement strings
  - Match (with highlighting)
  - Replace (with highlighting)
  - Visualize whitespace (half-/full-width spaces, tabs, newlines)
  - Save/load data
  - Short explanations for each block
  - Help pages, in the same six languages as the editor (open from "Help" in the top menu, or right-click a block → "Help")
    - [Block Reference](https://surahotoke.github.io/scratch-regex-editor/reference/en/blocks.html): descriptions and examples for every block
    - [Features](https://surahotoke.github.io/scratch-regex-editor/reference/en/features.html): how to use the screen, right-click menu, and other features
  - Usable on mobile (inspired by Scratch)
  - Theme switching (auto / light / dark)
  - Language switching (日本語, English, 简体中文, Español, 한국어, हिंदी)
  - 4 sample patterns included
  - Convert between text and blocks from the right-click menu
  - Group/ungroup items in join blocks from the right-click menu
    - Combined with "External Inputs" / "Inline Inputs" in the right-click menu, this helps you organize long, complex regexes into meaningful chunks that are easier to read

- Future Work
  - Refactor/separate `ui.js`

- Development
  - The images in the help pages can be regenerated with scripts (requires Chrome and Node.js 22 or later)
    - `node tools/export-block-images.mjs`: block images for the Block Reference
    - `node tools/capture-feature-screenshots.mjs`: screenshots for the Features page
    - Add `--lang en` (or another language) to regenerate only that language
    - Chrome is launched from its default location on macOS. Set the `CHROME` environment variable if it is somewhere else

Demo: https://surahotoke.github.io/scratch-regex-editor/

## License
[MIT License](LICENSE)
