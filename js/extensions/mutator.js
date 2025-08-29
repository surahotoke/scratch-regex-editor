import { createListMutatorMixin } from "../extensions/mutatorUtil.js"

// ミューテータ設定
const charClassJoinMutatorConfig = {
  minInputs: 2,
  inputPrefix: "ADD",
  inputCheck: "charclass",
}
const joinMutatorConfig = {
  minInputs: 2,
  inputPrefix: "ADD",
  inputCheck: "regex",
}
const choiceMutatorConfig = {
  minInputs: 2,
  inputPrefix: "ADD",
  inputCheck: "regex",
  appendField: "|",
}
const substituteJoinMutatorConfig = {
  minInputs: 2,
  inputPrefix: "ADD",
  inputCheck: "substitute",
}

Blockly.Extensions.registerMutator(
  "char_class_join_mutator",
  createListMutatorMixin(charClassJoinMutatorConfig),
  undefined,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "join_mutator",
  createListMutatorMixin(joinMutatorConfig),
  undefined,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "choice_mutator",
  createListMutatorMixin(choiceMutatorConfig),
  undefined,
  ["mutator_item"]
)

Blockly.Extensions.registerMutator(
  "substitute_join_mutator",
  createListMutatorMixin(substituteJoinMutatorConfig),
  undefined,
  ["mutator_item"]
)
