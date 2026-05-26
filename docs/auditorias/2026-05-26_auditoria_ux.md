# Auditoría UX · ConciencIA · 2026-05-26

> Aplica las 10 heurísticas de Jakob Nielsen (Nielsen Norman Group) + patrones del **GOV.UK Design System**. Skill: `audit-ux-conciencia`.

## Resumen ejecutivo

- **Total de issues**: 24 (Crítico: 4, Alto: 8, Medio: 8, Bajo: 4)
- **Top 3 áreas con más problemas**:
  1. Área B (árbol de decisiones) — sin retorno, sin progreso visible, lista de 12 opciones sin agrupar
  2. Área E (editor de documentos) — banner-resumen con anclas semi-inaccesibles, una primaria + secundaria + terciaria sin jerarquía clara
  3. Área A (modal de apertura) — pide 11 campos en una sola pantalla
- **El mayor riesgo es** que un docente clasifique mal una situación Tipo II como Tipo III (o viceversa) porque el árbol no permite volver atrás para corregir una respuesta sin perder todo el caso, y porque el banner de alerta crítica usa un color de fondo casi idéntico al de un campo con error de validación, diluyendo la señal de urgencia jurídica.

---

## Issues por severidad

### 🔴 CRÍTICOS

#### UX-001 · No hay forma de volver atrás en el árbol de decisiones sin perder el caso completo

- **Área**: B (árbol de decisiones)
- **Heurística violada**: H3 · Control y libertad del usuario; H5 · Prevención de errores
- **Patrón GOV.UK**: "Back link" obligatorio en flujos multi-paso
- **Ubicación**: `index.html:1900-1912` (función `navegarA` y `seleccionarOpcion` no guardan historial); `index.html:1466-1490` (la columna 1 no expone breadcrumb ni botón "Atrás"); `index.html:1757-1764` ("Iniciar Nuevo Proceso" obliga a confirmar pero descarta TODO el estado: `state.rutaPasos = []; state.docsValores = {};`).
- **Problema**: Si la docente responde mal a `n_eval_dano_fisico` ("Sí, daños con incapacidad o muy graves" → cae directo a `n_alerta_tipo_iii`), no tiene cómo regresar. El único camino es "Iniciar Nuevo Proceso", que vacía `state.docsValores`, `state.pasosCompletados` y `state.caso`. Esto castiga severamente cualquier error de interpretación.
- **Impacto en el docente**: Una directora de grupo que confunde "daños sin incapacidad" con "daños con incapacidad" se ve obligada a reabrir el caso desde cero y re-escribir todos los datos del estudiante y del acudiente. En la práctica, terminará aceptando la clasificación incorrecta para no perder 5 minutos — clasificando mal una falta y exponiendo a la institución a una tutela.
- **Recomendación**: Implementar pila de navegación `state.historialNodos = []` en `navegarA()`, y agregar un botón "← Cambiar respuesta anterior" en el header de cada nodo de pregunta. Bonus: breadcrumb compacto del tipo `Inicio › Evaluación de daño › ...`. Código sugerido en `seleccionarOpcion`:
  ```js
  function navegarA(nodoId, esRetorno=false){
    if (!esRetorno && state.nodoActual) state.historialNodos.push(state.nodoActual);
    state.nodoActual = nodoId;
    ...
  }
  function retrocederNodo(){
    if (state.historialNodos.length){
      navegarA(state.historialNodos.pop(), true);
    }
  }
  ```

#### UX-002 · El banner de Tipo III no es visualmente diferenciable del banner de validación de formulario

- **Área**: C (banner Tipo III) / E (editor)
- **Heurística violada**: H1 · Visibilidad del estado del sistema; H4 · Consistencia y estándares
- **Patrón GOV.UK**: La notificación crítica debe usar el componente "Notification banner — important", visualmente distinto de "Error summary"
- **Ubicación**: `index.html:415-417` (`.alerta-card.critica` con fondo `linear-gradient(135deg,#FCEBE9 0%,#F9D9D5 100%)`); `index.html:917-921` (`.validacion-banner` con fondo `linear-gradient(135deg,#FCEBE9 0%,#F9D9D5 100%)` — **idéntico**).
- **Problema**: El banner que dice "Lo descrito podría constituir un delito según la Ley 599 de 2000" usa exactamente el mismo gradiente rojo claro y el mismo border-left rojo que el banner que dice "Faltan 2 campos obligatorios". Para el ojo del docente apurado, ambos parecen una "advertencia de formulario", no un aviso de urgencia jurídica que activa notificación a Policía Nacional.
- **Impacto en el docente**: El cerebro asume "es solo otra alerta del sistema" y subestima la gravedad. Como las acciones obligatorias del Tipo III (notificar a Policía, ICBF, acudiente, garantizar atención médica) son **plazos en horas**, cualquier minimización del aviso tiene consecuencias jurídicas reales para menores.
- **Recomendación**: Diferenciar radicalmente las dos clases. Para `.alerta-card.critica`:
  - Usar color saturado de fondo (no gradiente sutil): `background:var(--rojo-alerta); color:#fff;`
  - Icono SVG de sirena/escudo grande (40px) a la izquierda
  - Tamaño tipográfico mayor en `.alerta-titulo` (al menos `var(--fs-2xl)`)
  - Animación inicial de entrada más marcada (escala 0.95 → 1) + permanencia (sin animación de loop)
  - Prefijo "🚨 ACCIÓN INMEDIATA" en mayúsculas antes del título
  - En `renderAlerta` añadir `role="alert" aria-live="assertive"` al div para que lectores de pantalla lo anuncien.

#### UX-003 · Pérdida total del caso al cerrar la pestaña (sin advertencia)

- **Área**: A / G (estado y persistencia)
- **Heurística violada**: H5 · Prevención de errores; H9 · Recuperación de errores
- **Ubicación**: `index.html:1732-1745` (todo el `state` vive en memoria); `index.html:3677` (solo el tema se guarda en `sessionStorage`); `docs/MANUAL_USO_DOCENTE.md:175` lo reconoce como limitación.
- **Problema**: Si cierra la pestaña, el navegador se reinicia, o el sistema operativo aplica una actualización, **todo el caso se pierde silenciosamente**: datos del estudiante, respuestas del árbol, pasos completados, campos llenados de los documentos. No hay un `beforeunload` listener que advierta al usuario, ni un autosave en `localStorage`.
- **Impacto en el docente**: Tras llenar 30 campos en un Acta de Versión Libre que requiere min_chars 100 en `narracion_libre`, basta un click accidental en la X del navegador para tener que recomenzar. En jornadas de aula con interrupciones constantes, este es un riesgo casi seguro.
- **Recomendación**:
  1. Persistir `state` (excepto datos sensibles si lo decide la rectoría) en `localStorage` con clave por caso. La ley 1581 no prohíbe persistencia local; sí prohíbe envío a terceros. Documentar esto en el modal Info.
  2. Agregar `window.addEventListener('beforeunload', e => { if (state.caso && hayCambiosSinDescargar()) { e.preventDefault(); e.returnValue = ''; } })`.
  3. Mostrar un toast "Caso guardado localmente" tras cada cambio significativo.

#### UX-004 · `state.funcionario` se interpola sin escapar en el chat (vulnerabilidad XSS auto-infligida)

- **Área**: G (configuración)
- **Heurística violada**: H9 · Mensajes de error claros (en realidad, error de seguridad)
- **Ubicación**: `index.html:2523`: ``agregarMensajeAsistente({texto:`Hola, <strong>${state.funcionario}</strong> (${state.cargo}). Su configuración ha sido guardada. Listo para iniciar.`});`` — el `texto` se inyecta con `div.innerHTML` (`index.html:2390`) sin `escape()`.
- **Problema**: Si un docente escribe en el campo "Funcionario" algo como `<img src=x onerror=alert(1)>` o accidentalmente pega contenido con HTML, el chat ejecuta el código. En contextos institucionales con computadores compartidos, abre la puerta a auto-XSS o a manipulación maliciosa por terceros usando el mismo equipo.
- **Impacto en el docente**: Bajo en lo común (los docentes no escriben HTML), pero potencialmente alto si alguien con malas intenciones manipula el `sessionStorage` de un compañero o usa el equipo después. Además, en cualquier auditoría de seguridad institucional este patrón se reporta como crítico.
- **Recomendación**: Pasar `state.funcionario` por `escape()` en TODA interpolación HTML. Patrón sugerido: ``texto:`Hola, <strong>${escape(state.funcionario)}</strong> (${escape(state.cargo)})...` ``. Hacer lo mismo en `index.html:1868` (`escape(state.caso.estudianteNombre)` ya está; verificar otros lugares).

---

### 🟠 ALTOS

#### UX-005 · Nodo `n_inicio` con 12 opciones sin agrupación viola la Ley de Hick

- **Área**: B (árbol de decisiones)
- **Heurística violada**: H8 · Diseño estético y minimalista; H6 · Reconocer en lugar de recordar
- **Patrón GOV.UK**: Cuando hay más de 7 opciones, agruparlas en encabezados o usar select condicional
- **Ubicación**: `data/02_arbol_principal.json:11-80` (12 opciones planas); `index.html:1976-1995` (`renderPregunta` las pinta todas como una lista plana).
- **Problema**: La docente que abre la app para reportar una conducta tiene que escanear 12 opciones técnicas para encontrar la suya. La opción 11 ("Activar RAI") está antes de "No estoy seguro" — el orden visual prioriza categorías administrativas sobre el caso de uso más común.
- **Impacto en el docente**: Tiempo de decisión > 15 segundos en la pantalla más crítica. Docentes con poca formación tecnológica pueden abandonar.
- **Recomendación**: Agrupar visualmente en 3 secciones con subtítulos: **Conducta y convivencia** (3 opciones), **Académico** (4 opciones), **Administrativo** (4 opciones), y una opción destacada al final: "No estoy seguro". Alternativa GOV.UK: una pregunta inicial "¿Su caso es disciplinario, académico o administrativo?" que filtre las siguientes.

#### UX-006 · El modal "Iniciar Nuevo Caso" pide 11 campos en una sola pantalla

- **Área**: A (modal de apertura)
- **Heurística violada**: H8 · Diseño minimalista
- **Patrón GOV.UK**: "One thing per page" en formularios largos
- **Ubicación**: `index.html:1575-1658` (modal con 3 secciones: 6 campos de estudiante + 4 de acudiente + 1 de director).
- **Problema**: La docente debe rellenar TODO para abrir el expediente, aunque para una falta leve (Tipo I) algunos campos sean prematuros: por ejemplo, `acudienteEmail` no se usa hasta enviar una citación. Pedir todo al inicio aumenta abandono y errores de captura.
- **Impacto en el docente**: 30-60 segundos para abrir un caso (mucho cuando se tienen 35 estudiantes). En móvil, scroll vertical largo.
- **Recomendación**: Dividir en 2 pasos: (1) Solo datos mínimos del estudiante (nombre, documento, grado, grupo) → abrir expediente; (2) Acudiente y director se piden al primer documento que los requiera.

#### UX-007 · El "Marcar como completado" del paso no guarda nada (estado volátil + sin confirmación)

- **Área**: D (timeline)
- **Heurística violada**: H1 · Visibilidad del estado; H3 · Control del usuario
- **Ubicación**: `index.html:2138-2148` (`togglePasoCompleto` solo modifica `state.pasosCompletados` en memoria); `index.html:2099-2102` (checkbox sin `aria-checked`).
- **Problema**: Marcar un paso como completado (p. ej. "Notificación a Policía Nacional" en Tipo III) es una afirmación con consecuencias jurídicas. La acción se desmarca al cerrar la pestaña. Además, basta un click accidental para marcar/desmarcar sin diálogo de confirmación.
- **Impacto en el docente**: Falsa sensación de progreso. La barra `caso-progreso` muestra "9/13 pasos · 69%" y al volver al día siguiente todo está vacío. Riesgo grave en pasos obligatorios.
- **Recomendación**: (a) Persistir `pasosCompletados` en localStorage; (b) Para pasos `obligatorio: true` o `urgencia: "critica"`, mostrar un toast/diálogo de confirmación; (c) Mostrar timestamp cuando se completa.

#### UX-008 · Banner de validación inaccesible por teclado (links sin `href` ni `role`)

- **Área**: E (editor de documentos)
- **Heurística violada**: H4 · Consistencia / GOV.UK Error summary
- **Ubicación**: `index.html:2584`: ``<a onclick="irACampoConError('${f.id}')">${escape(f.etiqueta)}</a>``. No tiene `href`, no es focusable con Tab, no es activable con Enter.
- **Problema**: Un docente que usa teclado no puede saltar al campo erróneo desde el banner.
- **Recomendación**: Cambiar a `<a href="#err-${f.id}">` con `e.preventDefault()` + `irACampoConError`. Añadir `role="alert" aria-labelledby` al banner.

#### UX-009 · El campo de inclusión PIAR usa `<select>` con default "No" — confunde la jerarquía

- **Área**: A (modal de apertura)
- **Heurística violada**: H2 · Coincidencia con mundo real; H6 · Reconocer en lugar de recordar
- **Ubicación**: `index.html:1617-1623`.
- **Problema**: El docente no sabe si "PIAR" significa "Plan Individual de Ajustes Razonables". Marcar "Sí" no dispara consecuencias visibles. El campo está pero no influye en nada.
- **Recomendación**: (a) Checkbox con etiqueta clara explicando PIAR. (b) Si está marcado, banner permanente "⚠ Estudiante con PIAR". (c) Conectar al árbol: cuando `estudianteInclusion === true`, advertencia antes de clasificaciones Tipo II/III.

#### UX-010 · Chips de principios son ruido visual permanente

- **Área**: B (footer columna 1)
- **Heurística violada**: H8 · Diseño minimalista; H10 · Ayuda
- **Ubicación**: `index.html:1485-1489`.
- **Problema**: Tres "chips decorativos" sin acción, mostrados siempre. El docente ya los aprendió tras la primera sesión.
- **Recomendación**: Convertirlos en un único enlace "ℹ Principios del debido proceso" que al click expanda los 3.

#### UX-011 · No hay indicador de progreso en el árbol de decisiones

- **Área**: B
- **Heurística violada**: H1 · Visibilidad del estado del sistema
- **Patrón GOV.UK**: Progress indicator en multi-step forms
- **Ubicación**: `index.html:1976-1995` (función `renderPregunta` no muestra progreso).
- **Problema**: La docente no sabe si tras esta pregunta vienen 2 más o 7 más.
- **Recomendación**: Calcular profundidad estimada (BFS hasta hoja `protocolo`) y mostrar "Pregunta 3 de aprox. 5".

#### UX-012 · El chat tiene 3 sugerencias estáticas que no cambian con el contexto

- **Área**: F (chat)
- **Heurística violada**: H7 · Flexibilidad y eficiencia; H10 · Ayuda contextual
- **Ubicación**: `index.html:1514-1518`.
- **Problema**: Las sugerencias no aplican al contexto actual. El chat se siente irrelevante.
- **Recomendación**: Definir en cada nodo del JSON un array `sugerencias_chat: [...]` y renderizarlas dinámicamente.

---

### 🟡 MEDIOS

#### UX-013 · Modales no se cierran con la tecla `Escape`

- **Heurística violada**: H3 · Control del usuario; H4 · Estándares
- **Ubicación**: `index.html:2516-2518`
- **Recomendación**: Listener global de `keydown Escape`.

#### UX-014 · Pestañas "Requeridos/Opcionales/Completos" son `<div>` no `<button>`

- **Ubicación**: `index.html:1543-1546`
- **Recomendación**: Cambiar a `<button role="tab">` con ARIA correcto.

#### UX-015 · Chip de documento es `<span>` con onclick

- **Ubicación**: `index.html:2097`
- **Recomendación**: Cambiar a `<button class="paso-doc-chip" type="button">`.

#### UX-016 · El botón Word falla en silencio cuando docx.js no carga

- **Ubicación**: `index.html:2623-2626`
- **Recomendación**: Deshabilitar realmente con `disabled=true`; mensaje accionable que sugiera usar PDF; empacar la librería localmente.

#### UX-017 · Tres botones primarios en el editor sin jerarquía clara

- **Patrón GOV.UK**: un primario por pantalla
- **Ubicación**: `index.html:1563-1567`
- **Recomendación**: Reducir a 2 acciones primarias; "Marcar completado" pasa a checkbox al pie del formulario.

#### UX-018 · "Modo IA · próximamente" en select deshabilitado

- **Ubicación**: `index.html:1670-1675`
- **Recomendación**: Quitar el `<select>` por completo y mostrar texto plano.

#### UX-019 · No hay feedback visual al cambiar de tema (parpadeo molesto)

- **Ubicación**: `index.html:3663-3679`
- **Recomendación**: `aria-pressed` en los botones + toast con nombre del tema durante 1.5s; persistir en `localStorage` (no `sessionStorage`).

#### UX-020 · No hay `aria-required`, `aria-invalid`, ni `aria-live` en formularios

- **Heurística violada**: Accesibilidad
- **Ubicación**: `index.html:1583-1644, 2309-2336`
- **Recomendación**: `aria-required` en obligatorios; `aria-invalid` al marcar error; `role="alert"` en `validacion-banner`.

---

### 🟢 BAJOS / OPORTUNIDADES

#### UX-021 · Placeholder "TI · CC · RC" sin explicación

- **Ubicación**: `index.html:1591`
- **Recomendación**: Hint text encima del input: "TI (menores), CC (mayores 18), RC (menores 7)".

#### UX-022 · "Modo Offline" se anuncia 3 veces

- **Ubicación**: `index.html:1443, 1501-1504, 1523`
- **Recomendación**: Mantener solo el badge en topbar.

#### UX-023 · Placeholder con nombre propio "María Fernanda Gómez Rodríguez"

- **Ubicación**: `index.html:1586`
- **Recomendación**: Cambiar a `placeholder="Nombres y apellidos completos"`.

#### UX-024 · Nombre del archivo descargado pierde tildes y formato

- **Ubicación**: `index.html:2659-2664`
- **Recomendación**: Normalizar con `NFD` para preservar tildes y escapar solo símbolos peligrosos.

---

## Patrones positivos identificados

1. **`escape()` se usa consistentemente** en `renderPregunta`, `renderClasificacion`, `renderProtocolo` (mitiga XSS en datos del árbol).
2. **`aplicarAutoRelleno` con regex sobre IDs de campo** (`index.html:2266-2307`) es elegante para evitar capturar 5 veces el mismo dato.
3. **Validación con focus al primer error** en `confirmarIniciarCaso` (`index.html:1829`) — patrón correcto.
4. **`role="radiogroup"` en theme switcher** muestra atención a a11y (aunque falta completar con `role="radio"`).
5. **Distinción tipográfica entre serif (jurídico) y mono (metadatos)** — buena decisión de identidad visual.
6. **Mensaje del chat tras marcar paso completado** con mención al `fundamento` legal — refuerza pedagógicamente.
7. **El indicador de progreso de la barra** (`caso-progreso`) está bien diseñado y debería extenderse al árbol.

---

## Próximos pasos sugeridos

1. **Semana 1 — Críticos**: UX-001 (botón atrás), UX-002 (rediseño banner crítico), UX-004 (escapar `state.funcionario`).
2. **Semana 2 — Persistencia**: UX-003 (localStorage + beforeunload + autosave). Implica UX-007.
3. **Mes 1 — Altos restantes**: UX-005, UX-006, UX-008, UX-011, UX-012.
4. **Próximo release — Medios y bajos**: bloque de a11y (UX-013-020) en una sola PR.
5. **Validar con docentes reales**: 3 sesiones moderadas (5 docentes, 1 directivo, 1 orientadora) — observación + think-aloud sobre escenarios Tipo II/III. Medir tiempo hasta clasificación y tasa de error.
