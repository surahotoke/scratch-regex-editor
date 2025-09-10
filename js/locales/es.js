// html関連（textContent, placeholder, titleなど）
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
  newFile: "Nuevo Archivo",
  load: "Cargar desde el ordenador",
  save: "Guardar en el ordenador",
  sample: "Ejemplo",
  sampleDate: "Detección de fecha",
  sampleNum: "Separador de números",
  regex: "Patrón de expresión regular",
  cppy: "Copiar",
  replace: "Cadena de reemplazo",
  target: "Texto objetivo",
  targetPlaceholder: "Escriba texto aquí (también se admiten tabulaciones)",
  result: "Resultado",
}

// blockly関連
const blockly = {
  CATEGORY_POSITION: "Posición",
  CATEGORY_CHARS: "Caracteres",
  CATEGORY_JOIN: "Unir / Opción",
  CATEGORY_GROUPS: "Agrupación",
  CATEGORY_REPEAT: "Repetición",
  CATEGORY_SUBSTITUTE: "Sustitución",
  ROOT_MESSAGE0: "Regex: /%1/%2%3",
  ROOT_MESSAGE1: "Reemplazar: %1",
  ROOT_TOOLTIP:
    "Bloque raíz para una expresión regular. Conecta bloques aquí para construir un patrón.",
  REGEX_INPUT_TOOLTIP:
    "Bloque de entrada regex. También puede escribir texto directamente.",
  ANCHOR_START_TOOLTIP: "Inicio de línea",
  ANCHOR_END_TOOLTIP: "Fin de línea",
  BOUNDARY_TOOLTIP: "Límite de palabra (entre \\w y \\W)",
  LOOK_TOOLTIP:
    "= Lookahead, ! Lookahead negativo, < Lookbehind, <! Lookbehind negativo. Coincide según lo que haya antes o después.",
  CHARS_INPUT_TOOLTIP:
    "Entrada libre de texto. Tenga cuidado con caracteres especiales. También se puede usar en reemplazo.",
  DOT_TOOLTIP:
    "Cualquier carácter excepto salto de línea. No usable en clases de caracteres.",
  DW_TOOLTIP: "Dígitos [0-9], letras y guion bajo [a-zA-Z0-9_]",
  S_TOOLTIP:
    "Espacios en blanco: espacio, tabulación o salto de línea [ \\t\\n]",
  UNICODE_PROPERTY_TOOLTIP:
    "Propiedad Unicode. Ej: P puntuación, S símbolos, Script=Hiragana, Han caracteres chinos. Clic derecho → Ayuda para más detalles.",
  TAB_TOOLTIP: "Carácter de tabulación. También usable en reemplazo.",
  NEWLINE_TOOLTIP: "Carácter de nueva línea. También usable en reemplazo.",
  ESCAPED_SPECIAL_TOOLTIP:
    "Carácter especial escapado. Ej: '-' solo en clases de caracteres. También usable en reemplazo (excepto $).",
  CHAR_CLASS_TOOLTIP:
    "Clase de caracteres. Use ^ al inicio para negar. Puede incluir caracteres excepto sí mismo y '.'.",
  CHAR_CLASS_JOIN_TOOLTIP: "Unir solo dentro de una clase de caracteres.",
  CHAR_CLASS_RANGE_TOOLTIP:
    "Rango (ej: a-z). Extremos deben ser un solo carácter. Solo en clases de caracteres.",
  JOIN_TOOLTIP: "Une varios elementos en secuencia.",
  CHOICE_TOOLTIP:
    "Coincide con uno de varios elementos. Evaluado de izquierda a derecha.",
  MUTATOR_CONTAINER_TOOLTIP: "Número de entradas del bloque.",
  MUTATOR_ITEM_MESSAGE0: "elemento",
  MUTATOR_ITEM_TOOLTIP: "Un espacio de entrada.",
  GROUP_NONCAPTURING_TOOLTIP: "Agrupación sin captura",
  GROUP_TOOLTIP: "Agrupación",
  GROUP_NAMED_TOOLTIP: "Agrupación con nombre",
  BACKREFERENCE_TOOLTIP:
    "Referencia inversa a un grupo. Seleccione número de grupo. Incluye grupos con nombre.",
  BACKREFERENCE_NAMED_TOOLTIP: "Referencia inversa a un grupo con nombre",
  QUESTION_TOOLTIP:
    "Opcional (una vez si es posible, o ninguna). Con ? intenta coincidir menos. Ej: /^a??a/ aplicado a 'aa'.",
  STAR_PLUS_TOOLTIP:
    "Repeticiones: * = 0 o más, + = 1 o más. Con ? intenta coincidir menos.",
  QUANTIT_EXACT_TOOLTIP: "Repetir exactamente N veces {N}",
  QUANTIT_MIN_TOOLTIP:
    "Repetir al menos N veces {N,}. Con ? intenta coincidir menos.",
  QUANTIT_RANGE_TOOLTIP:
    "Repetir entre N y M veces {N,M}. Con ? intenta coincidir menos.",
  NO_SUBSTITUTE_MESSAGE0: "Sin reemplazo",
  NO_SUBSTITUTE_TOOLTIP: "Solo coincidir, no reemplazar.",
  SUBSTITUTE_JOIN_TOOLTIP:
    "Unir bloque usable solo en reemplazo. Fuera de reemplazo puede usar entrada libre, tabulación, salto de línea o escape.",
  DOLLAR_TOOLTIP: "Escapar $ en reemplazo",
  AMPERSAND_TOOLTIP: "Texto coincidente (o posición)",
  MATCH_BEFORE_TOOLTIP: "Texto antes de la coincidencia (o posición)",
  MATCH_AFTER_TOOLTIP: "Texto después de la coincidencia (o posición)",
  MATCH_BACKREFERENCE_TOOLTIP:
    "Referencia un grupo en reemplazo. Incluye grupos con nombre.",
  MATCH_NAMED_BACKREFERENCE_TOOLTIP:
    "Referencia un grupo con nombre en reemplazo",
}
export default { ui, blockly }
