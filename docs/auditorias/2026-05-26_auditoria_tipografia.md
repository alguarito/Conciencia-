# Auditoría Tipográfica · ConciencIA · 2026-05-26

> Aplica reglas de **Matthew Butterick** (*Practical Typography* y *Typography for Lawyers*) + principios de **Massimo Vignelli**. Skill: `tipografia-legal-conciencia`.

## Resumen ejecutivo

- **Sistema actual**: 4 familias cargadas (Crimson Pro, DM Sans, Inter, JetBrains Mono), 7 escalones tipográficos de 10–26 px, 3 temas con pares distintos. La identidad editorial (Crimson Pro + DM Sans) está bien escogida; los documentos generados rompen la promesa al caer en Calibri/Cambria.
- **Estado UI**: **Aceptable** — dirección editorial sólida, pero base 1 px más pequeña de lo que recomienda Butterick y sobreuso de mayúsculas + monoespaciada para etiquetas.
- **Estado documentos generados**: **Necesita trabajo** — los `.docx` usan **Calibri** body (el "default perezoso" que Butterick combate), papel US Letter en lugar de A4 (incumple estándar colombiano), márgenes inferiores al mínimo (0.75" lados vs. 1" recomendado), firmas con etiqueta en MAYÚSCULAS sólidas en vez de versalitas.

### Top 3 correcciones recomendadas

1. Cambiar `DOCX_FONT_CUERPO = "Calibri"` por **Charter** (preinstalada en macOS/iOS, fallback Cambria) o **Source Serif Pro** (Google Fonts) → `index.html:2539`.
2. Cambiar `@page { size: letter; }` por `size: A4;` y márgenes a `1in 1in 1.18in 1.18in` (3 cm) → `index.html:3343-3344`.
3. Subir `--fs-base` de 13 px a **15 px** en los 3 temas y ajustar todos los escalones derivados → `index.html:64-65, 183-184`.

---

## Parte 1 · Tipografía de la interfaz (UI)

### 1.1 Sistema actual

| Tema | Familia body | Familia headings | Tamaño base | Line-height base |
|------|--------------|-------------------|-------------|------------------|
| **Editorial** (default) | DM Sans (`--sans`) | Crimson Pro (`--serif`) | 13 px | 1.5 / 1.3 |
| **Moderno claro** | Inter | Inter | 13 px | 1.5 / 1.3 |
| **Moderno oscuro** | Inter | Inter | 13 px | 1.5 / 1.3 |

**Total: 4 familias, 16 pesos.**

### 1.2 Lo que cumple bien

- **TIPO-OK-1** · Em dash (—) en `linea_3` del header institucional.
- **TIPO-OK-2** · Line-height del chat (1.55) dentro del rango Butterick (120-145%).
- **TIPO-OK-3** · Letter-spacing en versalitas falsas (5-12% según Butterick).
- **TIPO-OK-4** · Disciplina cromática del peso (no abusa de `font-weight: 900`).

### 1.3 Hallazgos críticos UI

#### TIPO-001 · Tamaño base subóptimo en pantalla
- **Regla**: Butterick · *Practical Typography* · "Point size": *"On screen, the right point size is 15–25 pixels"*.
- **Ubicación**: `index.html:64` (variable raíz, duplicada en `183`).
- **Estado actual**: `--fs-base: 13px;`
- **Corrección**:
  ```css
  --fs-xs:11px; --fs-sm:12px; --fs-base:15px; --fs-md:16px;
  --fs-lg:18px; --fs-xl:22px; --fs-2xl:28px;
  ```

#### TIPO-002 · Etiquetas de formulario en MAYÚSCULAS sólidas + monoespaciada
- **Regla**: Butterick · *Typography for Lawyers* · *"Small caps look better than all caps"*.
- **Ubicación**: `index.html:808-812`.
- **Estado actual**:
  ```css
  .campo-label{
    font-size:var(--fs-sm); font-weight:600;
    letter-spacing:.5px; text-transform:uppercase;
    font-family:var(--mono);
  }
  ```
- **Problema**: Combinar `uppercase` + JetBrains Mono en label de 11 px convierte cada etiqueta en letrero burocrático.
- **Corrección**:
  ```css
  .campo-label{
    font-size:var(--fs-base); font-weight:600;
    letter-spacing:.02em; text-transform:none;
    font-family:var(--sans);
    font-variant-caps:all-small-caps;
  }
  ```

#### TIPO-003 · Cuatro familias cargadas viola disciplina Vignelli
- **Regla**: Butterick · *"For each project, one or two fonts is usually enough."* + Vignelli · *Canon* · "Discipline".
- **Ubicación**: `index.html:9`.
- **Estado actual**: Crimson Pro + DM Sans + Inter + JetBrains Mono = 4 familias.
- **Corrección**: Sustituir DM Sans por IBM Plex Sans (que viene con IBM Plex Mono del mismo diseñador). Quedan **2 superfamilias** en lugar de 4 fuentes inconexas. **Ahorra ~200 KB de descarga**.

#### TIPO-004 · Letter-spacing excesivo en chips uppercase
- **Regla**: Butterick · *"Letterspacing: 5–12% (50–120 thousandths of an em)"* — `letter-spacing: 2.5px` sobre 10 px = **25%** → cuádruple del techo.
- **Ubicaciones**: `.col-tag` (línea 285), `.clasif-tag` (398), `.modal-section-tag` (864).
- **Corrección**: Cambiar `letter-spacing:2.5px` por `letter-spacing:.08em` (mantiene proporción).

#### TIPO-005 · Comillas rectas en strings HTML hardcoded
- **Regla**: Butterick · *"Straight quotes have no place in your work. Period."*
- **Ubicaciones**: `index.html:2464, 3293, 3510`.
- **Problema**: Cuando estos textos se renderizan en HTML, aparecen como `"Iniciar Nuevo Proceso"` (rectas) en lugar de `"Iniciar Nuevo Proceso"` (curvas).
- **Corrección**: Reemplazar `"..."` por `"..."` y `'...'` por `'...'` en los strings de UI.

#### TIPO-006 · Tamaño y peso de inputs son débiles
- **Regla**: Butterick · *"The size of your body text affects the legibility of your whole document."*
- **Ubicación**: `index.html:814-819`.
- **Corrección**: Subir a `--fs-md` (16px), padding 10×12, añadir `font-variant-numeric: tabular-nums` para fechas y números de cédula alineados.

### 1.4 Hallazgos Vignelli (UI)

- **Disciplina** ⚠️: 4 familias (TIPO-003). Los temas "moderno" tiran a la basura la familia serif sin beneficio claro.
- **Apropiabilidad** ✅: Crimson Pro + vino tinto + dorado transmite institucionalidad jurídica.
- **El grid** ⚠️: Grid de columnas limpio, pero no hay sistema de espaciado declarado (`--space-1`, `--space-2`...).
- **Limitación de paleta** ⚠️: 7 escalones es 2 más que los **5 niveles** prudentes.
- **Atemporalidad** ✅ (editorial) / ⚠️ (moderno-oscuro con `--accent #C42B3A` y `radius: 12px`).
- **Espacio blanco** ⚠️: Columna izquierda apretada — `.pregunta-card { padding: 16px 18px; margin: 12px 0 }` deja < 12 px de aire vertical.

---

## Parte 2 · Tipografía de los documentos generados (Word/PDF)

### 2.1 Sistema actual

| Aspecto | Word (`construirDocumentoDocx`) | PDF / HTML print (`construirHTMLImprimible`) |
|---|---|---|
| **Fuente body** | `DOCX_FONT_CUERPO = "Calibri"` (línea 2539) | `'DM Sans', system-ui, sans-serif` (3337) |
| **Fuente títulos** | `DOCX_FONT_TITULOS = "Cambria"` (2538) | `'Cambria', 'Crimson Pro', Georgia, serif` (3355) |
| **Tamaño body** | 11 pt (`size: 22` DXA) | `font-size: 11pt` |
| **Line spacing** | Default Word (1.15) | `line-height: 1.5` |
| **Papel** | **US Letter** (12240 × 15840 DXA) | **`@page { size: letter; }`** |
| **Márgenes** | 0.75" lados, 1" abajo, 0.75" arriba | `margin: 0.75in 0.75in 1in 0.75in` |
| **Foliado** | "Página X de Y" en footer | **Sin paginación** |
| **Etiquetas campo** | `.toUpperCase()` 9 pt vino bold | `text-transform: uppercase` |
| **Firmas** | Tabla 2×N, etiqueta MAYÚSCULAS + "Nombre, Documento y Cargo" | Flexbox 2 columnas, idéntico |

### 2.2 Hallazgos críticos en documentos

#### TIPO-DOC-001 · Calibri en documento jurídico
- **Regla**: Butterick · *Typography for Lawyers* · *"Calibri… is not a great choice for serious writing. Avoid it."* + *Practical Typography* · *"Times New Roman and Calibri are not good choices because **they are signals of mediocrity**. They tell the reader: I didn't care enough to choose a font."*
- **Ubicación**: `index.html:2539`.
- **Estado actual**:
  ```js
  const DOCX_FONT_CUERPO = "Calibri";
  ```
- **Corrección**:
  ```js
  const DOCX_FONT_CUERPO = "Charter";  // fallback nativo a Cambria en Windows
  ```
  Alternativas:
  - **Gratuitas OFL**: Source Serif Pro, EB Garamond, IBM Plex Serif
  - **Sistema**: Charter (macOS/iOS nativa), Cambria (Windows nativa)
  - **De pago**: Equity (US$120, la del propio Butterick)

#### TIPO-DOC-002 · Lema institucional sin versalitas
- **Regla**: Butterick · *"For headings, small caps are an excellent alternative to all caps."*
- **Ubicaciones**: `index.html:2839` (Word) y `3354-3357` (HTML print).
- **Estado actual**: línea 1 ya viene en MAYÚSCULAS sólidas + lema "MORAL PEDESTAL..." MAYÚSCULAS + italic.
- **Corrección**: editar metadata `data/01_metadata.json` a Title Case + activar `smallCaps: true` en Word + `font-variant-caps: small-caps` en CSS print.
  ```json
  "linea_1": "Institución Educativa Sor María Juliana",
  "linea_2": "Moral, pedestal de la sabiduría",
  ```
  ```js
  // En construirEncabezadoInstitucional
  new TextRun({
    text: 'Institución Educativa Sor María Juliana',
    bold: true, size: 24, smallCaps: true,
    characterSpacing: 25
  })
  ```

#### TIPO-DOC-003 · Sans-serif (DM Sans) para body del PDF impreso
- **Regla**: Butterick · *"For body text, serif fonts are preferred over sans serifs because serifs aid horizontal eye movement on the long lines of text typical of legal documents."*
- **Ubicación**: `index.html:3337-3338`.
- **Corrección**:
  ```css
  body{
    font-family: 'Charter', 'Source Serif Pro', 'Cambria', Georgia, serif;
    font-size: 11pt; line-height: 1.45;
    font-variant-numeric: tabular-nums;
  }
  ```
- **Resultado**: pantalla = sans (DM Sans / Inter), papel = serif (Charter / Cambria) — división recomendada por Butterick.

#### TIPO-DOC-004 · Etiquetas en MAYÚSCULAS + sans en documento legal
- **Regla**: Butterick · *"Within body text, use bold sparingly, and italics for emphasis. Avoid all-caps for emphasis."*
- **Ubicaciones**: `index.html:2982-2989` (Word), `3407-3412` (HTML print).
- **Problema**: Tres niveles compiten al mismo tono (título mayúsculas + encabezado mayúsculas + etiquetas mayúsculas). La jerarquía se aplana.
- **Corrección**:
  ```js
  new TextRun({
    text: etiqueta + obligatorio,  // Title Case, no .toUpperCase()
    bold: true, size: 20, font: DOCX_FONT_TITULOS,
    smallCaps: true, characterSpacing: 10
  })
  ```

#### TIPO-DOC-005 · "Documento generado por ConciencIA v2.0" como pie firmado
- **Regla**: Butterick · *Typography for Lawyers* · "Watermarks and metadata".
- **Ubicación**: `index.html:3213-3221` (Word), `3532-3534` (HTML print).
- **Problema**: Convierte cada acta oficial en anuncio de la herramienta. Un acudiente puede preguntar: ¿por qué la institución usa software de un tercero?
- **Corrección**: mover esta línea al footer ya existente (`piePagina`, líneas 2740-2790), integrándola en una sola línea con la paginación, tamaño 6 pt en gris claro.

#### TIPO-DOC-006 · Fundamentos legales sin cursiva consistente
- **Regla**: Butterick · *"Case names and citation references in italics."*
- **Ubicación**: `index.html:2719-2725, 2920, 2939, 2957`.
- **Recomendación**: implementar parser `formatearTextoConCitas()` que detecte `/Ley \d+ de \d+|Decreto \d+|Art\. \d+/` y los renderice en cursiva.

#### TIPO-DOC-007 · Etiqueta de firma sin estructura canónica
- **Regla**: Butterick · *Typography for Lawyers* · *"Below the signature line, name in small caps, title in italic."*
- **Ubicación**: `index.html:3139-3152` (Word), `3440-3450` (HTML print).
- **Problema**: "Firma del funcionario" + helper "Nombre, Documento y Cargo" es funcional pero no jurídicamente canónico.
- **Corrección**: Cuando se conozcan los datos del firmante (`state.funcionario`, `state.cargo`), pre-rellenar:
  ```js
  // Nombre en versalitas
  new TextRun({ text: nombreFirmante, bold: true, size: 20, smallCaps: true });
  // C.C. (cédula) en redonda
  new TextRun({ text: `C.C. ${documentoFirmante}`, size: 16 });
  // Cargo en cursiva
  new TextRun({ text: cargoFirmante, italics: true, size: 16 });
  ```

#### TIPO-DOC-008 · Espacio físico para firma de 32 pt es escaso
- **Regla**: Butterick · *"Leave at least 0.5 inch (36 pt / 13 mm) of vertical space above the line."*
- **Ubicaciones**: `index.html:3437` (CSS, 32pt) y Word `3132` (18 pt).
- **Corrección**:
  - CSS: `padding-top: 48pt;` (17 mm)
  - Word: `spacing: { before: 540 }` (27 pt)

#### TIPO-DOC-009 · HTML print sin paginación
- **Regla**: Butterick · *"Page numbers are essential for any document longer than one page."*
- **Ubicación**: `index.html:3452-3457` y `@media print` líneas 3490-3496.
- **Corrección**:
  ```css
  @page{
    size: A4;
    margin: 3cm 3cm 3.5cm 3cm;
    @bottom-right{
      content: 'Página ' counter(page) ' de ' counter(pages);
      font-family: 'Charter', 'Cambria', serif;
      font-size: 8pt; color: #71665E;
    }
    @bottom-left{
      content: 'I.E. Sor María Juliana · Moral, pedestal de la sabiduría';
      font-size: 7.5pt; font-style: italic; color: #71665E;
    }
  }
  ```

#### TIPO-DOC-010 · Papel US Letter en lugar de A4
- **Regla**: ICONTEC NTC 1486 (norma colombiana) + Butterick · *"A4 (210×297 mm) is everywhere else."*
- **Ubicaciones**: `index.html:2811` (Word) y `3343` (HTML print).
- **Corrección Word**:
  ```js
  page: {
    size: { width: 11906, height: 16838 },  // A4 en DXA (210×297 mm)
    margin: { top: 1701, right: 1701, bottom: 1985, left: 1701 } // 3 cm/3.5 cm
  }
  ```
- **Corrección HTML print**:
  ```css
  @page{ size: A4; margin: 3cm 3cm 3.5cm 3cm; }
  ```

#### TIPO-DOC-011 · Márgenes inferiores al mínimo Butterick
- **Regla**: Butterick · *"Margins of 1–1.5 inches look most professional. Less than 1" looks crowded."*
- **Estado actual**: 0.75" en 3 bordes (por debajo del mínimo).
- **Corrección**: ya cubierta en TIPO-DOC-010 con 3cm = 1.18" en los 4 lados.

#### TIPO-DOC-012 · Footer del Word duplica información
- **Regla**: Vignelli · *Canon* · "Discipline" — un footer debe llevar una sola cosa por bloque.
- **Ubicación**: `index.html:2740-2790`.
- **Corrección**: separar en 2 líneas claras (institución+lema centrada / paginación a la derecha).

### 2.3 Comparación con estándares colombianos

- **ICONTEC NTC 1486** (presentación de trabajos escritos) y **GTC 185** (documentación organizacional): márgenes 3 cm, papel A4, fuente 12 pt. **ConciencIA cumple en parte: tamaño 11 pt (válido), Letter en lugar de A4 (incumple), márgenes 0.75" = 1.9 cm (incumple por 1 cm largo).**
- **Decreto 1080 de 2015** (lineamientos archivísticos): exige número de página y fecha visible en cada folio. **Cumple en Word; NO cumple en PDF.**
- **Manual de Convivencia I.E. Sor María Juliana** (Art. 43): exige actas firmadas con identificación (CC + cargo). La estructura actual permite firmar pero no canoniza nombre+CC+cargo.

---

## Parte 3 · Recomendaciones priorizadas

### Quick wins (1–2 días)

1. **Cambiar fuente body del Word de Calibri a Charter** — `index.html:2539`. Una línea. Resuelve TIPO-DOC-001.
2. **Cambiar `@page size` de letter a A4 + dimensiones del Word** — `2811, 3343-3344`. Resuelve TIPO-DOC-010 y TIPO-DOC-011 simultáneamente. ~5 líneas.
3. **Reemplazar comillas rectas por curvas** en 4-6 strings — `2464, 3293, 3510`. Resuelve TIPO-005.
4. **Quitar `.toUpperCase()` y `font-family: var(--mono)` de `.campo-label`** — `808-812` y `2983`. Resuelve TIPO-002 y TIPO-DOC-004.
5. **Añadir paginación al `@media print`** — `3343-3345`. Resuelve TIPO-DOC-009.
6. **Aumentar padding-top de firmas** de 32pt a 48pt. Resuelve TIPO-DOC-008.

### Medium effort (1 semana)

1. **Subir base tipográfica de 13 px a 15 px** — `64-65, 183-184`. Requiere QA visual de los 3 temas y los 124 formularios.
2. **Reemplazar etiqueta + helper "Nombre, Documento y Cargo"** por estructura canónica de 3 niveles. Pre-rellenado desde `state.funcionario` y `state.cargo`.
3. **Mover "Documento generado por ConciencIA v2.0" al footer**. Resuelve TIPO-DOC-005.
4. **Eliminar mayúsculas del lema + activar small caps Word**. Editar metadata + `smallCaps: true`. Resuelve TIPO-DOC-002.
5. **Reducir letter-spacing a `em`** en `.col-tag`, `.clasif-tag`, etc. Resuelve TIPO-004.
6. **Unificar familias a 2 superfamilias máximo** (IBM Plex Sans/Mono + Crimson Pro). Resuelve TIPO-003.

### Long-term (next major)

1. **Migrar `construirHTMLImprimible` a la misma fuente serif que el Word** (Charter / Source Serif).
2. **Embebido WOFF2 local** del subset latín para no depender de fonts.googleapis.com (mejora offline-first).
3. **Sistema de espaciado declarado** — variables `--space-1` a `--space-6`.
4. **Detección y formato automático de citas legales** (cursiva en `/Ley \d+|Decreto|Art\./`).
5. **Reducir a 5 escalones tipográficos** (fusionar `--fs-md` con `--fs-lg`).
6. **Considerar Equity** (Butterick, US$120) si la app llega a usarse oficialmente en más de una institución.

---

## Anexo · Comparativa visual antes/después

### Encabezado de un acta — Antes
```
INSTITUCIÓN EDUCATIVA SOR MARÍA JULIANA       [Calibri, mayúsculas sólidas]
MORAL PEDESTAL DE LA SABIDURÍA (italic)       [Calibri, mayúsculas + cursiva]

ACTA DE VERSIÓN LIBRE                          [Calibri 14pt bold]
FECHA DEL HECHO *                              [Calibri 9pt bold MAYÚSCULAS]
```

### Encabezado de un acta — Después
```
Iɴsᴛɪᴛᴜᴄɪóɴ Eᴅᴜᴄᴀᴛɪᴠᴀ Sᴏʀ Mᴀʀíᴀ Jᴜʟɪᴀɴᴀ      [Charter, versalitas reales]
Moral, pedestal de la sabiduría                [Charter italic, redondo, dorado]

A C T A   D E   V E R S I Ó N   L I B R E      [Charter 14pt versalitas + tracking]
Fᴇᴄʜᴀ ᴅᴇʟ ʜᴇᴄʜᴏ *                              [Charter 10pt small caps]
```

La diferencia es visualmente sutil pero acumulativamente decisiva: un documento que un juez podría aceptar como producto institucional serio en lugar de "plantilla de Word".

---

## Localizaciones críticas (índice rápido)

- Variables tipográficas: `index.html:52-65, 111-113, 161-162, 178-184`
- Carga Google Fonts: `index.html:9`
- **`DOCX_FONT_CUERPO = "Calibri"`**: `index.html:2539`
- `construirDocumentoDocx`: `index.html:2686-2821`
- `construirEncabezadoInstitucional`: `index.html:2823-2891`
- `construirSeccionFirmas`: `index.html:3061-3224`
- `construirHTMLImprimible`: `index.html:3304-3539`
- **`@page` PDF**: `index.html:3342-3345`
- **Body PDF DM Sans**: `index.html:3337`
