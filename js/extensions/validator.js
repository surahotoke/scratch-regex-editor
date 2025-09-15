// バリデーション
import { others as ja } from "../locales/ja.js"
import { others as en } from "../locales/en.js"
import { others as zh } from "../locales/zh.js"
import { others as es } from "../locales/es.js"
import { others as ko } from "../locales/ko.js"
import { others as hi } from "../locales/hi.js"

const locales = {
  ja,
  en,
  zh,
  es,
  ko,
  hi,
}

function getLang() {
  const nowLang = document.querySelector(
    "label:has(>input[name=language]:checked)"
  )
  return nowLang.dataset.lang
}
function getLocale() {
  return locales[getLang()]
}
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
    options.splice(optionIndex, 0, [
      getLocale().CREATE_VARIABLE,
      CREATE_VARIABLE_ID,
    ])
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
          alert(getLocale().VARIDATE_VARIABLE_ALERT)
          return promptForValidName(message, newName, callback)
        }
        if (workspace.getVariableMap().getVariable(newName)) {
          alert(getLocale().DUPLICATE_VARIABLE_ALERT)
          return promptForValidName(message, newName, callback)
        }
        callback(newName)
      })
    }

    if (value === CREATE_VARIABLE_ID) {
      promptForValidName(
        getLocale().CREATE_VARIABLE_MESSAGE,
        "",
        (validName) => {
          const model = workspace.getVariableMap().createVariable(validName)
          this.setValue(model.getId())
        }
      )
    } else if (value === Blockly.RENAME_VARIABLE_ID) {
      const oldName = this.getText()
      const varModel = this.getVariable()
      promptForValidName(
        getLocale().RENAME_VARIABLE_MESSAGE.replace("%1", oldName),
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
