/**
 * ミューテーター生成用の汎用関数
 * @param {string | null} config.inputCheck - 入力に接続できるブロックの型
 * @param {string | undefined} config.appendField - 入力の間に追加するテキスト
 * @param {number | undefined} config.defaultCount - 入力数の初期値（省略時は2）
 * @returns {object} Blockly.Extensions.registerMutatorに渡すオブジェクト
 */
export default function (config) {
  return {
    // ブロックの状態（要素数）を保存する
    saveExtraState: function () {
      return { itemCount: this.itemCount_ }
    },

    // ブロックの状態を読み込む（新規作成時も呼ばれる）
    loadExtraState: function (state) {
      this.itemCount_ = state["itemCount"] ?? config.defaultCount ?? 2
      this.updateShape_()
    },

    // 編集画面（フライアウト）を生成する
    decompose: function (workspace) {
      const topBlock = workspace.newBlock("mutator_container")
      topBlock.initSvg()
      let connection = topBlock.getInput("STACK").connection
      for (let i = 0; i < this.itemCount_; i++) {
        const itemBlock = workspace.newBlock("mutator_item")
        itemBlock.initSvg()
        connection.connect(itemBlock.previousConnection)
        connection = itemBlock.nextConnection
      }
      this.saveConnections(topBlock)
      return topBlock
    },

    // 元のブロックの接続情報を、編集画面のブロックに一時保存する
    saveConnections: function (topBlock) {
      let itemBlock = topBlock.getInputTargetBlock("STACK")
      let i = 0
      while (itemBlock) {
        const input = this.getInput("ADD" + i)
        itemBlock.valueConnection_ = input && input.connection.targetConnection
        i++
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }
    },

    // 編集画面の状態を元に、元のブロックを再構築する
    compose: function (topBlock) {
      let itemBlock = topBlock.getInputTargetBlock("STACK")
      const connections = []
      while (itemBlock && !itemBlock.isInsertionMarker()) {
        connections.push(itemBlock.valueConnection_)
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }

      // ユーザーが削除した入力に接続されていたブロックを切り離す（後片付け）
      for (let i = 0; i < this.itemCount_; i++) {
        const connection = this.getInput("ADD" + i).connection.targetConnection
        if (connection && connections.indexOf(connection) === -1)
          connection.disconnect()
      }

      this.itemCount_ = connections.length
      this.updateShape_()

      // 保持しておいた接続情報を元に、ブロックを再接続する
      for (let i = 0; i < connections.length; i++) {
        const connection = connections[i]
        // もし connection が undefined や null でない（＝本物の接続情報である）場合のみ、
        // reconnect を実行する。
        if (connection) connection.reconnect(this, "ADD" + i)
      }
    },

    // ブロックの見た目（入力の数）を現在の状態に合わせて更新する
    updateShape_: function () {
      // 足りない分の入力を追加する
      for (let i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("ADD" + i)) {
          const input = this.appendValueInput("ADD" + i).setCheck(config.inputCheck)
          // 区切り文字が設定されていれば、入力の間に追加する
          if (config.appendField && i > 0) input.appendField(config.appendField)
          // 直前の入力（ADD0 なら MUTATOR_MARKER）の隣に移動する
          const prevName = i === 0 ? "MUTATOR_MARKER" : "ADD" + (i - 1)
          const prevIndex = this.inputList.indexOf(this.getInput(prevName))
          const lastIndex = this.inputList.length - 1
          if (prevIndex !== -1 && prevIndex + 1 !== lastIndex)
            this.moveNumberedInputBefore(lastIndex, prevIndex + 1)
        }
      }
      // 多すぎる分の入力を削除する
      let i = this.itemCount_
      while (this.getInput("ADD" + i)) {
        this.removeInput("ADD" + i)
        i++
      }
    },
  }
}

/**
 * ミューテーター付きブロックの先頭に空のダミー入力 MUTATOR_MARKER を追加する
 * （入力欄の位置をブロック間で揃え、ADD0 を置く位置の目印にするため）
 * Blockly.Extensions.registerMutatorの第3引数に渡す
 */
export function addMarkerInput() {
  const marker = this.appendDummyInput("MUTATOR_MARKER")
  this.moveNumberedInputBefore(this.inputList.length - 1, 0)
  // ADD0 の前に書かれたフィールド（[ や ^ など）をマーカーに移し、入力0個でも残るようにする
  // 描画前に呼ばれるので、fieldRow の中身を移すだけで済む
  const first = this.getInput("ADD0")
  if (first) {
    marker.fieldRow.push(...first.fieldRow)
    first.fieldRow.length = 0
  }
}
