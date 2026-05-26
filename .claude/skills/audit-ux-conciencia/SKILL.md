---
name: audit-ux-conciencia
description: Audita la experiencia de usuario (UX) de la aplicación ConciencIA aplicando las 10 heurísticas de Jakob Nielsen (Nielsen Norman Group) y los patrones del GOV.UK Design System. INVOCA SIEMPRE que se mencione auditar la app ConciencIA, revisar UX/usabilidad, evaluar flujos del árbol de decisiones, analizar fricción en los formularios, revisar banners de alerta, o cuando se pregunte "¿esta app es usable?", "¿qué problemas de UX tiene?", "¿cómo mejoramos la experiencia del docente?". También se debe invocar al revisar microcopy, jerarquía visual, manejo de errores, o consistencia de navegación. Producirá una lista priorizada de issues UX con severidad, heurística violada, ubicación en código y recomendación accionable.
---

# Auditoría de UX — ConciencIA

## Cuándo usar esta skill

Usa esta skill cuando necesites evaluar la usabilidad de **ConciencIA** específicamente. La app es una PWA institucional del debido proceso disciplinario para docentes de la I.E. Sor María Juliana. Sus usuarios típicos son docentes y directivos con **poco tiempo, alta carga emocional** (manejando casos reales de convivencia con menores) y **competencia técnica heterogénea**. Cada fricción cuesta: una pregunta confusa puede llevar a clasificar mal una falta, lo que tiene consecuencias jurídicas reales.

## Marco teórico aplicado

### Las 10 heurísticas de Jakob Nielsen (NN/g)

1. **H1 · Visibilidad del estado del sistema** — El usuario siempre sabe qué pasa
2. **H2 · Coincidencia entre sistema y mundo real** — Vocabulario que el usuario entiende (no jerga técnica)
3. **H3 · Control y libertad del usuario** — Salidas claras, deshacer, cancelar
4. **H4 · Consistencia y estándares** — Mismas convenciones a lo largo de la app y con el resto del mundo
5. **H5 · Prevención de errores** — Mejor prevenir que pedir disculpas
6. **H6 · Reconocer en lugar de recordar** — La información visible reduce carga cognitiva
7. **H7 · Flexibilidad y eficiencia** — Atajos para expertos sin estorbar a novatos
8. **H8 · Diseño estético y minimalista** — No mostrar lo irrelevante
9. **H9 · Ayuda a reconocer, diagnosticar y recuperarse de errores** — Mensajes claros y accionables
10. **H10 · Ayuda y documentación** — Cuando se necesite, fácil de encontrar

### Patrones del GOV.UK Design System

Estándares que aplican a ConciencIA por ser un **servicio público digital**:

- **Lenguaje claro (Plain Spanish)** — vocabulario nivel grado 9, frases cortas, voz activa
- **Una pregunta por página** en flujos largos (sería ideal para el árbol de decisiones)
- **Patrones de formulario reconocidos**:
  - Etiquetas siempre visibles (nunca placeholder-as-label)
  - Hint text encima del input, no debajo
  - Asterisco rojo en obligatorios + texto explicativo
  - Error summary al inicio del formulario, con anclas a cada campo
- **Botones**: primario único por pantalla, secundario sutil, evitar 3+ botones
- **Inclusive by default** — pensar en quien tiene menos contexto, menos confianza, menos tiempo
- **Confirmación antes de acciones destructivas o de alto impacto** (subir a SIUCE, generar resolución sancionatoria)
- **Progreso visible** en flujos multi-paso

## Cómo ejecutar la auditoría

### Paso 1 — Cargar contexto del proyecto

Lee estos archivos para conocer estado actual:

- `index.html` → estructura, CSS, JS (es app monolítica)
- `data/02_arbol_principal.json` → 60 nodos del árbol de decisiones
- `data/03_catalogo_documentos.json` → 124 plantillas de documentos
- `docs/MANUAL_USO_DOCENTE.md` → flujo previsto por el autor

### Paso 2 — Inspección estructural por áreas

Audita estas áreas funcionales una por una, citando heurística violada y línea de código:

#### Área A: Pantalla inicial y modal de apertura de caso

- ¿El usuario entiende qué es ConciencIA en los primeros 5 segundos? [H2, H8]
- El modal "Iniciar Nuevo Proceso" pide datos del estudiante + acudiente + director. ¿Es demasiado para un solo paso? [GOV.UK: una pregunta por página]
- ¿Hay validación inline o solo al intentar continuar? [H5, H9]
- ¿Se puede cerrar el modal sin perder datos? [H3]

#### Área B: Árbol de decisiones (3 columnas)

- Nodo `n_inicio` tiene 12 opciones — viola Hick's Law. ¿Hay agrupación visual? [H8]
- ¿Se ve dónde está el usuario en el flujo? Breadcrumb, paso N de M, etc. [H1]
- ¿Puede volver atrás sin perder respuestas previas? [H3]
- Los banners de "presunción de inocencia / derechos del estudiante / confidencialidad" — ¿son útiles siempre o ruido visual? [H8]

#### Área C: Banner de alerta Tipo III

- Cuando aparece (un caso clasifica como Tipo III = delito), ¿el cambio visual es suficientemente impactante? [H1]
- ¿Las acciones obligatorias son claras y ordenadas por urgencia? [H9]
- ¿Se anuncia el cambio para lectores de pantalla? (cruce con a11y-conciencia)
- Microcopy del banner — ¿es directiva sin ser alarmista innecesariamente? [H2]

#### Área D: Timeline de pasos del protocolo

- Cada paso tiene: número, título, responsable, plazo, fundamento, documentos. ¿Es demasiada info compactada? [H8]
- Distinción visual entre paso obligatorio (borde dorado), urgente (borde rojo + reloj animado) y normal — ¿es comprensible sin leyenda? [H6]
- ¿Los checkboxes "completado" tienen feedback visual claro? [H1]
- ¿Se persiste el estado al cerrar? (cruce con limitación conocida v2.0)

#### Área E: Editor de documentos (124 plantillas)

- Campos auto-rellenados con tag "auto" en dorado — ¿se entiende que son editables? [H2, H6]
- Validación de campos obligatorios — banner rojo arriba con anclas a cada campo (¿está implementado o solo lista pasiva?) [GOV.UK: error summary]
- Botones "Descargar Word" / "PDF" / "Marcar como completado" — ¿jerarquía clara de cuál es la acción primaria? [GOV.UK: un primario por pantalla]
- ¿Se ve preview del documento antes de descargar? [H1, H5]
- Si falta internet y `docx.js` no se cargó, ¿el botón Word avisa o falla en silencio? [H9]

#### Área F: Chat / asistente conversacional

- ¿Sus respuestas son útiles o frustran al usuario que esperaba IA real? Hoy es offline con respuestas predefinidas. [H2: managing expectations]
- ¿Hay sugerencias de preguntas para arrancar? [H10]
- ¿Cita el artículo legal específico? [H10]

#### Área G: Configuración y temas

- 3 temas (editorial, moderno claro, moderno oscuro) — ¿el switcher es descubrible? ¿qué pasa con el sistema-preference del usuario? [H7]
- Configuración del nombre/cargo del funcionario — ¿es persistente o se pierde? [H7]

### Paso 3 — Si Claude Preview está disponible, validar visualmente

Lanza el server local y verifica:

```bash
python3 -m http.server 8000
```

O usa `mcp__Claude_Preview__preview_start` si está configurado. Toma screenshots:

- Pantalla inicial
- Modal de apertura
- Árbol con varias respuestas
- Tipo III banner activo
- Editor de documento con error de validación
- Los 3 temas

## Formato de salida — Estructura obligatoria

ALWAYS estructura el reporte así, ordenado por severidad:

```markdown
# Auditoría UX · ConciencIA · [fecha]

## Resumen ejecutivo

- Total de issues: N (Crítico: X, Alto: Y, Medio: Z, Bajo: W)
- Top 3 áreas con más problemas
- Una frase: "El mayor riesgo es..."

## Issues por severidad

### 🔴 CRÍTICOS

#### UX-001 · [Título corto del problema]
- **Área**: [A/B/C/D/E/F/G]
- **Heurística violada**: H[N] · [nombre]
- **Patrón GOV.UK**: [si aplica]
- **Ubicación**: `index.html:1234` o `data/02_arbol_principal.json:nodo_X`
- **Problema**: [descripción concreta de qué está mal]
- **Impacto en el docente**: [consecuencia para el usuario real]
- **Recomendación**: [acción específica, idealmente con código sugerido]

### 🟠 ALTOS
[...]

### 🟡 MEDIOS
[...]

### 🟢 BAJOS / OPORTUNIDADES
[...]

## Patrones positivos identificados

[Cosas bien hechas que vale conservar al refactorizar]

## Próximos pasos sugeridos

[Plan de ataque priorizado]
```

## Escala de severidad

- **🔴 Crítico** — Bloquea uso correcto, induce errores con consecuencias jurídicas, o excluye usuarios. Atender en <1 semana.
- **🟠 Alto** — Genera fricción significativa o malentendidos frecuentes. Atender en <1 mes.
- **🟡 Medio** — Ineficiencia o inconsistencia. Atender en próximo release.
- **🟢 Bajo** — Mejora estética o de pulido. Atender cuando haya espacio.

## Reglas inviolables

1. **Cita siempre la heurística** (H1-H10) o el patrón GOV.UK que se viola. Sin marco teórico, es opinión.
2. **Ubica el código** (archivo:línea) para que el dev pueda actuar de inmediato.
3. **Imagina al docente real** — no al desarrollador. La pregunta clave: "¿el director de grupo que tiene 35 estudiantes y 5 minutos puede usar esto bien?"
4. **No inventes severidad** — usa la escala objetivamente.
5. **Recomendaciones accionables** — no "mejorar la UX", sino "cambiar el `<button>` X por `<button>` Y con copy Z".
6. **Reconoce lo que está bien** — la sección "patrones positivos" no es relleno; protege buenas decisiones de refactors descuidados.

## Referencias

- Nielsen Norman Group · *10 Usability Heuristics for User Interface Design* (1994, revisadas 2020)
- GOV.UK Design System · design-system.service.gov.uk
- Krug, Steve · *Don't Make Me Think* (3rd ed, 2014)
- Jarrett, Caroline · *Forms that Work* (2008)
