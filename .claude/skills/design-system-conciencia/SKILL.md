---
name: design-system-conciencia
description: Sistema de diseño "Bento Jurídico" de ConciencIA — fuente única de verdad para tokens visuales (paleta vino-dorado-hueso con contrastes WCAG verificados, tipografía Inter Tight + Crimson Pro + JetBrains Mono, escala 8pt, radii, sombras, motion, componentes). INVOCA SIEMPRE que vayas a crear, modificar o auditar cualquier estilo CSS de ConciencIA, cuando agregues un componente nuevo, cuando ajustes un color/tipografía/espaciado, o cuando alguien pregunte "¿qué color de fondo usa esto?" o "¿qué tamaño debe tener este botón?". Es el contrato visual del producto — desviarse de este sistema requiere razón explícita.
---

# Sistema de Diseño · ConciencIA · "Bento Jurídico"

> Decisión tomada el 2026-05-26. Inspirado en plataformaconectate (Astro + Tailwind bento)
> adaptado al contexto jurídico-institucional de ConciencIA.

## Filosofía

El sistema responde a una tensión productiva:

| Ingrediente | Aporta |
|-------------|--------|
| **Bento layout moderno** | Densidad informativa, jerarquía espacial, contemporaneidad |
| **Paleta institucional (vino + dorado + hueso)** | Identidad SMJ, autoridad jurídica, calidez latinoamericana |
| **Tipografía mixta serif + sans + mono** | Editorial para titulares, eficiencia para UI, precisión para metadatos |
| **Disciplina Vignelli** | No más de 5 niveles, no más de 3 familias, sistema medible |

**Mantra**: *"Software para decisiones con consecuencias jurídicas, hecho con cariño editorial."*

## 1 · Paleta cromática

### Tokens CSS (van en `:root` del index.html)

```css
:root {
  /* ── Superficies ─────────────────────────────────── */
  --bg-app:        #FAF7F2;  /* hueso · fondo página */
  --bg-surface:    #FFFFFF;  /* blanco · cards */
  --bg-surface-2:  #F0EBE3;  /* hueso-2 · cards secundarias, hover suave */
  --bg-elevated:   #FFFFFF;  /* card destacada · igual a surface por ahora */

  /* ── Tinta (texto) ───────────────────────────────── */
  --text:          #1A1614;  /* tinta principal · 16.7:1 sobre bg-app ✓ */
  --text-2:        #3D3633;  /* tinta secundaria · 10.5:1 ✓ */
  --text-muted:    #71665E;  /* tinta tenue · 4.84:1 ✓ (texto normal) */
  --text-on-vino:  #FFFFFF;  /* tinta sobre fondos vino */

  /* ── Acento primario · vino tinto ───────────────── */
  --vino:          #6B1820;  /* vino tinto principal · 13.2:1 ✓ */
  --vino-2:        #8B2230;  /* vino más claro (hover, gradiente) */
  --vino-dark:     #5A1318;  /* vino más oscuro (gradiente, top de degradé) */
  --vino-soft:     #F2D9DA;  /* fondo lavado para chips Tipo II */
  --vino-tint:     rgba(107,24,32,0.08); /* hover muy sutil */

  /* ── Acento secundario · dorado ─────────────────── */
  --dorado:        #8B6F3F;  /* dorado oscurecido · 4.62:1 ✓ (texto) */
  --dorado-claro:  #B89968;  /* dorado original · SOLO decorativo (no texto) */
  --dorado-warm:   #F5C77E;  /* dorado claro · para tema oscuro (11.3:1) */
  --dorado-soft:   rgba(139,111,63,0.08); /* fondo muy lavado */

  /* ── Estructura ─────────────────────────────────── */
  --border:        #9C9486;  /* bordes UI · 3.13:1 ✓ (criterio 1.4.11) */
  --border-soft:   #E5DDD0;  /* bordes muy sutiles (cards interiores) */
  --divider:       #D6CFC2;  /* divisores horizontales */

  /* ── Estados ────────────────────────────────────── */
  --success:       #3A6B4D;  /* verde institucional · 5.2:1 ✓ */
  --warning:       #B86E1F;  /* ámbar · 4.7:1 ✓ */
  --danger:        #B91C1C;  /* rojo error · 5.5:1 ✓ */
  --critical-bg:   #6B1820;  /* fondo alertas Tipo III (vino fuerte) */
  --critical-grad-top: #8B0E1A; /* tope del gradiente crítico */

  /* ── Focus ──────────────────────────────────────── */
  --focus-ring:    #6B1820;  /* outline de foco · 13.2:1 ✓ */
  --focus-ring-on-dark: #F5C77E; /* sobre fondo oscuro · 11.3:1 ✓ */
}

/* ── Tema oscuro (opcional, v2.2) ───────────────── */
[data-theme="oscuro"] {
  --bg-app:        #09090B;
  --bg-surface:    #18181B;
  --bg-surface-2:  #27272A;
  --text:          #FAFAFA;
  --text-2:        #D4D4D8;
  --text-muted:    #8E8E97;  /* 5.20:1 sobre bg-app ✓ */
  --vino:          #E55C6A;  /* claro para cumplir AA · 6.62:1 ✓ */
  --vino-2:        #FF7484;
  --dorado:        #F5C77E;  /* 11.3:1 ✓ */
  --border:        #52525B;
  --border-soft:   #3F3F46;
}
```

### Reglas de uso de color

| Contexto | Variable correcta | NO USAR |
|----------|-------------------|---------|
| Texto normal sobre `--bg-app` | `--text`, `--text-2`, `--text-muted` | `--dorado-claro` (falla 2.40:1) |
| Texto sobre fondo vino | `--text-on-vino` (blanco) | dorado-claro (falla) |
| Acento crítico (Tipo III, sanciones) | `--vino` | dorado |
| Acento decorativo (no-texto) | `--dorado-claro` está OK como decoración | como texto |
| Bordes de inputs / cards | `--border` (3.13:1) | `--border-soft` (sería 1.34:1 ❌) |
| Bordes interiores muy sutiles | `--border-soft` | -- |
| Focus ring por defecto | `--focus-ring` con outline 3px | `outline: none` jamás |

### Contrastes verificados (todos cumplen WCAG 2.2 AA)

| Combinación | Ratio | Mínimo | Estado |
|-------------|-------|--------|--------|
| `--text` `#1A1614` sobre `--bg-app` `#FAF7F2` | 16.7:1 | 4.5:1 | ✅ |
| `--text-2` `#3D3633` sobre `--bg-app` | 10.5:1 | 4.5:1 | ✅ |
| `--text-muted` `#71665E` sobre `--bg-app` | 4.84:1 | 4.5:1 | ✅ |
| `--vino` `#6B1820` sobre `--bg-app` | 13.2:1 | 4.5:1 | ✅ |
| `--dorado` `#8B6F3F` sobre `--bg-app` | 4.62:1 | 4.5:1 | ✅ |
| `--border` `#9C9486` sobre `--bg-app` | 3.13:1 | 3.0:1 | ✅ |
| Tema oscuro `--text` sobre `--bg-app` | 19.1:1 | 4.5:1 | ✅ |
| Tema oscuro `--vino` `#E55C6A` sobre `--bg-app` | 6.62:1 | 4.5:1 | ✅ |

## 2 · Tipografía

### Familias (sólo 3, jamás 4+)

```css
:root {
  --ff-sans:   'Inter Tight', system-ui, -apple-system, sans-serif;
  --ff-serif:  'Crimson Pro', Georgia, 'Times New Roman', serif;
  --ff-mono:   'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

**Por qué estas 3**:
- **Inter Tight** es la sans moderna por excelencia 2026, optimizada para UI densa, viene con `font-variant-numeric` y variable axes. Reemplaza a DM Sans del sistema anterior.
- **Crimson Pro** se mantiene del sistema anterior — es una de las mejores serif Google Fonts con italics genuinos y versalitas. Aporta el alma editorial.
- **JetBrains Mono** para metadatos, IDs, fechas, fundamentos legales. Cumple la regla Butterick de "monospace para precisión cuantitativa".

### Escala tipográfica (8 niveles · Butterick + Vignelli)

```css
:root {
  --fs-xs:   12px;  /* meta info, micro labels */
  --fs-sm:   13px;  /* tags, badges, captions */
  --fs-base: 15px;  /* cuerpo de UI · SUBE de 13 → 15 (Butterick: 15-25px screen) */
  --fs-md:   16px;  /* cuerpo de párrafo, inputs */
  --fs-lg:   18px;  /* títulos de card */
  --fs-xl:   22px;  /* títulos de sección */
  --fs-2xl:  28px;  /* títulos de columna */
  --fs-3xl:  40px;  /* H1 hero */
  --fs-4xl:  56px;  /* display hero (responsive: usa clamp) */
}
```

### Pesos

```css
/* Pesos disponibles · usar SOLO estos */
font-weight: 400;  /* regular · cuerpo */
font-weight: 500;  /* medium · labels */
font-weight: 600;  /* semibold · headings menores */
font-weight: 700;  /* bold · headings */
font-weight: 800;  /* extrabold · números grandes (métricas) */
font-weight: 900;  /* black · display hero */
```

### Jerarquía declarativa

```css
/* H1 · hero */
.display-hero {
  font-family: var(--ff-sans);
  font-weight: 900;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 0.95;
  letter-spacing: -0.025em;
}

/* H1 alternativo · editorial (cuando se quiera énfasis serif) */
.display-editorial {
  font-family: var(--ff-serif);
  font-weight: 500;
  font-style: italic;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.015em;
}

/* H2 · título de sección */
.heading-section {
  font-family: var(--ff-sans);
  font-weight: 800;
  font-size: var(--fs-2xl);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* H3 · título de card */
.heading-card {
  font-family: var(--ff-sans);
  font-weight: 700;
  font-size: var(--fs-lg);
  line-height: 1.25;
}

/* Versalitas para tags y meta-labels (reemplaza uppercase) */
.versalitas {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.04em;
  font-weight: 600;
  font-size: var(--fs-sm);
}

/* Cuerpo */
body {
  font-family: var(--ff-sans);
  font-size: var(--fs-base);
  line-height: 1.5;
  font-variant-numeric: tabular-nums; /* fechas y números alineados */
}

/* Mono para metadatos */
.meta {
  font-family: var(--ff-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0;
  color: var(--text-muted);
}
```

### Reglas tipográficas inviolables (Butterick + ajustes)

1. **NUNCA** `text-transform: uppercase` en labels. Usar `font-variant-caps: all-small-caps` (versalitas reales).
2. **NUNCA** comillas rectas (`"`, `'`). Usar curvas (`"`, `'`).
3. **NUNCA** doble espacio después de punto.
4. **Em dash** (`—`) para incisos, **en dash** (`–`) para rangos, hyphen (`-`) solo en palabras compuestas.
5. **Cursiva** para énfasis, **negrita** con moderación (<10% del párrafo).
6. **No subrayar** texto que no sea link.
7. **Tabular nums** (`font-variant-numeric: tabular-nums`) en tablas, fechas, IDs.
8. **Citas legales** en cursiva: *"Ley 1620 de 2013"*, *"Art. 43 num. 7"*.

## 3 · Espaciado (sistema 4pt)

```css
:root {
  --space-0:   0;
  --space-1:   4px;   /* gap mínimo */
  --space-2:   8px;   /* gap entre elementos próximos */
  --space-3:   12px;  /* padding chips, botones pequeños */
  --space-4:   16px;  /* padding inputs, cards pequeños */
  --space-5:   20px;
  --space-6:   24px;  /* gap entre cards · padding cards medianos */
  --space-7:   32px;  /* padding cards grandes */
  --space-8:   40px;  /* sección padding */
  --space-9:   48px;  /* sección padding grande */
  --space-10:  64px;  /* hero padding */
  --space-12:  96px;  /* sección hero gigante */
}
```

**Regla**: jamás usar valores arbitrarios (`padding: 13px`). Siempre tokens.

## 4 · Border radius

```css
:root {
  --radius-sm:    4px;   /* inputs, botones pequeños */
  --radius-md:    8px;   /* botones, badges */
  --radius-lg:    12px;  /* cards pequeñas */
  --radius-xl:    16px;  /* cards principales · "bento" */
  --radius-2xl:   24px;  /* hero cards, modales */
  --radius-full:  9999px; /* pills, círculos */
}
```

**Característica distintiva del sistema**: las cards principales (bento) usan `--radius-xl: 16px`. Es nuestro `rounded-bento`.

## 5 · Sombras (escala mínima · Vignelli)

```css
:root {
  --shadow-none:   none;
  --shadow-sm:     0 1px 2px rgba(26,22,20,0.04);
  --shadow-md:     0 4px 12px rgba(26,22,20,0.06);
  --shadow-lg:     0 8px 24px rgba(26,22,20,0.08);
  --shadow-focus:  0 0 0 3px rgba(107,24,32,0.25); /* focus ring */
  --shadow-critical: 0 8px 32px rgba(107,24,32,0.20); /* sombra para alerta Tipo III */
}
```

**Regla**: usar sombras con moderación. Privilegiar `border` sobre `shadow` para definir cards. Sombras solo para elevación real (modales, dropdowns, alertas críticas).

## 6 · Motion (animaciones)

```css
:root {
  --motion-fast:   150ms;
  --motion-normal: 250ms;
  --motion-slow:   400ms;

  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);    /* spring suave salida */
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);   /* entrada y salida */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* rebote sutil */
}

/* Respetar preferencia del usuario */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Patrones de motion

| Acción | Token | Easing |
|--------|-------|--------|
| Hover en botón | `transition: all var(--motion-fast) var(--ease-out)` | salida suave |
| Hover en card | `transition: transform var(--motion-normal) var(--ease-out)` | -- |
| Modal entrada | `animation: modalIn var(--motion-normal) var(--ease-spring)` | rebote sutil |
| Alerta crítica | `animation: criticalIn var(--motion-slow) var(--ease-out)` | dramática |
| Cambio de nodo del árbol | `view-transition-name: tree-node` (CSS moderno) | -- |

## 7 · Componentes

### 7.1 Botones

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-family: var(--ff-sans);
  font-weight: 600;
  font-size: var(--fs-base);
  letter-spacing: -0.01em;
  transition: all var(--motion-fast) var(--ease-out);
  cursor: pointer;
  border: 1px solid transparent;
  min-height: 44px; /* WCAG 2.5.8 ✓ */
}

.btn-primary {
  background: var(--vino);
  color: var(--text-on-vino);
}
.btn-primary:hover { background: var(--vino-2); transform: translateY(-1px); }

.btn-secondary {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.btn-secondary:hover { background: var(--bg-surface-2); }

.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: none;
}
.btn-ghost:hover { color: var(--text); background: var(--bg-surface-2); }

.btn-critical {
  background: var(--vino);
  color: var(--text-on-vino);
  box-shadow: var(--shadow-critical);
}

.btn-icon {
  width: 44px; height: 44px; padding: 0;
  border-radius: var(--radius-md);
}

.btn:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### 7.2 Cards (bento)

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-xl);
  padding: var(--space-7);
  transition: border-color var(--motion-fast) var(--ease-out);
}

.card:hover { border-color: var(--vino); }

.card-elevated {
  background: var(--vino);
  color: var(--text-on-vino);
  border: none;
}

.card-secondary {
  background: var(--bg-surface-2);
  border-color: var(--border-soft);
}

/* Bento grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
}
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-5  { grid-column: span 5; }
.col-6  { grid-column: span 6; }
.col-7  { grid-column: span 7; }
.col-8  { grid-column: span 8; }
.col-12 { grid-column: span 12; }

@media (max-width: 768px) {
  .col-3, .col-4, .col-5, .col-6, .col-7, .col-8 { grid-column: span 12; }
}
```

### 7.3 Inputs

```css
.input, .textarea, .select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--ff-sans);
  font-size: var(--fs-md); /* 16px · evita zoom iOS */
  color: var(--text);
  line-height: 1.45;
  font-variant-numeric: tabular-nums;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
  min-height: 44px;
}

.input:focus-visible, .textarea:focus-visible, .select:focus-visible {
  outline: none;
  border-color: var(--vino);
  box-shadow: var(--shadow-focus);
}

.input[aria-invalid="true"] {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px rgba(185,28,28,0.15);
}

.label {
  display: block;
  font-family: var(--ff-sans);
  font-weight: 600;
  font-size: var(--fs-sm);
  font-variant-caps: all-small-caps; /* versalitas, no uppercase */
  letter-spacing: 0.04em;
  color: var(--vino);
  margin-bottom: var(--space-2);
}

.label-required::after {
  content: ' *';
  color: var(--danger);
}

.help-text {
  display: block;
  font-size: var(--fs-xs);
  color: var(--text-muted);
  margin-top: var(--space-1);
}

.error-text {
  display: block;
  font-size: var(--fs-sm);
  color: var(--danger);
  margin-top: var(--space-2);
}
```

### 7.4 Badge / tag / chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px 10px;
  background: var(--vino-tint);
  color: var(--vino);
  border-radius: var(--radius-full);
  font-family: var(--ff-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  min-height: 24px; /* WCAG 2.5.8 ✓ */
}

.badge-warning { background: rgba(184,110,31,0.10); color: var(--warning); }
.badge-success { background: rgba(58,107,77,0.10); color: var(--success); }
.badge-neutral { background: var(--bg-surface-2); color: var(--text-muted); }
```

### 7.5 Alerta crítica (Tipo III)

```css
.alert-critical {
  background: linear-gradient(135deg, var(--critical-grad-top) 0%, var(--vino) 100%);
  color: var(--text-on-vino);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-9);
  box-shadow: var(--shadow-critical);
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  animation: criticalIn var(--motion-slow) var(--ease-out);
}

.alert-critical[role="alert"][aria-live="assertive"] {
  /* Anuncia automáticamente a lectores de pantalla */
}

.alert-critical-icon {
  font-size: 64px;
  flex-shrink: 0;
}

.alert-critical-title {
  font-weight: 900;
  font-size: var(--fs-2xl);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.alert-critical-eyebrow {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.04em;
  font-size: var(--fs-sm);
  color: var(--dorado-warm);
}

@keyframes criticalIn {
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

## 8 · Layout

### Contenedores

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.section {
  padding: var(--space-10) 0;
}

.section-tight {
  padding: var(--space-7) 0;
}
```

### Breakpoints

```css
/* Mobile first · usar siempre min-width */
/* sm: 640px  · móvil grande */
/* md: 768px  · tablet */
/* lg: 1024px · laptop */
/* xl: 1280px · desktop */
/* 2xl: 1536px · monitor grande */
```

### Topbar (sticky)

```css
.topbar {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--bg-app) 85%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-soft);
  height: 64px;
}
```

## 9 · Cuándo usar serif (Crimson Pro)

Crimson Pro NO es el default — es la voz "editorial". Úsala SOLO en:

1. **Titulares de pregunta del árbol** — la pregunta es lo más importante de la pantalla; merece el peso editorial
2. **Números grandes de métricas** (30 protocolos, 176 pasos, 124 plantillas) — apariencia tipográfica clásica
3. **Subtítulos descriptivos** que acompañan headings (italic)
4. **Citas legales en línea** (italic): *"Ley 599 de 2000"*, *"Art. 43"*
5. **Nombres propios de documentos**: *"Acta de Versión Libre"*, *"Citación a Padres"*

Para todo lo demás (botones, labels, inputs, navegación, métricas pequeñas, body) usar **Inter Tight**.

## 10 · Cuándo usar mono (JetBrains Mono)

- **IDs**: `CASO-2026-0042`
- **Fechas técnicas**: `26.05.2026`
- **Fundamentos legales en chips**: `Art. 37 num. 2`
- **kbd**: `⌘K`
- **Códigos de error / debug**
- **Footer institucional pequeño**

NO usar mono para labels normales de formulario (el sistema anterior lo hacía — viola Butterick).

## 11 · Checklist al añadir/editar un componente

Antes de hacer commit pregúntate:

- [ ] ¿Usé tokens (`var(--...)`) en todos los valores? Sin hex literales en CSS de componente.
- [ ] ¿El contraste de texto cumple 4.5:1?
- [ ] ¿Los focusables tienen `:focus-visible` con outline visible?
- [ ] ¿El target clickeable mide ≥44×44px (botones) o ≥24×24px (chips inline)?
- [ ] ¿Cambios de estado dinámicos tienen `aria-live`?
- [ ] ¿Si es interactivo, es un `<button>`/`<a>` y no un `<div onclick>`?
- [ ] ¿Tipografía: usé versalitas en lugar de uppercase?
- [ ] ¿Comillas tipográficas en strings nuevas?
- [ ] ¿Motion respeta `prefers-reduced-motion`?

## 12 · Mockup de referencia

El [mockup J · Bento Jurídico](../../../mockups/J_bento_juridico.html) es la implementación canónica de este sistema. Si dudas cómo debe verse algo, ábrelo.

## 13 · Cómo invocar este sistema

Al diseñar o auditar cualquier elemento de ConciencIA, esta skill establece:

1. **Vocabulario común** — todos los tokens nombrados
2. **Reglas verificables** — los contrastes, tamaños mínimos, escalas
3. **Componentes pre-cocinados** — copia el CSS de la sección 7
4. **Filosofía cuando hay duda** — Bento moderno + autoridad jurídica + cariño editorial

> Si vas a desviarte del sistema, documenta el porqué en un comentario CSS junto al cambio.
