// グループ化ブロック定義
Blockly.defineBlocksWithJsonArray([
  {
    type: "group_noncapturing",
    message0: "(?:%1)",
    args0: [
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "キャプチャしないグループ化",
  },
  {
    type: "group",
    message0: "(%1)",
    args0: [
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "グループ化",
  },
  {
    type: "group_named",
    message0: "(?<%1>%2)",
    args0: [
      {
        type: "field_variable_named",
        name: "VAR",
        variable: "name",
      },
      {
        type: "input_value",
        name: "PATTERN",
        check: "regex",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "名前付きグループ化",
  },
  {
    type: "backreference",
    message0: "\\%1",
    args0: [
      {
        type: "field_grid_dropdown",
        name: "NUMBER",
        options: [["", ""]],
        columns: 5,
      },
    ],
    output: "regex",
    style: "groups",
    tooltip:
      "グループの後方参照。グループ番号を選択します。注意：名前付きのグループも含めたグループ番号です",
    extensions: ["dynamic_backreference"],
  },
  {
    type: "backreference_named",
    message0: "\\k<%1>",
    args0: [
      {
        type: "field_variable_named",
        name: "VAR",
        variable: "name",
      },
    ],
    output: "regex",
    style: "groups",
    tooltip: "名前付きグループの後方参照",
  },
])
