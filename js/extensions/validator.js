// バリデーション

// Unicode プロパティ名のバリデーション
Blockly.Extensions.register("validate_unicode_property", function () {
  const field = this.getField("PROPERTY")
  field.setValidator((name) => {
    if (!/^[A-Za-z]\w*$/.test(name)) return null
    return name
  })
})

// char_class_range を1文字に制限
Blockly.Extensions.register("validate_char_range", function () {
  const startField = this.getField("START")
  const endField = this.getField("END")
  // 1文字のバリデーション関数
  function validateChar(char) {
    if (!/^(?:[^\\]|[\\].)$/.test(char)) return null
    return char
  }
  startField.setValidator(validateChar)
  endField.setValidator(validateChar)
})

// 名前付きグループのバリデートのためのフィールド拡張
const CREATE_VARIABLE_ID = "CREATE_VARIABLE_UNIQUE_ID"
class FieldVariableWithCreation extends Blockly.FieldVariable {
  constructor(variableName, validator, variableTypes, defaultType) {
    super(variableName, validator, variableTypes, defaultType)
  }

  static fromJson(options) {
    return new FieldVariableWithCreation(
      options["variable"],
      undefined,
      options["variable_types"],
      options["default_type"]
    )
  }

  getOptions(useCache) {
    const options = super.getOptions(useCache)
    const optionIndex = options.length - 2
    options.splice(optionIndex, 0, ["グループ名を作成...", CREATE_VARIABLE_ID])
    options[optionIndex + 1][0] = options[optionIndex + 1][0].replace(
      "変数",
      "グループ名"
    )
    options[optionIndex + 2][0] = options[optionIndex + 2][0].replace(
      "変数",
      "グループ名"
    )
    return options
  }

  onItemSelected_(menu, menuItem) {
    const value = menuItem.getValue()
    const workspace = this.getSourceBlock().workspace
    // 再帰的に名前入力を促す関数（作成・変更共用）
    function promptForValidName(message, initialName, callback) {
      Blockly.Variables.promptName(message, initialName, (newName) => {
        if (!newName) return // キャンセル
        if (!/^[a-zA-Z]\w*$/.test(newName)) {
          alert(
            "グループ名は英字で始まり、英数字とアンダースコアのみ使用できます"
          )
          return promptForValidName(message, newName, callback)
        }
        if (workspace.getVariableMap().getVariable(newName)) {
          alert("そのグループ名はすでに存在します")
          return promptForValidName(message, newName, callback)
        }
        callback(newName)
      })
    }

    if (value === CREATE_VARIABLE_ID) {
      promptForValidName("新しいグループ名", "", (validName) => {
        const model = workspace.getVariableMap().createVariable(validName)
        this.setValue(model.getId())
      })
    } else if (value === Blockly.RENAME_VARIABLE_ID) {
      const oldName = this.getText()
      const varModel = this.getVariable()
      promptForValidName(
        `グループ名'${oldName}'を変更`,
        oldName,
        (validName) => {
          workspace.getVariableMap().renameVariable(varModel, validName)
        }
      )
    } else {
      super.onItemSelected_(menu, menuItem)
    }
  }
}

Blockly.fieldRegistry.register(
  "field_variable_named",
  FieldVariableWithCreation
)

// count_range の最小値と最大値のバリデーション
Blockly.Extensions.register("validate_count_range", function () {
  const minField = this.getField("MIN")
  const maxField = this.getField("MAX")
  minField.setValidator((newMin) => {
    const max = maxField.getValue()
    if (max < newMin) maxField.setValue(newMin)
    return newMin
  })
  maxField.setValidator((newMax) => {
    const min = minField.getValue()
    if (newMax < min) return min
    return newMax
  })
})
