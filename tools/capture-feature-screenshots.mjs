// 機能紹介（reference/<言語>/features.html）の画面のスクリーンショットを撮る（開発用）
// 使い方: node tools/capture-feature-screenshots.mjs [--lang ja|en|zh|es|ko|hi] [撮るものの名前...]
// Chrome をヘッドレスで起動し、DevTools Protocol で操作して reference/images/features/<言語>/ に PNG を保存する
// 言語によらない画像（COMMON_SHOTS）は reference/images/features/common/ に、最初の言語のときに1度だけ保存する
// （--lang を省略すると全言語、名前を省略すると全部撮る）
import fs from "node:fs/promises"
import path from "node:path"
import { ROOT, parseArgs, startServer, startChrome } from "./chrome.mjs"

// 画面の大きさと倍率（高解像度の画面でもにじまないように2倍）
const VIEWPORT = { width: 1280, height: 800, deviceScaleFactor: 2 }

const PAGE_HELPERS = `
  window.__sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  // Blockly の描画とイベント処理が終わるのを待つ
  window.__settle = async () => {
    await Blockly.renderManagement.finishQueuedRenders()
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    await __sleep(150)
  }
  // 要素の範囲を合わせた四角形（余白付き、画面内に収める）
  window.__rectOf = (elements, padding = 8) => {
    // 表示されていない要素（大きさ0）は範囲に入れない
    const rects = elements
      .filter(Boolean)
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0)
    const left = Math.max(0, Math.min(...rects.map((r) => r.left)) - padding)
    const top = Math.max(0, Math.min(...rects.map((r) => r.top)) - padding)
    const right = Math.min(innerWidth, Math.max(...rects.map((r) => r.right)) + padding)
    const bottom = Math.min(innerHeight, Math.max(...rects.map((r) => r.bottom)) + padding)
    return { x: left, y: top, width: right - left, height: bottom - top }
  }
  // 結果欄（見出しから、文字の最後の行まで）
  window.__resultRect = () => {
    const section = document.getElementById("result-text").closest("section")
    const range = document.createRange()
    range.selectNodeContents(document.getElementById("result-text"))
    const text = range.getBoundingClientRect()
    const box = section.getBoundingClientRect()
    const bottom = Math.min(box.bottom, text.bottom + 16)
    return __rectOf([{ getBoundingClientRect: () => new DOMRect(box.left, box.top, box.width, bottom - box.top) }])
  }
  window.__ws = () => Blockly.getMainWorkspace()
  window.__root = () => __ws().getBlocksByType("root")[0]
  window.__setPattern = (text) => __root().getInputTargetBlock("PATTERN").setFieldValue(text, "PATTERN")
  window.__setSubstitute = (state) => {
    const block = Blockly.serialization.blocks.append(state, __ws())
    __root().getInput("SUBSTITUTE").connection.connect(block.outputConnection)
  }
  window.__setTarget = (text) => {
    const target = document.getElementById("target-text")
    target.value = text
    target.dispatchEvent(new Event("input", { bubbles: true }))
  }
  // ワークスペースの、ルートの下あたりにブロックを置く
  window.__place = (state, y = 140) => {
    const block = Blockly.serialization.blocks.append(state, __ws())
    const rootXY = __root().getRelativeToSurfaceXY()
    block.moveTo(new Blockly.utils.Coordinate(rootXY.x, rootXY.y + y))
    return block
  }
  window.__text = (text) => ({ type: "chars_input", fields: { TEXT: text } })
  window.__join = (texts) => ({
    type: "join",
    extraState: { itemCount: texts.length },
    inputs: Object.fromEntries(texts.map((t, i) => ["ADD" + i, { block: __text(t) }])),
  })
  window.__contextMenu = (block) => {
    const r = block.getSvgRoot().getBoundingClientRect()
    // ブロックに重ならないよう、ブロックのすぐ下に開く
    block.showContextMenu(new PointerEvent("contextmenu", { clientX: r.left + 20, clientY: r.bottom + 4 }))
  }
  window.__blocklyRect = () => document.querySelector(".blocklyMainBackground").getBoundingClientRect()
  // 上のメニューのラベル（言語で文字が変わるので data-locale で探す）
  window.__menuLabel = (key) => document.querySelector(\`.dropdown-label [data-locale="\${key}"]\`).closest(".dropdown-label")
`

// 文字が写らず、言語によらない画像（common に置く）
const COMMON_SHOTS = ["after-group", "inputs-inline", "inputs-external"]

// 撮るもの（setup はページの中で実行され、撮る範囲を返す）
const SHOTS = {
  // 画面全体（ブロックが画面に収まる短いサンプルを読み込んだ状態）
  overview: `
    document.querySelector('button[data-sample="html"]').click()
    await __sleep(500); await __settle()
    return { x: 0, y: 0, width: innerWidth, height: innerHeight }
  `,
  // マッチのハイライト
  match: `
    __setPattern("\\\\d+"); __setTarget("a1 b22 c333"); await __settle()
    return __resultRect()
  `,
  // 置換のハイライト
  replace: `
    __setPattern("\\\\d+"); __setSubstitute(__text("[$&]")); __setTarget("a1 b22 c333"); await __settle()
    return __resultRect()
  `,
  // 空白の可視化
  whitespace: `
    __setPattern("\\\\S+"); __setTarget("a b\\tc\\u3000d\\ne"); await __settle()
    return __resultRect()
  `,
  // ブロック化・テキスト化のメニュー
  "menu-blockify": `
    __setPattern("^[a-f]+$"); await __settle()
    __contextMenu(__root()); await __settle()
    return __rectOf([__root().getSvgRoot(), document.querySelector(".blocklyContextMenu")])
  `,
  // ブロック化したあと（右クリックメニューの「ブロック化」と同じ処理を実行する）
  "after-blockify": `
    __setPattern("^[a-f]+$"); await __settle()
    Blockly.ContextMenuRegistry.registry.getItem("convert_to_blocks").callback({ block: __root() }); await __settle()
    return __rectOf([__root().getSvgRoot()])
  `,
  // N個まとめるのメニュー
  "menu-group": `
    const join = __place(__join(["a", "b", "c", "d", "e", "f", "g", "h"])); await __settle()
    const item = join.getInputTargetBlock("ADD0")
    __contextMenu(item); await __settle()
    return __rectOf([join.getSvgRoot(), document.querySelector(".blocklyContextMenu")])
  `,
  // 4個まとめたあと（右クリックメニューの「4個まとめる」と同じ処理を実行する）
  "after-group": `
    const join = __place(__join(["a", "b", "c", "d", "e", "f", "g", "h"])); await __settle()
    Blockly.ContextMenuRegistry.registry.getItem("group_items_4").callback({ block: join.getInputTargetBlock("ADD0") }); await __settle()
    return __rectOf([join.getSvgRoot()])
  `,
  // インライン入力（横並び）
  "inputs-inline": `
    const join = __place(__join(["ab", "cd", "ef"])); await __settle()
    return __rectOf([join.getSvgRoot()])
  `,
  // 外部入力（縦並び）
  "inputs-external": `
    const join = __place(__join(["ab", "cd", "ef"]))
    join.setInputsInline(false); await __settle()
    return __rectOf([join.getSvgRoot()])
  `,
  // 入力欄の数を変える編集画面
  mutator: `
    const join = __place(__join(["ab", "cd"])); await __settle()
    await join.getIcon(Blockly.icons.MutatorIcon.TYPE).setBubbleVisible(true); await __settle(); await __sleep(300)
    return __rectOf([join.getSvgRoot(), document.querySelector(".blocklyMiniWorkspaceBubble")])
  `,
  // グループ名のドロップダウン
  "group-name": `
    const group = __place({ type: "group_named" }); await __settle()
    group.getField("VAR").showEditor(); await __settle(); await __sleep(300)
    return __rectOf([group.getSvgRoot(), document.querySelector(".blocklyDropDownDiv .blocklyMenu")])
  `,
  // 上のメニュー（ファイル・サンプル・設定）
  "menu-file": `
    const label = __menuLabel("file")
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-sample": `
    const label = __menuLabel("sample")
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-help": `
    const label = __menuLabel("help")
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-setting": `
    const label = __menuLabel("setting")
    label.focus(); await __sleep(200)
    // テーマのメニューはフォーカスを移すと閉じてしまうので、撮影のときだけ CSS で開いた状態にする
    const themeMenu = document.querySelector("#auto-theme").closest(".side-dropdown-menu")
    themeMenu.style.display = "block"
    await __sleep(200)
    return __rectOf([label, label.nextElementSibling, themeMenu])
  `,
}

const { langs, rest: only } = parseArgs(process.argv.slice(2))
const server = await startServer()
const { send, open, evaluate, close } = await startChrome()
try {
  await send("Emulation.setDeviceMetricsOverride", { ...VIEWPORT, mobile: false })
  // ヘッドレスではページにフォーカスが当たらず、:focus で開く上のメニューが開かないので再現する
  await send("Emulation.setFocusEmulationEnabled", { enabled: true })
  for (const [i, lang] of langs.entries()) {
    for (const [name, setup] of Object.entries(SHOTS)) {
      if (only.length && !only.includes(name)) continue
      const isCommon = COMMON_SHOTS.includes(name)
      if (isCommon && i > 0) continue
      const dir = isCommon ? "common" : lang
      const outDir = path.join(ROOT, "reference/images/features", dir)
      await fs.mkdir(outDir, { recursive: true })
      await open(`http://127.0.0.1:${server.address().port}/index.html`)
      const clip = await evaluate(`(async () => {
        ${PAGE_HELPERS}
        // 言語とライトテーマにそろえる
        const langInput = document.querySelector('label[data-lang="${lang}"] > input')
        if (!langInput.checked) langInput.click()
        document.querySelector("#light-theme > input").click()
        await __settle()
        ${setup}
      })()`).catch((e) => {
        throw new Error(`${lang}/${name}: ${e.message}`)
      })
      const { data } = await send("Page.captureScreenshot", { format: "png", clip: { ...clip, scale: 1 } })
      await fs.writeFile(path.join(outDir, `${name}.png`), Buffer.from(data, "base64"))
      console.log(`保存しました: reference/images/features/${dir}/${name}.png`)
    }
  }
} finally {
  await close()
  server.close()
}
