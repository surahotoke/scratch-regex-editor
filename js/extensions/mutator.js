import createMutatorMixin, { addMarkerInput } from "../extensions/mutatorUtil.js"

// ミューテータ設定
const charClassMutatorMixin = createMutatorMixin({
  inputCheck: "charclass",
  defaultCount: 1,
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
  "char_class_mutator",
  charClassMutatorMixin,
  addMarkerInput,
  ["mutator_item"]
)

// ミューテーター登録
Blockly.Extensions.registerMutator(
  "join_mutator",
  joinMutatorMixin,
  addMarkerInput,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "choice_mutator",
  choiceMutatorMixin,
  addMarkerInput,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "substitute_join_mutator",
  substituteJoinMutatorMixin,
  addMarkerInput,
  ["mutator_item"]
)
