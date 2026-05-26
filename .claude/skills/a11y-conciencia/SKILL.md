---
name: a11y-conciencia
description: Audita la accesibilidad de ConciencIA según WCAG 2.2 nivel AA, contemplando que la plataforma debe servir a la comunidad educativa de la I.E. Sor María Juliana incluyendo estudiantes con PIAR (Plan Individual de Ajustes Razonables, Decreto 1421 de 2017) y docentes con cualquier tipo de discapacidad. INVOCA SIEMPRE que se mencione revisar la accesibilidad, evaluar el cumplimiento WCAG, verificar navegación por teclado, comprobar contraste de colores en los 3 temas (editorial/moderno claro/moderno oscuro), revisar lectores de pantalla, validar formularios accesibles, o cuando se hable de inclusión educativa, PIAR, NEE, lectores como NVDA/VoiceOver/JAWS, o cumplimiento de Ley 1618 de 2013. Producirá una matriz de cumplimiento WCAG por criterio + lista de issues con código exacto a parchar.
---

# Auditoría de Accesibilidad — ConciencIA

## Cuándo usar esta skill

Usa esta skill cuando necesites evaluar el cumplimiento de **accesibilidad WCAG 2.2 nivel AA** de la aplicación ConciencIA. La accesibilidad no es opcional aquí: en Colombia, la **Ley Estatutaria 1618 de 2013** + **Decreto 1421 de 2017** (PIAR) obligan a que los servicios educativos sean accesibles. Es éticamente coherente además — el propio Manual de Convivencia que la app implementa contempla la inclusión educativa.

Los usuarios potencialmente afectados:

- Docentes con baja visión que usan zoom o lectores de pantalla
- Docentes con dificultades motoras que dependen del teclado
- Estudiantes mayores que pueden acceder a la app durante orientación
- Acudientes con discapacidad que firman documentos digitalmente
- Cualquier usuario con dislexia, fotosensibilidad, daltonismo

## Marco normativo aplicado

### WCAG 2.2 — Las 4 grandes categorías

1. **Perceptible (Perceivable)** — La información debe poderse percibir
2. **Operable (Operable)** — La interfaz debe poderse manejar
3. **Comprensible (Understandable)** — La información debe ser comprensible
4. **Robusto (Robust)** — El contenido debe interpretarse por tecnologías asistivas

### Criterios AA críticos para ConciencIA

| Criterio | Tema | Aplicación en ConciencIA |
|----------|------|--------------------------|
| 1.1.1 Contenido no textual | A | Íconos (📜☀️🌙⚖️🛡️🔒⚠️🤝) sin alt text equivalente |
| 1.3.1 Info y relaciones | A | Estructura semántica de las 3 columnas, headings, formularios |
| 1.4.3 Contraste mínimo (4.5:1 texto, 3:1 grande) | AA | Los 3 temas, especialmente moderno-oscuro y editorial vino tinto |
| 1.4.10 Reflujo | AA | Responsive a 320px sin scroll horizontal |
| 1.4.11 Contraste no-texto (3:1) | AA | Bordes, íconos, focus rings, botones |
| 1.4.12 Espaciado de texto | AA | Override de line-height, letter-spacing del usuario |
| 1.4.13 Contenido en hover/focus | AA | Tooltips dismissibles, hoverables, persistentes |
| 2.1.1 Teclado | A | Todo lo clickeable debe ser tab-bable |
| 2.1.2 Sin trampa de teclado | A | Modal de iniciar caso no debe atrapar el foco |
| 2.4.3 Orden de foco | A | Tab order lógico en 3 columnas |
| 2.4.6 Encabezados y etiquetas | AA | h1 → h2 → h3 sin saltos; labels en todos los inputs |
| 2.4.7 Foco visible | AA | Outline visible en todos los focusables |
| 2.4.11 Foco no oculto (mínimo) | AA | Nuevo en 2.2 — foco no debe quedar tapado por sticky headers |
| 2.5.8 Tamaño objetivo (mínimo 24x24px) | AA | Nuevo en 2.2 — chips de documento, checkboxes, botones de tema |
| 3.1.1 Idioma de la página | A | `<html lang="es-CO">` |
| 3.2.6 Ayuda consistente | A | Nuevo en 2.2 — chat asistente en mismo lugar siempre |
| 3.3.1 Identificación de errores | A | "Faltan campos obligatorios" debe nombrarlos |
| 3.3.2 Etiquetas o instrucciones | A | Todos los inputs con `<label>` asociado |
| 3.3.3 Sugerencia ante error | AA | "Email inválido" → "ejemplo@dominio.co" |
| 3.3.7 Entrada redundante | A | Nuevo en 2.2 — autorelleno de datos del caso es correcto si funciona |
| 3.3.8 Autenticación accesible (mínimo) | AA | Nuevo en 2.2 — N/A si no hay login |
| 4.1.2 Nombre, rol, valor | A | ARIA roles correctos en componentes custom |
| 4.1.3 Mensajes de estado | AA | Banner Tipo III, "Documento listo", validaciones — `aria-live` |

## Cómo ejecutar la auditoría

### Paso 1 — Auditoría automatizada (rápida, captura ~30% de issues)

Si la app está corriendo localmente o en producción, ejecuta:

```bash
# Opción A: axe-core CLI (requiere npx)
npx @axe-core/cli https://alguarito.github.io/Conciencia-/ --tags wcag2a,wcag2aa,wcag22aa

# Opción B: pa11y
npx pa11y https://alguarito.github.io/Conciencia-/ --standard WCAG2AA

# Opción C: Lighthouse (también captura performance)
npx lighthouse https://alguarito.github.io/Conciencia-/ --only-categories=accessibility
```

Si no hay forma de ejecutar herramientas, salta al Paso 2.

### Paso 2 — Auditoría manual con criterios WCAG

Para cada criterio AA aplicable, evalúa contra el código actual:

#### Bloque 1 — Perceptible

**1.1.1 Contenido no textual**
- Buscar todos los `<img>`, `<svg>`, emojis decorativos vs significativos
- Íconos de tema (📜☀️🌙) que cambian estado deben tener `aria-label`
- Emojis de los banners institucionales (⚖️🛡️🔒) — verificar si son redundantes con el texto adyacente (decorativos = `aria-hidden`) o si transmiten info única (= necesitan etiqueta)

**1.3.1 Info y relaciones**
- Verificar estructura: ¿hay `<main>`, `<nav>`, `<aside>`?
- ¿Los formularios usan `<fieldset>` + `<legend>` para grupos relacionados?
- ¿Las tablas (si las hay) tienen `<th scope="col">`?

**1.4.3 Contraste mínimo** ⚠️ CRÍTICO PARA ConciencIA por los temas
- Para CADA tema (editorial, moderno claro, moderno oscuro), calcula ratio de:
  - `--text` sobre `--bg-app`
  - `--text-muted` sobre `--bg-surface`
  - `--accent` (vino tinto #6B1820) sobre fondos
  - Dorado #B89968 sobre fondos
- Necesario: **4.5:1 para texto normal**, **3:1 para texto ≥18pt o ≥14pt bold**
- Usar https://webaim.org/resources/contrastchecker/ o calcular con fórmula

**1.4.11 Contraste no-texto**
- Bordes de inputs, focus rings, íconos críticos: **mínimo 3:1**

#### Bloque 2 — Operable

**2.1.1 Teclado**
- Recorrer toda la app con solo Tab/Shift+Tab/Enter/Espacio/Esc
- ¿Se puede abrir el modal? ¿Cerrar con Esc?
- ¿Cambiar de tema con teclado?
- ¿Llenar un documento completo sin tocar el mouse?

**2.4.7 Foco visible**
- En cada elemento focusable, ¿el outline es visible y de contraste 3:1?
- ¿Hay algún `outline: none` sin reemplazo?

**2.5.8 Tamaño objetivo (NUEVO en 2.2)**
- Cada elemento clickeable debe medir **mínimo 24×24px**
- Inspeccionar especialmente: chips de documento, íconos de tema, checkbox de "completado", botón cerrar modal

#### Bloque 3 — Comprensible

**3.1.1 Idioma**
- Verificar `<html lang="es-CO">` en `index.html`
- Si hay términos en latín ("a quo", "ad quem") o inglés, marcarlos con `<span lang="la">` / `<span lang="en">`

**3.3.1 Identificación de errores**
- Cuando faltan campos obligatorios, ¿se nombra CUÁL falta o solo "complete los campos"?
- ¿Los mensajes están asociados al input con `aria-describedby`?

#### Bloque 4 — Robusto

**4.1.2 Nombre, rol, valor**
- Componentes custom (chips de documento, banners, tabs si las hay) — ¿tienen `role` ARIA apropiado?
- Buttons que parecen toggles: ¿`aria-pressed`?

**4.1.3 Mensajes de estado** ⚠️ CRÍTICO PARA ConciencIA
- El **banner de alerta Tipo III** aparece dinámicamente cuando el árbol clasifica una conducta como delito. Para usuarios de lector de pantalla esto DEBE anunciarse:
  ```html
  <div role="alert" aria-live="assertive">...</div>
  ```
- Mensajes "Documento listo", "Faltan campos", "Caso guardado" — `aria-live="polite"`

### Paso 3 — Pruebas con tecnologías asistivas reales

Si es posible, ejecutar:

- **VoiceOver (macOS)** — Cmd+F5 — recorrer flujo completo
- **NVDA (Windows)** — recorrer flujo completo
- **TalkBack (Android)** — si se prueba como PWA instalada
- **VoiceOver (iOS)** — si se prueba como PWA en iPhone

Documentar dónde el lector "se pierde" o anuncia algo incorrecto.

## Formato de salida — Estructura obligatoria

```markdown
# Auditoría de Accesibilidad · ConciencIA · WCAG 2.2 AA · [fecha]

## Resumen ejecutivo

- **Nivel de cumplimiento global**: [Cumple / Cumple parcialmente / No cumple]
- **Criterios evaluados**: N / 50 aplicables
- **Issues encontrados**: Críticos: X, Altos: Y, Medios: Z
- **Una frase**: "El mayor obstáculo de accesibilidad hoy es..."

## Matriz de cumplimiento WCAG 2.2 AA

| Criterio | Nivel | Cumple | Evidencia / Issue |
|----------|-------|--------|-------------------|
| 1.1.1 Contenido no textual | A | ✅ / ⚠️ / ❌ | [breve descripción] |
| 1.3.1 Info y relaciones | A | ... | ... |
| 1.4.3 Contraste mínimo | AA | ... | ... |
| [todos los aplicables] | | | |

Leyenda: ✅ Cumple · ⚠️ Cumple parcialmente · ❌ No cumple · ⏸️ No aplica

## Issues por severidad

### 🔴 CRÍTICOS (bloquea uso para una categoría de usuarios)

#### A11Y-001 · [Título]
- **Criterio WCAG**: [N.N.N nombre, Nivel A/AA]
- **Categoría afectada**: [usuarios de lector de pantalla / teclado / baja visión / motoras / cognitiva]
- **Ubicación**: `index.html:1234`
- **Código actual**:
  ```html
  [snippet]
  ```
- **Problema**: [descripción]
- **Código corregido**:
  ```html
  [snippet con la fix]
  ```
- **Cómo verificar**: [paso para confirmar que se arregló]

### 🟠 ALTOS · 🟡 MEDIOS · 🟢 BAJOS
[mismo formato]

## Resultados de herramientas automatizadas

[Si se ejecutó axe/pa11y/Lighthouse, pegar resumen aquí]

## Resultados de pruebas con lectores de pantalla

[Si se ejecutó VoiceOver/NVDA/TalkBack, documentar dónde falla]

## Plan priorizado

1. **Esta semana** — críticos (especialmente contraste y banner Tipo III sin aria-live)
2. **Este mes** — altos
3. **Próximo release** — medios
4. **Backlog** — bajos
```

## Reglas inviolables

1. **Contraste se MIDE, no se opina** — siempre dar el ratio numérico (ej: "4.2:1, no cumple 4.5:1")
2. **Especificar la categoría de usuario afectada** — un issue de teclado no afecta a quien ve, un issue de contraste no afecta a quien usa lector
3. **Adjuntar el código exacto a parchar** — no "agregar aria-label" sino mostrar el snippet
4. **Verificar en los 3 temas** — un problema puede ser solo en moderno-oscuro
5. **No marcar ✅ sin verificar** — la duda se marca ⚠️ cumple parcialmente
6. **Citar fuente: WCAG 2.2 directo** — `https://www.w3.org/TR/WCAG22/`

## Recursos

- WCAG 2.2 (W3C) · https://www.w3.org/TR/WCAG22/
- WebAIM Contrast Checker · https://webaim.org/resources/contrastchecker/
- axe DevTools (Deque) · navegador
- Inclusive Components (Heydon Pickering) · https://inclusive-components.design/
- Ley 1618 de 2013 (Colombia)
- Decreto 1421 de 2017 (PIAR)
