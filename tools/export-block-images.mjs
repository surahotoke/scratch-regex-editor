// ブロック一覧（reference/<言語>/blocks.html）のブロック画像を書き出す（開発用）
// 使い方: node tools/export-block-images.mjs [--lang ja|en|zh|es|ko|hi]（--lang を省略すると全言語）
// tools/export-block-images.html をヘッドレスの Chrome で開き、描いた画像を保存する
// 文字が言語で変わるブロック（LANG_TYPES）は reference/images/blocks/<言語>/ に、
// それ以外は言語によらないので reference/images/blocks/common/ に、最初の言語のときに1度だけ保存する
import fs from "node:fs/promises"
import path from "node:path"
import { ROOT, parseArgs, startServer, startChrome } from "./chrome.mjs"

// 言語によって見た目が変わるブロック（それ以外は common に置く）
const LANG_TYPES = ["root"]

const { langs } = parseArgs(process.argv.slice(2))
const server = await startServer()
const { open, evaluate, close } = await startChrome()
try {
  for (const [i, lang] of langs.entries()) {
    const langDir = path.join(ROOT, "reference/images/blocks", lang)
    const commonDir = path.join(ROOT, "reference/images/blocks/common")
    await fs.mkdir(langDir, { recursive: true })
    await fs.mkdir(commonDir, { recursive: true })
    await open(`http://127.0.0.1:${server.address().port}/tools/export-block-images.html?lang=${lang}`)
    // 全部描き終わるのを待って、画像を base64 で受け取る
    const images = await evaluate(`(async () => {
      while (!window.__exportedImages) await new Promise((r) => setTimeout(r, 100))
      return Promise.all(window.__exportedImages.map(async ({ name, png }) => {
        const bytes = new Uint8Array(await png.arrayBuffer())
        let binary = ""
        for (const byte of bytes) binary += String.fromCharCode(byte)
        return { name, data: btoa(binary) }
      }))
    })()`)
    let saved = 0
    for (const { name, data } of images) {
      const isLangType = LANG_TYPES.includes(path.basename(name, ".png"))
      if (!isLangType && i > 0) continue
      await fs.writeFile(path.join(isLangType ? langDir : commonDir, name), Buffer.from(data, "base64"))
      saved++
    }
    console.log(`保存しました: ${lang}（${saved}枚${i === 0 ? "、共通の画像を含む" : ""}）`)
  }
} finally {
  await close()
  server.close()
}
