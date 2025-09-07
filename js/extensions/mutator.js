import createMutatorMixin from "../extensions/mutatorUtil.js"

// ミューテータ設定
const charClassJoinMutatorMixin = createMutatorMixin({
  inputCheck: "charclass",
})
const joinMutatorMixin = createMutatorMixin({ inputCheck: "regex" })
const substituteJoinMutatorMixin = createMutatorMixin({
  inputCheck: "substitute",
})
const choiceMutatorMixin = createMutatorMixin({
  inputCheck: "regex",
  appendField: "|",
})

Blockly.Extensions.registerMutator(
  "char_class_join_mutator",
  charClassJoinMutatorMixin,
  undefined,
  ["mutator_item"]
)

// ミューテーター登録
Blockly.Extensions.registerMutator(
  "join_mutator",
  joinMutatorMixin,
  undefined,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "choice_mutator",
  choiceMutatorMixin,
  undefined,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "substitute_join_mutator",
  substituteJoinMutatorMixin,
  undefined,
  ["mutator_item"]
)
