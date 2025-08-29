// 動的ドロップダウン

const dynamicBackreferenceDropdown = function () {
  const dropdown = this.getField("NUMBER")
  dropdown.menuGenerator_ = function () {
    const block = this.getSourceBlock()
    if (block.isInFlyout) return [["", ""]]
    const workspace = block.workspace
    const groupBlocks = workspace.getBlocksByType("group")
    const groupNamedBlocks = workspace.getBlocksByType("group_named")
    let groupCount = groupBlocks.length + groupNamedBlocks.length
    if (groupCount > 99) groupCount = 99 // 最大99個まで
    const options = []
    if (groupCount === 0) {
      options.push(["", ""])
    } else {
      for (let i = 1; i <= groupCount; i++) {
        const optionValue = String(i)
        options.push([optionValue, optionValue])
      }
    }
    return options
  }
}

/** 数値後方参照の動的ドロップダウン */
Blockly.Extensions.register(
  "dynamic_backreference",
  dynamicBackreferenceDropdown
)

/** 置換用数値後方参照の動的ドロップダウン */
Blockly.Extensions.register(
  "dynamic_substitute_backreference",
  dynamicBackreferenceDropdown
)
