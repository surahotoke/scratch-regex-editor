// es.js
// Interfaz (textContent, placeholder, title, etc.)
const ui = {
  pageName: "Editor Regex estilo Scratch",
  title: "Editor Regex estilo Scratch",
  setting: "Configuración",
  language: "Idioma",
  theme: "Tema",
  autoTheme: "Automático",
  lightTheme: "Claro",
  darkTheme: "Oscuro",
  file: "Archivo",
  newFile: "Nuevo archivo",
  load: "Cargar desde el ordenador",
  save: "Guardar en el ordenador",
  sample: "Ejemplo",
  sampleDate: "Detección de fecha",
  sampleNum: "Separador de números",
  regex: "Patrón de expresión regular",
  copy: "Copiar",
  replace: "Cadena de reemplazo",
  target: "Texto de destino",
  targetPlaceholder: "Escribe el texto aquí (también se permite tabulación)",
  result: "Resultado",
}

// Blockly relacionado
const blockly = {
  CATEGORY_POSITION: "Posición",
  CATEGORY_CHARS: "Caracteres",
  CATEGORY_JOIN: "Unir / Opción",
  CATEGORY_GROUPS: "Agrupación",
  CATEGORY_REPEAT: "Repetición",
  CATEGORY_SUBSTITUTE: "Reemplazo",
  ROOT_MESSAGE0: "Regex: /%1/%2%3",
  ROOT_MESSAGE1: "Reemplazar: %1",
  ROOT_TOOLTIP:
    "Bloque raíz de una expresión regular. Conecta otros bloques aquí para formar el patrón.",
  REGEX_INPUT_TOOLTIP:
    "Bloque de entrada para regex. También puedes escribir texto directo.",
  ANCHOR_START_TOOLTIP: "Inicio de línea",
  ANCHOR_END_TOOLTIP: "Fin de línea",
  BOUNDARY_TOOLTIP: "Límite de palabra (entre \\w y \\W)",
  LOOK_TOOLTIP:
    "= Mirar adelante, ! Negar mirar adelante, < Mirar atrás, <! Negar mirar atrás.",
  CHARS_INPUT_TOOLTIP:
    "Entrada libre. Cuidado con caracteres especiales. También válido en reemplazo.",
  DOT_TOOLTIP:
    "Cualquier carácter excepto salto de línea. No se puede usar en clase de caracteres.",
  DW_TOOLTIP: "Dígitos [0-9], letras y guion bajo [a-zA-Z0-9_]",
  S_TOOLTIP: "Espacio: espacio, tabulación o salto de línea [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "Propiedades Unicode. Ej: P puntuación, S símbolos, Script=Hiragana, Han (chino). Más info: clic derecho → Ayuda.",
  TAB_TOOLTIP: "Carácter de tabulación. También en reemplazo.",
  NEWLINE_TOOLTIP: "Carácter de nueva línea. También en reemplazo.",
  ESCAPED_SPECIAL_TOOLTIP:
    "Carácter especial escapado. Ej: '-' solo en clase de caracteres. También en reemplazo (excepto $).",
  CHAR_CLASS_TOOLTIP:
    "Clase de caracteres. ^ al inicio para negar. Puede incluir todo menos sí mismo y '.'.",
  CHAR_CLASS_JOIN_TOOLTIP: "Solo dentro de clase de caracteres.",
  CHAR_CLASS_RANGE_TOOLTIP:
    "Rango (ej: a-z). Ambos deben ser un carácter. Solo en clase de caracteres.",
  JOIN_TOOLTIP: "Unir varios elementos en secuencia.",
  CHOICE_TOOLTIP:
    "Coincide con uno de varios elementos. Se evalúa de izquierda a derecha.",
  MUTATOR_CONTAINER_TOOLTIP: "Número de entradas del bloque.",
  MUTATOR_ITEM_MESSAGE0: "elemento",
  MUTATOR_ITEM_TOOLTIP: "Un espacio de entrada.",
  GROUP_NONCAPTURING_TOOLTIP: "Agrupación sin captura",
  GROUP_TOOLTIP: "Agrupación",
  GROUP_NAMED_TOOLTIP: "Agrupación con nombre",
  BACKREFERENCE_TOOLTIP:
    "Referencia hacia atrás a un grupo. Elige el número. Incluye normales y con nombre.",
  BACKREFERENCE_NAMED_TOOLTIP: "Referencia a grupo con nombre",
  QUESTION_TOOLTIP:
    "Opcional (si es posible una vez, si no ninguna). Con ? intenta menos coincidencias.",
  STAR_PLUS_TOOLTIP:
    "* = 0 o más, + = 1 o más. Con ? intenta menos coincidencias.",
  QUANTIT_EXACT_TOOLTIP: "Exactamente N repeticiones {N}",
  QUANTIT_MIN_TOOLTIP: "Al menos N repeticiones {N,}. Con ? menos.",
  QUANTIT_RANGE_TOOLTIP: "Entre N y M repeticiones {N,M}. Con ? menos.",
  NO_SUBSTITUTE_MESSAGE0: "Sin reemplazo",
  NO_SUBSTITUTE_TOOLTIP: "Solo coincidir, no reemplazar.",
  SUBSTITUTE_JOIN_TOOLTIP:
    "Unir bloques solo dentro de reemplazo. Fuera puedes usar entrada libre, tabulación, nueva línea o escape.",
  DOLLAR_TOOLTIP: "Escapar $ en reemplazo",
  AMPERSAND_TOOLTIP: "Texto coincidente (o posición)",
  MATCH_BEFORE_TOOLTIP: "Texto antes de la coincidencia (o posición)",
  MATCH_AFTER_TOOLTIP: "Texto después de la coincidencia (o posición)",
  MATCH_BACKREFERENCE_TOOLTIP:
    "Referencia a grupo en reemplazo. Incluye normales y con nombre.",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP:
    "Referencia a grupo con nombre en reemplazo",
}
export default { ui, blockly }
