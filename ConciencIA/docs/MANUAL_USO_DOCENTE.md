# Manual de Uso para Docentes

Esta guía explica paso a paso cómo usar **ConciencIA** para gestionar un caso del debido proceso disciplinario o académico.

---

## 📌 Primer uso

### Acceder a la aplicación

Tiene tres opciones:

1. **En línea**: abra `https://[institución].github.io/ConciencIA/` en su navegador
2. **Instalada** (recomendada): siga las instrucciones del README para instalarla como app
3. **Local**: descargue el `index.html` y ábralo con doble click

### Pantalla inicial

Al abrir ConciencIA verá **tres columnas**:

- **Columna 1 (izquierda) — Ruta del Debido Proceso**: aquí aparecerán las preguntas guiadas y el protocolo aplicable
- **Columna 2 (centro) — Asistente**: chat para resolver dudas
- **Columna 3 (derecha) — Expediente**: los documentos a generar

En la **barra superior** encontrará:
- El nombre de la app y la institución
- Un **selector de tema** (📜 Editorial, ☀️ Moderno claro, 🌙 Moderno oscuro) — elija el que prefiera
- Configuración (su nombre y cargo)
- Información de la aplicación

---

## 🎯 Cómo gestionar un caso completo

### Paso 1: Iniciar un nuevo proceso

1. En la columna izquierda, click en **"Iniciar Nuevo Proceso"**
2. Se abre un modal con tres secciones:
   - **Estudiante**: nombre completo, documento, grado, grupo, jornada, condición de inclusión (PIAR)
   - **Acudiente**: nombre, teléfono, documento, email
   - **Director de grupo**: nombre

3. Los campos con asterisco (*) son obligatorios. Si intenta continuar sin llenarlos, verá errores en rojo.

4. Click en **"Abrir expediente"**. Se genera automáticamente un ID único: `CASO-2026-XXXX`.

> 💡 **Tip**: si después necesita corregir algún dato, click en **"✎ Editar datos del caso"** en cualquier momento.

### Paso 2: Clasificar la situación

El asesor le hará preguntas paso a paso para identificar el protocolo aplicable:

1. **¿Qué tipo de situación atiende?**
   - Conducta o comportamiento (disciplinario)
   - Reclamación académica (calificación)
   - Justicia Restaurativa (mediación)
   - Trámites administrativos (matrículas, traslados)
   - No estoy seguro (orientación general)

2. **¿Hubo daño físico, psicológico o emocional?**
   - Si SÍ: pasa a evaluar tipo y gravedad
   - Si NO: evalúa si es esporádico o recurrente

3. **¿Es la primera vez (esporádica) o se ha repetido?**

4. **Tipificar la falta específica** según el Manual

Después de responder, ConciencIA muestra la **clasificación**:
- **Tipo I — Falta Leve**: atendida por cualquier docente
- **Tipo II — Falta Grave**: Coordinador o Orientador
- **Tipo III — Falta Gravísima**: Rector + notificación a Policía

> ⚠️ **Si la situación clasifica como Tipo III**, verá inmediatamente un banner rojo con las **acciones obligatorias** (notificar Policía, ICBF, acudiente, etc.). El asesor lo guiará en el orden correcto.

### Paso 3: Seguir el protocolo

Ya identificado el protocolo, la columna izquierda muestra el **timeline de pasos verificables**:

- Cada paso tiene:
  - 🔢 **Número** y título
  - 👤 **Responsable** (quién debe hacerlo)
  - ⏱ **Plazo** (días u horas)
  - 📖 **Fundamento legal** (artículo del Manual)
  - 📄 **Documentos asociados** (chips con el formato a generar)
  - ☑ **Checkbox** para marcar como completado

**Tipos de paso especiales** (con realce visual):

- **Paso obligatorio** (borde dorado): no se puede omitir
- **Paso urgente** (borde rojo + reloj animado): requiere acción inmediata

Click en el **título** del paso para expandir su descripción detallada.

### Paso 4: Generar los documentos

Click en cualquier **chip de documento** (📄) → se abre el editor en la columna derecha.

#### El editor de documentos

- **Encabezado institucional** con marca SMJ
- **Nombre del formato** y su fundamento legal
- **Campos a completar**:
  - Los marcados con * son obligatorios
  - Los **campos en dorado** con tag "auto" ya están **pre-rellenados** desde los datos del caso (nombre del estudiante, acudiente, fecha, lugar...) — puede editarlos si lo necesita
  - Los demás los completa usted

#### Botones de acción

- **📄 Descargar Word**: genera un `.docx` listo para imprimir y firmar
- **📑 PDF**: abre el documento en vista de impresión → puede "Guardar como PDF" desde el diálogo
- **Marcar como completado**: confirma que el documento está listo (se convierte en chip verde ✓)

> ⚠️ **Si faltan campos obligatorios**, aparece un **banner rojo** en la parte superior listándolos. Click en cualquiera para ir directo a corregirlo.

### Paso 5: Imprimir y archivar

Una vez descargado el Word o PDF:

1. **Imprimirlo** (recomendado en papel oficial institucional si lo tiene)
2. **Firmarlo físicamente** con las partes correspondientes
3. **Archivarlo en el expediente físico** del estudiante
4. **Registrar en SIUCE** si la situación es Tipo II o Tipo III

---

## 💬 Usar el asistente conversacional

La columna central tiene un chat donde puede preguntar:

- "¿Cómo identifico si una situación es Tipo I, II o III?"
- "¿Cuáles son los pasos del protocolo Tipo II?"
- "¿Qué es la justicia restaurativa?"
- "¿Cómo funcionan los recursos de reposición y apelación?"
- "¿Qué es la reclamación académica del SIE?"

El asistente responde con información del Manual y SIE, citando el artículo correspondiente.

> 🔌 **Modo offline**: actualmente el chat responde con base en una base de conocimiento local. Una versión futura permitirá conectar IA generativa con API key personal.

---

## 🎨 Personalización

### Cambiar el tema visual

Click en cualquiera de los 3 íconos del selector en la barra superior:

- 📜 **Editorial** (default): vino tinto + dorado, tipografía serif. Aire institucional clásico.
- ☀️ **Moderno claro**: blanco + grises, tipografía Inter. Aire de aplicación moderna.
- 🌙 **Moderno oscuro**: fondo zinc oscuro, ideal para usar de noche o con la pantalla brillante.

> El tema elegido se recuerda durante la sesión. **Los documentos descargados** (Word/PDF) **siempre mantienen la identidad institucional** independientemente del tema activo.

### Configurar su nombre y cargo

Click en el ícono ⚙️ (configuración) de la barra superior:

- **Funcionario**: su nombre completo (aparecerá en los documentos)
- **Cargo**: docente, director de grupo, coordinador(a), orientador(a), rector(a)

Esta información se usa para auto-rellenar campos como "Funcionario que reporta".

---

## ⚠️ Consideraciones importantes

### Privacidad

- **Todos los datos viven en su navegador** — no se envían a ningún servidor
- Si **comparte el dispositivo** con otros docentes, cierre la pestaña al terminar
- Los documentos descargados son archivos en su computador, gestiónelos con cuidado

### Limitaciones de la versión actual (v2.0)

- ❌ **Sin persistencia entre sesiones**: si cierra el navegador, **se pierde el caso activo**. Por ahora, descargue los documentos importantes antes de cerrar. (En la v2.1 se implementará persistencia cifrada).
- ❌ **Un caso a la vez**: por ahora no puede tener varios casos abiertos simultáneamente.

### Cuando consultar a otra instancia

ConciencIA **orienta** pero no **decide**. Casos complejos siempre deben consultarse con:

- Coordinador de Convivencia
- Docente Orientador
- Rectoría
- Comité de Convivencia (en sesión ordinaria o extraordinaria)
- Si involucra delito: Policía Nacional + ICBF + Comisaría de Familia

---

## 🆘 Solución de problemas comunes

### "El botón Word no descarga nada"

- Verifique que está conectado a internet (la librería se carga desde CDN la primera vez)
- Si está sin internet, puede pasar si nunca abrió la app online previamente
- Verifique en la consola del navegador (F12) si hay errores

### "El PDF no abre"

- Permita ventanas emergentes para esta página
- En el diálogo de impresión, **seleccione "Guardar como PDF"** como destino

### "Los datos del estudiante salen mal en el Word"

- Click en "✎ Editar datos del caso" y revíselos
- Después abra el documento nuevamente — los datos se actualizarán

### "No encuentro un protocolo que necesito"

- Use el chat para preguntar
- Si efectivamente no está, repórtelo como [Issue](../../issues/new) para añadirlo

---

## 📞 Soporte

- 📧 **Correo institucional**: iesormariajuliana@gmail.com
- 🐛 **Reportar errores**: [Abrir un Issue](../../issues/new)

---

*Manual actualizado para ConciencIA v2.0 · I.E. Sor María Juliana · 2026*
