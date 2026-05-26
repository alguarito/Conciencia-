# Auditoría de Accesibilidad · ConciencIA · WCAG 2.2 AA · 2026-05-26

> Aplica WCAG 2.2 nivel AA (criterios nuevos de 2.2 incluidos). Skill: `a11y-conciencia`.
> Cumplimiento exigido por **Ley 1618 de 2013** + **Decreto 1421 de 2017 (PIAR)** en Colombia.

## Resumen ejecutivo

- **Nivel de cumplimiento global**: **No cumple** (con cumplimientos parciales)
- **Criterios evaluados**: 23 / 23 aplicables al producto actual
- **Issues encontrados**: **Críticos: 7, Altos: 6, Medios: 5, Bajos: 3**
- **Tasa de cumplimiento**: 1 ✅ + 8 ⚠️ + 13 ❌ + 1 ⏸️ sobre 22 aplicables → **~5% cumple, ~36% parcial, ~59% no cumple**

**El mayor obstáculo de accesibilidad hoy** es la combinación de:
- (a) Modales que no se cierran con `Escape` ni atrapan el foco
- (b) Decenas de elementos clickeables que NO son `<button>`/`<a>` — invisibles a lector de pantalla
- (c) El **banner Tipo III** (que clasifica una conducta como presunto delito) se inserta en el DOM sin `role="alert"` ni `aria-live`, así que un docente ciego puede confirmar opciones del árbol sin enterarse de que el sistema acaba de marcar la situación como gravísima.

---

## Matriz de cumplimiento WCAG 2.2 AA

| Criterio | Nivel | Cumple | Evidencia / Issue |
|----------|-------|--------|-------------------|
| 1.1.1 Contenido no textual | A | ❌ | Íconos SVG sin `<title>`, emojis funcionales (📄 📑 📂 ⚠ ✓ ✎ 📖) sin `aria-label` ni `aria-hidden`. SVGs internos no tienen `aria-hidden="true"`. |
| 1.3.1 Info y relaciones | A | ⚠️ | `<header>` existe, `<section>` tienen `id` pero no `aria-labelledby`. Falta `<main>`. Labels del editor (líneas 2322, 2325, 2335) NO tienen `for=`. |
| 1.4.3 Contraste mínimo (4.5:1) | AA | ❌ | **Múltiples fallos numéricos.** Ver A11Y-001. Ej: dorado `#B89968` sobre hueso `#FAF7F2` = **2.40:1**; `--accent` `#C42B3A` sobre `#09090B` = **3.53:1**. |
| 1.4.10 Reflujo | AA | ⚠️ | `html, body{height:100vh; overflow:hidden}`. En texto ampliado, el contenido se trunca. |
| 1.4.11 Contraste no-texto (3:1) | AA | ❌ | Bordes `--gris-papel` `#D6CFC2` contra `#FAF7F2` = **1.34:1** (editorial); `#E4E4E7` contra `#FFFFFF` = **1.15:1** (moderno). |
| 1.4.12 Espaciado de texto | AA | ✅ | El CSS no fija `line-height`/`letter-spacing` con `!important`. |
| 1.4.13 Contenido en hover/focus | AA | ⚠️ | Los `title=` se muestran como tooltip nativo — no dismissibles con teclado. |
| 2.1.1 Teclado | A | ❌ | `<div onclick>` (línea 2087), `<span class="paso-doc-chip" onclick>` (2097), `<div class="doc-item" onclick>` (2185), `<div class="docs-tab" onclick>` (1543-1545), `<a onclick>` sin href (2584) — NO son focusables con Tab. |
| 2.1.2 Sin trampa de teclado | A | ⚠️ | Tab desde el último input del modal se sale hacia los elementos detrás. |
| 2.4.3 Orden de foco | A | ⚠️ | Al cerrar el modal el foco se pierde al `<body>`. |
| 2.4.6 Encabezados y etiquetas | AA | ⚠️ | Tres `<h1>` (líneas 1469, 1498, 1538). NO hay `<h2>`/`<h3>`. Modales usan `<div class="modal-titulo">`. |
| 2.4.7 Foco visible | AA | ❌ | `outline:none` global en `.chat-input` (647), inputs (821). NO hay `:focus-visible` en NINGÚN selector. |
| 2.4.11 Foco no oculto (mínimo) — **nuevo 2.2** | AA | ⚠️ | El sticky `header.topbar` (z-index:50) tiene 64px de alto. Riesgo de ocultar foco. |
| 2.5.8 Tamaño objetivo (24×24px) — **nuevo 2.2** | AA | ❌ | `.paso-doc-chip` ≈ 16×22px; `.paso-checkbox input` 14×14px; checkbox dinámico 16×16px. |
| 3.1.1 Idioma de la página | A | ⚠️ | `<html lang="es">`. Debería ser `es-CO`. |
| 3.2.6 Ayuda consistente — **nuevo 2.2** | A | ✅ | Chat asistente siempre en columna 2; botones Config/Info siempre arriba a la derecha. |
| 3.3.1 Identificación de errores | A | ⚠️ | Banner sí nombra qué falta, pero modal de iniciar caso solo marca con borde rojo sin `aria-describedby` ni `aria-invalid`. |
| 3.3.2 Etiquetas o instrucciones | A | ❌ | `<label>` sin `for=` en modal y en TODO el editor. Inputs solo tienen `data-campo`, no `id`. |
| 3.3.3 Sugerencia ante error | AA | ❌ | Mensajes genéricos. No se sugiere formato. Email sin validación HTML5 ni `pattern=`. |
| 3.3.7 Entrada redundante — **nuevo 2.2** | A | ✅ | `aplicarAutoRelleno` cumple este criterio. |
| 3.3.8 Autenticación accesible — **nuevo 2.2** | AA | ⏸️ | No aplica — sin autenticación. |
| 4.1.2 Nombre, rol, valor | A | ❌ | Tabs sin `role="tab"`, `aria-selected`. `theme-switcher` con `role="radiogroup"` pero hijos sin `role="radio"`. Modal sin `role="dialog"` ni `aria-modal`. |
| 4.1.3 Mensajes de estado | AA | ❌ | **Banner Tipo III SIN `role="alert"` ni `aria-live`.** Chat sin `aria-live`. Banner de validación tampoco. |

Leyenda: ✅ Cumple · ⚠️ Cumple parcialmente · ❌ No cumple · ⏸️ No aplica

---

## Cálculos de contraste (los 3 temas)

| Combinación | Tema | Ratio | Mínimo | Estado |
|---|---|---|---|---|
| dorado `#B89968` ↔ hueso `#FAF7F2` | editorial | **2.40:1** | 4.5:1 | ❌ |
| dorado `#B89968` ↔ hueso-osc `#F0EBE3` | editorial | **2.28:1** | 4.5:1 | ❌ |
| `--accent` `#C42B3A` ↔ `--bg-app` `#09090B` | moderno-oscuro | **3.53:1** | 4.5:1 | ❌ |
| `--accent` `#C42B3A` ↔ `--bg-surface` `#18181B` | moderno-oscuro | **3.20:1** | 4.5:1 | ❌ |
| `--text-subtle` `#71717A` ↔ `#09090B` | moderno-oscuro | **4.09:1** | 4.5:1 | ❌ |
| `--text-subtle` `#71717A` ↔ `#18181B` | moderno-oscuro | **3.81:1** | 4.5:1 | ❌ |
| `--text-subtle` `#A1A1AA` ↔ `#FFFFFF` | moderno claro | **2.85:1** | 4.5:1 | ❌ |
| `--text` `#1A1614` ↔ `#FAF7F2` | editorial | 16.69:1 | 4.5:1 | ✅ |
| `--text` `#FAFAFA` ↔ `#09090B` | moderno-oscuro | 19.06:1 | 4.5:1 | ✅ |

---

## Issues críticos (resumen — ver reporte completo en el archivo)

### A11Y-001 · Contraste insuficiente (dorado + accent oscuro)
- **Criterio**: 1.4.3 AA
- **Fix**: Variables CSS — dorado oscurecido a `#8B6F3F` (4.62:1); accent claro a `#E55C6A` (6.62:1).

### A11Y-002 · Banner Tipo III no se anuncia a lectores de pantalla
- **Criterio**: 4.1.3 AA
- **Ubicación**: `index.html:1996-2010`
- **Fix**: `<div role="alert" aria-live="assertive" aria-atomic="true">`

### A11Y-003 · Modales sin `role="dialog"`, sin Escape, sin trampa de foco
- **Criterios**: 2.1.1, 2.1.2, 4.1.2
- **Fix**: `role="dialog" aria-modal="true" aria-labelledby` + listener global Escape + `inert` sobre el resto del DOM + foco al primer focusable + restaurar foco al cerrar.

### A11Y-004 · Decenas de elementos clickeables NO son `<button>`
- **Criterios**: 2.1.1, 4.1.2
- **Ubicación**: 1543-1545, 2085-2087, 2097, 2185, 2584
- **Fix**: Convertir todos a `<button type="button">` con ARIA correcto. Tabs con `role="tab"`, `aria-selected`, `aria-controls`.

### A11Y-005 · Labels desasociados del input
- **Criterio**: 3.3.2 A
- **Ubicación**: `renderCampo` línea 2321-2336 + modal 1585-1644
- **Fix**: Generar `id` para cada input, `for=` en label, `aria-required`, `aria-describedby`.

### A11Y-006 · Tamaño objetivo < 24×24px (nuevo WCAG 2.2)
- **Criterio**: 2.5.8 AA
- **Fix**: Aumentar padding y dimensiones de chips, checkboxes, banner errors.

### A11Y-007 · Foco visible inexistente
- **Criterio**: 2.4.7 AA + 1.4.11
- **Fix**: Bloque global `:focus-visible` con outline 3px del color de acento, outline-offset 2px; en moderno-oscuro usar dorado claro `#F5C77E`.

---

## Issues altos (resumen)

- **A11Y-008** · `theme-switcher` `role="radiogroup"` pero hijos sin `role="radio"`
- **A11Y-009** · Chat sin `aria-live` (respuestas asistente no anunciadas)
- **A11Y-010** · Banner de validación de documento no se anuncia
- **A11Y-011** · `confirm()` nativo en lugar de modal accesible (línea 1760)
- **A11Y-012** · `lang="es"` debería ser `lang="es-CO"`
- **A11Y-013** · Headings rotos: 3 `<h1>` y ningún `<h2>`/`<h3>` semántico

---

## Issues medios

- **A11Y-014** · Emojis funcionales sin `aria-hidden`
- **A11Y-015** · SVG decorativos sin `aria-hidden`
- **A11Y-016** · Bordes con contraste no-texto < 3:1
- **A11Y-017** · `<a onclick>` sin href rompe semántica
- **A11Y-018** · `placeholder` como única instrucción

---

## Issues bajos

- **A11Y-019** · `tabindex` ausente en `#validacion-banner`
- **A11Y-020** · `chat-input` sin label asociado
- **A11Y-021** · `caso-progreso` sin `role="progressbar"`

---

## Plan priorizado

### Esta semana (críticos, ~6-10 horas)
1. **A11Y-001** Contrastes (1h) — editar variables CSS
2. **A11Y-002** Banner Tipo III con `role="alert"` (15 min) — una línea, impacto enorme
3. **A11Y-003** Modal accesible (3h) — trampa de foco, Escape, `role`, `aria-modal`, `inert`
4. **A11Y-004** Clickables a `<button>` (3h)
5. **A11Y-005** Labels asociados (1.5h)
6. **A11Y-007** Foco visible global (30 min)

### Este mes (altos, ~5-7 horas)
7-13. Tamaño objetivo, `aria-checked`, `aria-live` chat, banner validación, modal confirm, `lang="es-CO"`, jerarquía headings.

### Próximo release (medios)
14-18. Emojis, SVGs, bordes, link→button, placeholders.

### Backlog (bajos + automatización)
- Integrar `.github/workflows/a11y.yml` con `pa11y-ci` o `axe-core/cli`.
- Implementar `prefers-reduced-motion`.
- Documentar atajos de teclado.

---

## Comandos para verificación automatizada

```bash
npx @axe-core/cli https://alguarito.github.io/Conciencia-/ --tags wcag2a,wcag2aa,wcag22aa
npx pa11y https://alguarito.github.io/Conciencia-/ --standard WCAG2AA
npx lighthouse https://alguarito.github.io/Conciencia-/ --only-categories=accessibility
```

**Predicción**: axe-core encontrará ≥ 30 violaciones distintas (button-name, color-contrast, label, aria-required-children, scrollable-region-focusable).

---

## Cumplimiento normativo

Una vez completados los críticos y altos, ConciencIA estaría en condiciones de declarar **conformidad WCAG 2.2 nivel AA parcial** (la conformidad plena requiere auditoría externa con herramientas + lectores reales). Esto satisface el espíritu de la **Ley 1618 de 2013** y permite que estudiantes con PIAR cuyo acudiente tiene discapacidad puedan firmar y recibir documentos digitales sin barrera técnica.
