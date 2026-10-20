// 右クリックメニューの項目の右端に、機能紹介へ飛ぶ「?」を付ける

/**
 * 右クリックメニューの displayText に使う要素を作る
 * @param {string} text - 項目の文言
 * @param {string} anchor - 機能紹介（reference/<言語>/features.html）のアンカー
 * @returns {HTMLElement}
 */
export function textWithHelp(text, anchor) {
  const item = document.createElement("span")
  item.className = "menu-item-with-help"
  const label = document.createElement("span")
  label.textContent = text
  const help = document.createElement("a")
  help.className = "menu-help"
  help.href = `reference/${Blockly.Msg.REFERENCE_DIR}/features.html#${anchor}`
  help.target = "_blank"
  help.rel = "noopener"
  help.title = Blockly.Msg.HELP
  help.textContent = "?"
  // 「?」を押したときに、項目そのもの（ブロック化など）まで実行されないようにする
  for (const type of ["pointerdown", "pointerup", "mousedown", "mouseup"])
    help.addEventListener(type, (e) => e.stopPropagation())
  // リンクとしての動き（Cmd+クリックなども含む）はブラウザに任せ、開いたあとにメニューを閉じる
  help.addEventListener("click", (e) => {
    e.stopPropagation()
    setTimeout(() => Blockly.ContextMenu.hide())
  })
  item.append(label, help)
  return item
}
