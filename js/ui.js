import { regexGenerator } from "./generator.js"

registerContinuousToolbox()

// UI要素の取得
const autoRadio = document.querySelector('#auto-theme > input[type="radio"]')
const autoThemeQuery = window.matchMedia("(prefers-color-scheme: dark)")
const lightRadio = document.querySelector('#light-theme > input[type="radio"]')
const darkRadio = document.querySelector('#dark-theme > input[type="radio"]')
const newButton = document.getElementById("new-button")
const loadButton = document.getElementById("load-button")
const saveButton = document.getElementById("save-button")
const loadInput = document.getElementById("load-input")
const regexPattern = document.getElementById("regex-pattern")
const patternCopyButton = document.getElementById("pattern-copy")
const replaceText = document.getElementById("replace-text")
const replaceCopyButton = document.getElementById("replace-copy")
const targetText = document.getElementById("target-text")
const resultText = document.getElementById("result-text")

// ボタンによる切り替え
autoRadio.addEventListener("change", applyTheme)
lightRadio.addEventListener("change", applyTheme)
darkRadio.addEventListener("change", applyTheme)

// autoでオートでライト/ダークを切り替える
autoThemeQuery.addEventListener("change", () => {
  if (getSelectedThemeMode() === "auto") applyTheme()
})

// テーマ選択の検出
function getSelectedThemeMode() {
  if (autoRadio.checked) return "auto"
  if (lightRadio.checked) return "light"
  if (darkRadio.checked) return "dark"
  return "auto"
}

// テーマに応じて componentStyles を返す
function getComponentStylesForMode(mode) {
  const light = {
    workspaceBackgroundColour: "#f9f9f9",
    toolboxBackgroundColour: "#ffffff",
    flyoutBackgroundColour: "#f9f9f9",
    toolboxForegroundColour: "#0b1220",
    flyoutForegroundColour: "#0b1220",
  }
  const dark = {
    workspaceBackgroundColour: "#1e1e1e",
    toolboxBackgroundColour: "#2c2c2c",
    flyoutBackgroundColour: "#252525",
    toolboxForegroundColour: "#eeeeee",
    flyoutForegroundColour: "#eeeeee",
  }
  if (mode === "light") return light
  if (mode === "dark") return dark
  return autoThemeQuery.matches ? dark : light
}

// テーマを作成
function makeTheme() {
  const mode = getSelectedThemeMode()
  const componentStyles = getComponentStylesForMode(mode)
  return Blockly.Theme.defineTheme("myTheme", {
    categoryStyles: {
      position: { colour: "#3F51B5" },
      chars: { colour: "#2196F3" },
      join: { colour: "#009688" },
      groups: { colour: "#4CAF50" },
      repeat: { colour: "#FFC107" },
      substitute: { colour: "#FF5722" },
    },
    blockStyles: {
      root: { colourPrimary: "#546E7A" },
      position: { colourPrimary: "#3F51B5" },
      chars: { colourPrimary: "#2196F3" },
      charclass: { colourPrimary: "#00BCD4" },
      join: { colourPrimary: "#009688" },
      groups: { colourPrimary: "#4CAF50" },
      repeat: { colourPrimary: "#FFC107" },
      substitute: { colourPrimary: "#FF5722" },
      substituteShadow: { colourPrimary: "#FF9C7A" },
    },
    componentStyles,
  })
}

// テーマを更新
function applyTheme() {
  const newTheme = makeTheme()
  workspace.setTheme(newTheme)
}

// 初期テーマを作成
const myTheme = makeTheme()

const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "位置",
      categorystyle: "position",
      contents: [
        { kind: "block", type: "anchor_start" },
        { kind: "block", type: "anchor_end" },
        { kind: "block", type: "boundary" },
        { kind: "block", type: "look" },
      ],
    },
    {
      kind: "category",
      name: "文字",
      categorystyle: "chars",
      contents: [
        { kind: "block", type: "chars_input" },
        { kind: "block", type: "dot" },
        { kind: "block", type: "dw" },
        { kind: "block", type: "s" },
        { kind: "block", type: "unicode_property" },
        { kind: "block", type: "tab" },
        { kind: "block", type: "newline" },
        { kind: "block", type: "escaped_special" },
        { kind: "block", type: "char_class" },
        { kind: "block", type: "char_class_join" },
        { kind: "block", type: "char_class_range" },
      ],
    },
    {
      kind: "category",
      name: "結合・選択",
      categorystyle: "join",
      contents: [
        { kind: "block", type: "join" },
        { kind: "block", type: "choice" },
      ],
    },
    {
      kind: "category",
      name: "グループ化",
      categorystyle: "groups",
      contents: [
        { kind: "block", type: "group_noncapturing" },
        { kind: "block", type: "group" },
        { kind: "block", type: "group_named" },
        { kind: "block", type: "backreference" },
        { kind: "block", type: "backreference_named" },
      ],
    },
    {
      kind: "category",
      name: "繰り返し",
      categorystyle: "repeat",
      contents: [
        { kind: "block", type: "question" },
        { kind: "block", type: "star_plus" },
        { kind: "block", type: "quantit_exact" },
        { kind: "block", type: "quantit_min" },
        { kind: "block", type: "quantit_range" },
      ],
    },
    {
      kind: "sep",
    },
    {
      kind: "category",
      name: "置換",
      categorystyle: "substitute",
      contents: [
        { kind: "block", type: "substitute_join" },
        { kind: "block", type: "dollar" },
        { kind: "block", type: "ampersand" },
        { kind: "block", type: "match_before" },
        { kind: "block", type: "match_after" },
        { kind: "block", type: "match_backreference" },
        { kind: "block", type: "match_named_backreference" },
      ],
    },
  ],
}

Blockly.inject("blockly-editor", {
  renderer: "zelos",
  theme: myTheme,
  toolbox,
  collapse: false,
  comments: false,
  disable: false,
  modalInputs: false,
  zoom: {
    controls: true,
    startScale: 0.8,
  },
  plugins: {
    flyoutsVerticalToolbox: "ContinuousFlyout",
    metricsManager: "ContinuousMetrics",
    toolbox: "ContinuousToolbox",
  },
})

// Blocklyのワークスペースを取得
const workspace = Blockly.getMainWorkspace()
const flyout = Blockly.Workspace.getAll()[2]
const startScale = workspace.options.zoomOptions.startScale

// 通常の場合使用されるフライアウト
const dumyFlyout = workspace.getFlyout(false)

// フライアウトのzoomの変更を阻止
flyout.addChangeListener((event) => {
  const newScale = workspace.scale
  // newScale が 1 の場合も意味がないので無視
  if (event.type !== "viewport_change" || newScale === startScale) return
  // 一旦 1 に戻してフライアウトを整える
  workspace.scale = startScale
  dumyFlyout.reflow()
  // 本来のスケールに戻して再レイアウト
  workspace.scale = newScale
  workspace.resize()
})

// ルートブロックの設定
const rootBlockDef = {
  type: "root",
  x: 20,
  y: 20,
  inputs: {
    PATTERN: {
      shadow: { type: "regex_input" },
    },
    SUBSTITUTE: {
      shadow: { type: "no_substitute" },
    },
  },
}

// 入力欄とワークスペースを初期状態にリセットする
function resetWorkspace() {
  targetText.value = ""
  workspace.clear()

  // 初期ブロックを追加
  Blockly.serialization.blocks.append(rootBlockDef, workspace)
  const rootBlock = workspace.getBlocksByType("root")[0]
  rootBlock.setMovable(false)
  rootBlock.setDeletable(false)
  workspace.clearUndo()

  // 入力値やフラグの監視
  workspace.addChangeListener(evaluateRegex)
}

// 初期化時
resetWorkspace()

// ワークスペースの新規作成ボタン
newButton.addEventListener("click", () => {
  resetWorkspace()
})

// 読み込みボタンでファイル選択をトリガー
loadButton.addEventListener("click", () => {
  loadInput.click()
})

// ワークスペースを読み込み
loadInput.addEventListener("change", (event) => {
  const file = event.target.files[0]
  // キャンセル
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const state = JSON.parse(e.target.result)
      if (state.targetText) targetText.value = state.targetText
      if (state.workspace)
        Blockly.serialization.workspaces.load(state.workspace, workspace)
    } catch (e) {
      console.error("ファイルの読み込みに失敗しました:", e)
      alert(
        "ファイルの読み込みに失敗しました。有効なJSONファイルではありません。"
      )
    }
  }
  reader.readAsText(file)
  event.target.value = ""
})

// ワークスペースの保存
saveButton.addEventListener("click", () => {
  try {
    const state = {
      workspace: Blockly.serialization.workspaces.save(workspace),
      targetText: targetText.value,
    }
    const jsonString = JSON.stringify(state, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "regex_workspace.json"
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error("保存に失敗しました:", e)
    alert("ワークスペースの保存に失敗しました。")
  }
})

// サンプルを読み込む
async function loadSample(filePath) {
  try {
    const response = await fetch(`../samples/${filePath}`)
    if (!response.ok) throw new Error("HTTPエラー " + response.status)
    const state = await response.json()

    if (state.targetText) targetText.value = state.targetText
    if (state.workspace) {
      Blockly.serialization.workspaces.load(state.workspace, workspace)
    }
  } catch (e) {
    console.error("サンプルの読み込みに失敗しました:", e)
    alert("サンプルの読み込みに失敗しました。")
  }
}

// ボタンとファイルパスの対応をまとめて登録
document.querySelectorAll("button[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.dataset.sample + ".json"
    loadSample(file)
  })
})

// ターゲットテキストの入力で更新
targetText.addEventListener("input", evaluateRegex)

// タブを入力可能にする
targetText.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" || e.isComposing) return
  e.preventDefault()
  const start = targetText.selectionStart
  const end = targetText.selectionEnd
  targetText.setRangeText("\t", start, end, "end")
  // タブの場合はこっちで更新
  evaluateRegex()
})

// 正規表現コピー
patternCopyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(regexPattern.value)
    // 軽いフィードバック
    const icon = patternCopyButton.querySelector(".material-symbols-outlined")
    icon.textContent = "check"
    patternCopyButton.disabled = true
    setTimeout(() => (patternCopyButton.disabled = false), 300)
    setTimeout(() => (icon.textContent = "content_copy"), 900)
  } catch (e) {
    console.error("クリップボードへのコピーに失敗:", e)
  }
})

// 置換文字列コピー
replaceCopyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(replaceText.value)
    // 軽いフィードバック
    const icon = replaceCopyButton.querySelector(".material-symbols-outlined")
    icon.textContent = "check"
    replaceCopyButton.disabled = true
    setTimeout(() => (replaceCopyButton.disabled = false), 300)
    setTimeout(() => (icon.textContent = "content_copy"), 900)
  } catch (e) {
    console.error("クリップボードへのコピーに失敗:", e)
  }
})

// 正規表現の評価関数
function evaluateRegex() {
  const rootBlock = workspace.getBlocksByType("root", false)[0]
  const regexJsonStr = regexGenerator.blockToCode(rootBlock)
  const regexJson = JSON.parse(regexJsonStr)
  regexPattern.value = `/${regexJson.pattern}/${regexJson.flags}`
  replaceText.value = regexJson.substitute
  resultText.textContent = targetText.value
  try {
    const regex = new RegExp(regexJson.pattern, regexJson.flags)
    const substituteInput = rootBlock.getInput("SUBSTITUTE")
    const substituteBlock = substituteInput.connection.targetBlock()
    // 置換しない場合はマッチ部分をハイライト、置換する場合は置換して表示
    if (substituteBlock.isShadow()) {
      const matches = [...resultText.textContent.matchAll(regex)]
      // 空文字に位置だけマッチした場合
      if (targetText.value === "" && matches.length > 0) {
        const mark = document.createElement("mark")
        resultText.appendChild(mark)
        return
      }
      // 置換しない場合はマッチ部分をハイライト
      for (const match of matches.reverse()) {
        markTextRange(
          resultText.firstChild,
          match.index,
          match.index + match[0].length
        )
      }
    } else {
      // 置換する場合は置換して表示
      resultText.textContent = resultText.textContent.replace(
        regex,
        JSON.parse(
          JSON.stringify(regexJson.substitute).replaceAll("\\\\", "\\")
        )
      )
    }
    // 空白文字を可視化
    resultText.innerHTML = visualizeWhitespace(resultText.innerHTML)
  } catch (e) {
    resultText.textContent = `エラー：${e.message}`
  }
}

function markTextRange(node, start, end) {
  const range = document.createRange()
  range.setStart(node, start)
  range.setEnd(node, end)
  const mark = document.createElement("mark")
  range.surroundContents(mark)
}

// 空白文字を可視化する関数（置き換えるものがスペース、タブ、改行のみなのでinnerHTMLでエスケープしても問題ない）
function visualizeWhitespace(str) {
  return str
    .replace(/ /g, '<span class="sp-mark"> </span>') // 半角スペース → ␣
    .replace(/\t/g, '<span class="tb-mark">\t</span>') // タブ → ⇥
    .replace(/\n/g, '<span class="nl-mark">\n</span>') // 改行 → ⏎
}
