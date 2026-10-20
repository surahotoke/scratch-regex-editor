// 撮影スクリプトで共通に使う、ヘッドレスの Chrome を操作するための処理（開発用）
import { spawn } from "node:child_process"
import http from "node:http"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const CHROME =
  process.env.CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

// 対応している言語（リファレンスのフォルダ名）
export const LANGS = ["ja", "en", "zh", "es", "ko", "hi"]

/** コマンドライン引数から --lang と、それ以外の引数を取り出す（--lang がなければ全言語） */
export function parseArgs(argv) {
  const langs = []
  const rest = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lang") langs.push(argv[++i])
    else rest.push(argv[i])
  }
  for (const lang of langs)
    if (!LANGS.includes(lang)) throw new Error(`対応していない言語です: ${lang}`)
  return { langs: langs.length ? langs : LANGS, rest }
}

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
}

/** リポジトリのファイルを配信するサーバー */
export function startServer() {
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
export async function startChrome() {
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "regex-editor-capture-"))
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--hide-scrollbars",
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

  /** ページを開いて、読み込みが終わるまで待つ */
  const open = async (url) => {
    const loaded = once("Page.loadEventFired")
    await send("Page.navigate", { url })
    await loaded
  }
  /** ページの中で式を実行して、結果を返す（例外はエラーにする） */
  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
    if (exceptionDetails)
      throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text)
    return result.value
  }
  const close = async () => {
    socket.close()
    chrome.kill()
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {})
  }
  await send("Page.enable")
  return { send, open, evaluate, close }
}
