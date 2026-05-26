---
name: tipografia-legal-conciencia
description: Audita la tipografía de ConciencIA aplicando las reglas de Matthew Butterick (Practical Typography y Typography for Lawyers) más los principios de Massimo Vignelli para estética editorial. Evalúa TANTO la tipografía de la interfaz web COMO la de las plantillas Word/PDF generadas (que son documentos jurídicos con firmas físicas). INVOCA SIEMPRE que se mencione revisar tipografía, fuentes, jerarquía visual, legibilidad de los documentos generados, ajustar el sistema tipográfico, mejorar el aire editorial de la app, o cuando se hable de cómo se ve un acta, una citación, una resolución sancionatoria al imprimirse. También invoca al cuestionar la elección de fuentes serif vs sans, tamaños del 7-step type scale, line-height, ancho de línea, espaciado. Producirá una revisión separada para pantalla y para documentos imprimibles, con correcciones concretas.
---

# Auditoría Tipográfica — ConciencIA

## Cuándo usar esta skill

Usa esta skill cuando necesites evaluar la **tipografía** de ConciencIA. Es un proyecto donde la tipografía no es decoración — es **función**:

- Los **documentos generados** (actas, citaciones, resoluciones) tienen valor jurídico. Una mala tipografía debilita la autoridad del documento ante padres de familia, comités y eventualmente jueces.
- La **interfaz** combina aire editorial (vino tinto + dorado + serif) con eficiencia operativa (formularios densos). Equilibrarlo exige técnica.
- Hay **3 temas visuales** con sistemas tipográficos parcialmente distintos que deben mantener identidad.

## Marco teórico aplicado

### Matthew Butterick — *Practical Typography* y *Typography for Lawyers*

Las reglas de Butterick son el estándar de facto para documentos legales en EE.UU. Lo esencial:

**Reglas fundamentales (Practical Typography)**

1. **Tipografía corporal**:
   - Tamaño: 10–12pt en impreso, 14–16px en pantalla
   - Line spacing (interlineado): **120%–145%** del tamaño de fuente
   - Line length (ancho de línea): **45–90 caracteres**, óptimo 66
2. **Fuentes**:
   - Para body: **evitar Times New Roman y Helvetica/Arial** — son los defaults perezosos
   - Para legal/editorial: Equity, Charter, Source Serif, EB Garamond, Libre Caslon
   - Para UI: Inter, IBM Plex Sans, Source Sans, Public Sans
   - Limitar a **1 o 2 familias** por documento (puede ser 1 serif + 1 sans)
3. **Detalles que separan amateurs de pros**:
   - **Comillas tipográficas** ("smart quotes": "" '' « ») — NUNCA rectas (" ')
   - **Em dashes** (—) para incisos, **en dashes** (–) para rangos, hyphens (-) solo para palabras compuestas
   - **Apóstrofes curvos** (’) no rectos (')
   - **Espacios fijos**: 1 espacio después de punto, NUNCA 2
   - **No subrayar** — es residuo de máquina de escribir
   - **Mayúsculas para títulos** — usar small caps o tracking aumentado, no caps sólidas
   - **Negritas con moderación** — máximo 10% del párrafo
   - **Cursivas para énfasis** — no negritas
4. **Espaciado**:
   - **First-line indent O space-between-paragraphs**, nunca los dos
   - **Margins generosos**: 1.5"–2" en impreso, no menos de 4em en pantalla
5. **Tipografía numérica**:
   - **Old-style figures** (1234567890 estilo antiguo) para texto corrido
   - **Lining figures** (1234567890 misma altura) para tablas y formularios

**Typography for Lawyers (adicional para documentos jurídicos)**

1. **Encabezado oficial**: nombre institución en versalitas, lema en cursiva
2. **Numeración**: artículos en negrita o versalitas, no en mayúsculas planas
3. **Citas legales**: itálicas para nombres de leyes ("Ley 1620 de 2013"), versalitas para acrónimos (CPACA, SIE)
4. **Firmas**: línea de firma con nombre debajo en versalitas, cargo en cursiva
5. **Foliado**: número de página + total ("Página 2 de 5")
6. **Block quotes**: indentar 0.5", sin comillas, una pizca más pequeño que el body

### Massimo Vignelli — *The Vignelli Canon*

Los principios para que la tipografía respire identidad editorial:

1. **Disciplina** — pocas fuentes, usadas con rigor
2. **Apropiabilidad** — la tipografía sirve al contenido, no al ego del diseñador
3. **El grid** — todo se alinea a un sistema medible (rejilla tipográfica)
4. **El espacio blanco** — no es "vacío", es estructura
5. **Limitación de paleta** — Vignelli vivió con 5 fuentes toda su carrera (Bodoni, Garamond, Helvetica, Optima, Times)
6. **Jerarquía clara** — máximo 3 niveles visibles a la vez (no 7)
7. **Atemporalidad** — evitar modas (gradientes, sombras, fuentes "del momento")
8. **Responsabilidad ética** — los documentos institucionales hablan en nombre de la institución; mediocridad tipográfica = mediocridad institucional

## Cómo ejecutar la auditoría

### Paso 1 — Inventariar el sistema tipográfico actual

#### En la UI (web)

Buscar en `index.html` (CSS embebido):

- Variables `--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl`, `--fs-2xl` (las 7 escalas)
- Variables `--ff-serif`, `--ff-sans`, `--ff-mono` (familias)
- `font-family:`, `font-size:`, `line-height:`, `letter-spacing:` en `body`, headings, inputs
- `@font-face` (si carga fuentes locales) y `@import` (si carga de Google Fonts)
- Diferencias entre los 3 temas (editorial, moderno claro, moderno oscuro)

Tabular hallazgos:

| Tema | Familia body | Familia headings | Tamaño base | Line-height base | Pares tipográficos |
|------|--------------|-------------------|-------------|------------------|---------------------|
| Editorial | ? | ? | ? | ? | ? |
| Moderno claro | ? | ? | ? | ? | ? |
| Moderno oscuro | ? | ? | ? | ? | ? |

#### En los documentos generados (Word + PDF)

Buscar en `index.html` la función `construirDocumentoDocx(doc, valores)` y `construirHTMLImprimible(doc, valores)`:

- ¿Qué fuente se aplica al documento Word? (docx.js permite definir `font`)
- Tamaño de cuerpo, tamaño de encabezados
- Estilo del encabezado institucional (logo + 4 líneas)
- Estilo del bloque de firmas
- Estilo de los considerandos, fundamentos jurídicos
- Cómo se renderizan las fechas, números de artículo, citas legales
- `@media print` para los PDF: márgenes, page breaks, footers con número de página

### Paso 2 — Evaluar contra reglas Butterick (por bloque)

Para CADA bloque del sistema, verificar:

#### UI · Cuerpo de texto

- [ ] Tamaño base ≥ 14px en pantalla? (Butterick recomienda 16px+)
- [ ] Line-height entre 1.3–1.5? (`--fs-base: 13px` con line-height 1.5 = 19.5px → OK)
- [ ] Line-length entre 45–90 caracteres? (medir en columna central que es la más leída)
- [ ] Color con contraste suficiente? (cruce con a11y-conciencia)
- [ ] Comillas tipográficas en strings hard-coded?
- [ ] Em dashes vs hyphens correctos?

#### UI · Headings

- [ ] Jerarquía clara entre los 7 escalones?
- [ ] Saltos consistentes (no h1 → h4)?
- [ ] Font-weight diferenciando, no solo tamaño?
- [ ] Tracking (letter-spacing) controlado en versalitas?

#### UI · Formularios (124 plantillas)

- [ ] Labels con peso suficiente para distinguirse del valor?
- [ ] Inputs con padding generoso (al menos 8px vertical)?
- [ ] Tipografía monospace o tabular-nums para fechas, IDs, números de documento?
- [ ] Hint text (texto de ayuda) más pequeño y de color reducido?

#### Documentos generados (Word)

- [ ] Fuente body NO es Times New Roman ni Calibri default?
- [ ] Tamaño body 11pt o 12pt?
- [ ] Line spacing 1.15 o 1.3?
- [ ] Márgenes ≥ 1" en los 4 lados?
- [ ] Encabezado institucional con tratamiento tipográfico distintivo (no solo Times bold)?
- [ ] Número de página en pie?
- [ ] Artículos legales en versalitas o cursiva?
- [ ] Bloque de firma con espacio físico para firmar (~2cm) y nombre + cargo debajo?

#### Documentos generados (PDF vía @media print)

- [ ] CSS `@page` define márgenes?
- [ ] `page-break-inside: avoid` en bloques que no deben partirse?
- [ ] Encabezado institucional repetido en cada página?
- [ ] Footer con paginación "Página X de Y"?
- [ ] Tamaño pensado para A4 (no Letter)?

### Paso 3 — Evaluar contra principios Vignelli

Por cada uno de los 3 temas:

- **Disciplina** — ¿Cuántas familias se usan en total? (>2 = riesgo)
- **Apropiabilidad** — ¿La tipografía editorial elegida transmite "documento legal" o "blog"?
- **Limitación de paleta** — ¿Hay >3 tamaños visibles en una misma vista?
- **Atemporalidad** — ¿Se usan efectos modernos pasajeros (gradientes en texto, sombras, fuentes display)?
- **Espacio blanco** — Ratio texto/espacio se siente respirado o claustrofóbico?

## Formato de salida — Estructura obligatoria

```markdown
# Auditoría Tipográfica · ConciencIA · [fecha]

## Resumen ejecutivo

- **Sistema actual**: [N familias, M tamaños, evaluación 1 frase]
- **Estado UI**: [Excelente / Aceptable / Necesita trabajo / Deficiente]
- **Estado documentos generados**: [Excelente / Aceptable / Necesita trabajo / Deficiente]
- **Top 3 correcciones recomendadas**

## Parte 1 · Tipografía de la interfaz (UI)

### 1.1 Sistema actual

[Tabla con familias, tamaños, line-heights, pares por tema]

### 1.2 Hallazgos por regla Butterick

#### ✅ Lo que cumple bien
- ...

#### ⚠️ Lo que cumple parcialmente
- ...

#### ❌ Lo que no cumple
- **TIPO-001 · [Título]**
  - **Regla**: Butterick · [nombre regla]
  - **Ubicación**: `index.html:1234` (selector CSS, variable)
  - **Estado actual**:
    ```css
    --fs-base: 13px;
    ```
  - **Problema**: 13px es subóptimo para body en pantalla. Butterick recomienda 16px+.
  - **Corrección**:
    ```css
    --fs-base: 15px; /* equilibrio entre densidad y legibilidad */
    ```
  - **Impacto esperado**: [+legibilidad, -densidad, etc.]

### 1.3 Hallazgos Vignelli

[Evaluación de disciplina, jerarquía, espacio blanco]

## Parte 2 · Tipografía de los documentos generados (Word/PDF)

### 2.1 Sistema actual

[Inventario de fuentes y estilos en docx.js + @media print]

### 2.2 Hallazgos Butterick — *Typography for Lawyers*

#### Encabezado institucional
- ...

#### Cuerpo del documento (considerandos, fundamentos, hechos)
- ...

#### Numeración y referencias legales
- ...

#### Bloque de firmas
- ...

#### Foliado y paginación
- ...

### 2.3 Comparación con estándares de documentos oficiales colombianos

[Cruce con la NTC 4436 o lineamientos de archivo institucional si aplican]

## Parte 3 · Recomendaciones priorizadas

### Quick wins (1–2 días)
1. ...

### Medium effort (1 semana)
1. ...

### Long-term (next major)
1. ...

## Anexo · Comparativa antes/después

[Si es posible, generar un acta de ejemplo con el sistema actual vs con las correcciones, lado a lado]
```

## Reglas inviolables

1. **Tratar UI y documentos como sistemas separados** — sus restricciones son distintas (pantalla vs papel).
2. **Cita textual de Butterick o Vignelli** — no "según el experto", sino "Butterick · *Practical Typography* · regla 'Line length'".
3. **Sugerir fuentes específicas** — no "una serif elegante" sino "Charter (gratuita), Source Serif (gratuita), Equity (paga)".
4. **Probar visualmente** — si es posible, generar un documento de muestra con la corrección antes de recomendarla.
5. **Respetar la identidad institucional ya elegida** — vino tinto + dorado + aire editorial son decisiones del autor; la auditoría refina, no reemplaza la dirección.

## Recursos

- Butterick, Matthew · *Practical Typography* (online, gratis) · https://practicaltypography.com/
- Butterick, Matthew · *Typography for Lawyers* (libro)
- Vignelli, Massimo · *The Vignelli Canon* (gratis en PDF)
- Bringhurst, Robert · *The Elements of Typographic Style* (libro)
- Spiekermann, Erik · *Stop Stealing Sheep & Find Out How Type Works*
- Fonts gratuitas para documentos legales:
  - Charter (Matthew Carter) — sistema OS y Google Fonts
  - Source Serif (Adobe, gratis) — Google Fonts
  - EB Garamond (gratis) — Google Fonts
  - IBM Plex Serif (gratis)
  - Public Sans (gratis, usada por USWDS)
