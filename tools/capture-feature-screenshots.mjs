// 機能紹介（reference/features.html）の画面のスクリーンショットを撮る（開発用）
// 使い方: node tools/capture-feature-screenshots.mjs
// Chrome をヘッドレスで起動し、DevTools Protocol で操作して reference/images/features/ に PNG を保存する
import { spawn } from "node:child_process"
import http from "node:http"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = path.join(ROOT, "reference/images/features")
const CHROME =
  process.env.CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
// 画面の大きさと倍率（高解像度の画面でもにじまないように2倍）
const VIEWPORT = { width: 1280, height: 800, deviceScaleFactor: 2 }

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
}

/** リポジトリのファイルを配信するサーバー */
function startServer() {
  const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname)
    const filePath = path.join(ROOT, urlPath.endsWith("/") ? urlPath + "index.html" : urlPath)
    try {
      const body = await fs.readFile(filePath)
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] ?? "application/octet-stream" })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end()
    }
  })
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)))
}

/** Chrome を起動して、ページに DevTools Protocol でつなぐ */
async function startChrome() {
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "regex-editor-capture-"))
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--hide-scrollbars",
    "--lang=ja",
    "about:blank",
  ])
  const browserUrl = await new Promise((resolve, reject) => {
    chrome.stderr.on("data", (data) => {
      const match = String(data).match(/DevTools listening on (ws:\/\/\S+)/)
      if (match) resolve(match[1])
    })
    chrome.on("exit", () => reject(new Error("Chrome が起動できませんでした")))
  })
  const port = new URL(browserUrl).port
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((r) => r.json())
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }))

  let nextId = 1
  const pending = new Map()
  const listeners = new Map()
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message))
      else resolve(message.result)
    } else if (message.method && listeners.has(message.method)) {
      listeners.get(message.method)(message.params)
      listeners.delete(message.method)
    }
  })
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++
      pending.set(id, { resolve, reject })
      socket.send(JSON.stringify({ id, method, params }))
    })
  const once = (method) => new Promise((resolve) => listeners.set(method, resolve))
  const close = async () => {
    socket.close()
    chrome.kill()
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {})
  }
  return { send, once, close }
}

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
`

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
    const label = [...document.querySelectorAll(".dropdown-label")].find((e) => e.textContent.includes("ファイル"))
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-sample": `
    const label = [...document.querySelectorAll(".dropdown-label")].find((e) => e.textContent.includes("サンプル"))
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-help": `
    const label = [...document.querySelectorAll(".dropdown-label")].find((e) => e.textContent.includes("ヘルプ"))
    label.focus(); await __sleep(200)
    return __rectOf([label, label.nextElementSibling])
  `,
  "menu-setting": `
    const label = [...document.querySelectorAll(".dropdown-label")].find((e) => e.textContent.includes("設定"))
    label.focus(); await __sleep(200)
    // テーマのメニューはフォーカスを移すと閉じてしまうので、撮影のときだけ CSS で開いた状態にする
    const themeMenu = document.querySelector("#auto-theme").closest(".side-dropdown-menu")
    themeMenu.style.display = "block"
    await __sleep(200)
    return __rectOf([label, label.nextElementSibling, themeMenu])
  `,
}

const server = await startServer()
const { send, once, close } = await startChrome()
try {
  await fs.mkdir(OUT_DIR, { recursive: true })
  await send("Page.enable")
  await send("Emulation.setDeviceMetricsOverride", { ...VIEWPORT, mobile: false })
  // ヘッドレスではページにフォーカスが当たらず、:focus で開く上のメニューが開かないので再現する
  await send("Emulation.setFocusEmulationEnabled", { enabled: true })
  const only = process.argv.slice(2)
  for (const [name, setup] of Object.entries(SHOTS)) {
    if (only.length && !only.includes(name)) continue
    const loaded = once("Page.loadEventFired")
    await send("Page.navigate", { url: `http://127.0.0.1:${server.address().port}/index.html` })
    await loaded
    const { result, exceptionDetails } = await send("Runtime.evaluate", {
      expression: `(async () => {
        ${PAGE_HELPERS}
        // 日本語・ライトテーマにそろえる
        document.querySelector('label[data-lang="ja"] > input').click()
        document.querySelector("#light-theme > input").click()
        await __settle()
        ${setup}
      })()`,
      awaitPromise: true,
      returnByValue: true,
    })
    if (exceptionDetails) throw new Error(`${name}: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`)
    const { data } = await send("Page.captureScreenshot", {
      format: "png",
      clip: { ...result.value, scale: 1 },
    })
    await fs.writeFile(path.join(OUT_DIR, `${name}.png`), Buffer.from(data, "base64"))
    console.log(`保存しました: reference/images/features/${name}.png`)
  }
} finally {
  await close()
  server.close()
}
