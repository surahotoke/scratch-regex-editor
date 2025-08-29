/**
 * @fileoverview mutators.js
 * 汎用的なリスト形式ミューテーターを生成するためのファクトリ関数と、
 * そのUIを構成するヘルパーブロックを定義します。
 * このファイルは、これを利用するカスタムブロック定義ファイルよりも先に読み込む必要があります。
 */

// 1. ミューテーター用の汎用ヘルパーブロックの定義
// これらのブロックは、ミューテーターの編集画面（フライアウト）で使用されます。
Blockly.defineBlocksWithJsonArray([
  {
    // 編集画面の親となるコンテナブロック
    type: "mutator_container",
    message0: "%1",
    args0: [{ type: "input_statement", name: "STACK" }],
    style: "join",
    enableContextMenu: false,
    tooltip: "ここに追加した分だけ、ブロックの入力が増えます。",
  },
  {
    // 編集画面で追加・削除されるアイテムブロック
    type: "mutator_item",
    message0: "追加要素",
    style: "join",
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    tooltip: "追加の入力枠です。",
  },
])

/**
 * 2. リスト形式のミューテーターMixin（ブロックに混ぜ込む機能部品）を生成するファクトリ関数
 * @param {object} config - ミューテーターの振る舞いを定義する設定オブジェクト
 * @param {number} config.minInputs - このブロックが持つ最低入力数
 * @param {string} config.inputPrefix - 各入力に付ける名前の接頭辞（例: "ADD"）
 * @param {string | null} config.inputCheck - 入力に接続できるブロックの型
 * @param {string | undefined} config.appendField - 3つ目以降の入力の前に追加するテキスト（区切り文字など）
 * @returns {object} Blockly.Extensions.registerMutatorの第二引数に渡すためのMixinオブジェクト
 */
const createListMutatorMixin = function (config) {
  return {
    // ブロックの状態（要素数）を保存する
    saveExtraState: function () {
      return { itemCount: this.itemCount_ }
    },

    // ブロックの状態を読み込む（新規作成時も呼ばれる）
    loadExtraState: function (state) {
      this.itemCount_ = state["itemCount"] ?? config.minInputs
      this.updateShape_()
    },

    // 編集画面（フライアウト）を生成する
    decompose: function (workspace) {
      const topBlock = workspace.newBlock("mutator_container")
      topBlock.initSvg()
      let connection = topBlock.getInput("STACK").connection
      for (let i = config.minInputs; i < this.itemCount_; i++) {
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
      let i = config.minInputs
      while (itemBlock) {
        const input = this.getInput(config.inputPrefix + i)
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
      for (let i = config.minInputs; i < this.itemCount_; i++) {
        const connection = this.getInput(config.inputPrefix + i).connection
          .targetConnection
        if (connection && connections.indexOf(connection) === -1) {
          connection.disconnect()
        }
      }

      this.itemCount_ = config.minInputs + connections.length
      this.updateShape_()

      // 保持しておいた接続情報を元に、ブロックを再接続する
      for (let i = 0; i < connections.length; i++) {
        const connection = connections[i]
        // もし connection が undefined や null でない（＝本物の接続情報である）場合のみ、
        // reconnect を実行する。
        if (connection) {
          connection.reconnect(
            this,
            config.inputPrefix + (i + config.minInputs)
          )
        }
      }
    },

    // ブロックの見た目（入力の数）を現在の状態に合わせて更新する
    updateShape_: function () {
      // 足りない分の入力を追加する
      for (let i = config.minInputs; i < this.itemCount_; i++) {
        if (!this.getInput(config.inputPrefix + i)) {
          const input = this.appendValueInput(config.inputPrefix + i).setCheck(
            config.inputCheck
          )
          // 区切り文字が設定されていれば、入力の前に追加する
          if (config.appendField) {
            input.appendField(config.appendField)
          }
        }
      }
      // 多すぎる分の入力を削除する
      let i = this.itemCount_
      while (this.getInput(config.inputPrefix + i)) {
        this.removeInput(config.inputPrefix + i)
        i++
      }
    },
  }
}
export { createListMutatorMixin }
