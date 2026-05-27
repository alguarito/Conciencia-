---
name: ia-conciencia
description: Arquitectura, prompts y políticas del módulo IA de ConciencIA v3.0. Modo IA es OPCIONAL y complementa el modo offline determinístico. INVOCA SIEMPRE que se vaya a modificar, depurar o extender funcionalidades IA del proyecto: chat con IA, botón ✨ Mejorar texto, clasificador asistido, agregar nuevo proveedor (Anthropic/OpenAI/Google/custom), ajustar system prompts, manejar anonimización de datos, gestión de API keys BYOK, costos, modelos disponibles, streaming SSE, manejo de errores de IA. También al diagnosticar por qué la IA no responde, no anonimiza, o no entiende el contexto del caso.
---

# Módulo IA · ConciencIA v3.0

## Filosofía

El modo IA es **siempre opcional**. La app debe funcionar al 100% sin internet ni API key — el árbol de decisión determinístico cubre los casos. La IA **complementa**:

- Cuando el docente quiere hablar en lenguaje natural en lugar de seguir el árbol
- Cuando necesita ayuda redactando (gramática, formalidad, expandir/resumir)
- Cuando quiere una "segunda opinión" sobre la clasificación

**Mantra**: *"El modo offline garantiza que la app nunca falla. El modo IA aporta donde el árbol determinístico no llega."*

## Arquitectura BYOK (Bring Your Own Key)

```
┌──────────────────────────────────────────────────────────┐
│  Browser del docente                                      │
│  ┌────────────────────────────────────────────────┐      │
│  │  ConciencIA (PWA estática · GitHub Pages)      │      │
│  │  ┌──────────────────────────────────────┐      │      │
│  │  │  iaState en localStorage             │      │      │
│  │  │  · enabled (bool)                    │      │      │
│  │  │  · provider (string)                 │      │      │
│  │  │  · apiKey (string · base64 wrap)     │      │      │
│  │  │  · model (string)                    │      │      │
│  │  │  · anonimizar (bool · default true)  │      │      │
│  │  └──────────────────────────────────────┘      │      │
│  └────────────────────────────────────────────────┘      │
│                       ↓ fetch directo                     │
│                       ↓ (sin pasar por servidor del       │
│                       ↓  proyecto · BYOK)                 │
└──────────────────────────────────────────────────────────┘
                       ↓
        ┌──────────────┼──────────────┬─────────────┐
        ↓              ↓              ↓             ↓
   api.anthropic   api.openai   generativelanguage  custom
   .com            .com         .googleapis.com     endpoint
```

**Por qué BYOK**:
- Sin servidor propio → costos cero para el proyecto
- Privacidad → la API key nunca sale del navegador del docente
- Cada institución paga su propio uso (predecible)
- Soporta endpoints custom (Together, Groq, OpenRouter, Ollama local)

## Proveedores soportados

| Proveedor | Modelos | Endpoint base | Header auth |
|-----------|---------|--------------|-------------|
| **Anthropic** | claude-haiku-4-5 · sonnet-4-5 · opus-4-5 | `api.anthropic.com/v1/messages` | `x-api-key` + `anthropic-version` |
| **OpenAI** | gpt-4o-mini · gpt-4o · gpt-4.1 | `api.openai.com/v1/chat/completions` | `Authorization: Bearer` |
| **Google** | gemini-2.0-flash · gemini-2.0-pro | `generativelanguage.googleapis.com/v1beta/models/{m}:streamGenerateContent` | API key como query param `?key=` |
| **Custom** | cualquiera | usuario configura endpoint | `Authorization: Bearer` (OpenAI-compatible) |

**Costo estimado** (1000 casos típicos de uso normal):
- Anthropic Haiku 4.5: **~$0.50 USD**
- OpenAI GPT-4o mini: **~$0.20 USD**
- Google Gemini 2.0 Flash: **gratis para uso moderado**
- Custom (Groq/OpenRouter): depende del proveedor

## Adaptadores (`IA_ADAPTERS`)

Cada adapter expone 5 funciones:

```js
{
  nombre: 'Anthropic Claude',
  endpoint: () => string,                    // URL del endpoint
  headers: () => object,                      // headers de auth
  body: (systemPrompt, userPrompt, modelo, stream) => string (JSON),
  parseResponse: (data) => string,            // para respuestas sync
  parseStreamChunk: (line) => string          // para SSE streaming
}
```

Para agregar un nuevo proveedor: implementa estas 5 funciones y agrega al objeto `IA_ADAPTERS`.

## Anonimización (Ley 1581 de 2012)

**Por defecto activada**. Antes de enviar cualquier texto a la IA:

1. `anonimizarTexto(texto)` busca y reemplaza en el texto:
   - `state.caso.estudianteNombre` → `"Estudiante"`
   - `state.caso.estudianteDocumento` → `"[doc-estudiante]"`
   - `state.caso.acudienteNombre` → `"Acudiente"`
   - `state.caso.acudienteTelefono` → `"[tel-acudiente]"`
   - etc.
2. Guarda el mapa de reemplazos
3. Después de recibir respuesta de la IA, `desanonimizarTexto(respuesta, mapa)` restaura los valores originales

**El usuario PUEDE desactivar la anonimización** desde la config si necesita análisis contextual (con disclaimer claro de Ley 1581).

## System prompts

### Chat (`construirSystemPromptChat()`)

Define el rol como asesor del debido proceso SMJ, lista normativa colombiana relevante, explica clasificación Tipo I/II/III, define estilo (español Colombia, usted, tono institucional, máx 200 palabras, citas concretas).

Si hay caso activo, agrega contexto (id, grado, clasificación, nodo del árbol actual).

### Mejorar texto (`MEJORAR_PROMPTS`)

4 acciones con instrucciones específicas:
- `pulir`: gramática + claridad sin cambiar significado
- `formal`: tono jurídico-institucional para documentos oficiales
- `resumir`: 50% extensión, conservar hechos relevantes
- `expandir`: más detalle + contexto, sin inventar hechos

Cada instrucción termina con *"Devuelve SOLO el texto sin explicaciones"* para evitar respuestas preámbulo.

### Clasificador IA (`analizarConIA`)

System prompt define las 7 categorías posibles (TIPO_I/II/III + ACADEMICO + RECLAMACION + JUSTICIA + PQRS), lista todos los nodos disponibles del árbol con sus IDs exactos, y exige respuesta en JSON estructurado:

```json
{
  "clasificacion": "TIPO_II",
  "razonamiento": "...",
  "ruta_arbol": "n_protocolo_tipo_ii",
  "acciones_inmediatas": ["..."],
  "advertencias": "..."
}
```

## Streaming SSE

Cuando `llamarIA()` recibe `onChunk`, hace streaming:

```js
const reader = resp.body.getReader();
const decoder = new TextDecoder();
let buffer = '';
let acumulado = '';
while (true){
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  let lineas = buffer.split('\n');
  buffer = lineas.pop();
  for (const line of lineas){
    const chunk = adapter.parseStreamChunk(line.trim());
    if (chunk){
      acumulado += chunk;
      onChunk(desanonimizarTexto(chunk, mapaTotal), acumulado);
    }
  }
}
```

Cada proveedor parsea el SSE diferente:
- **Anthropic**: `data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"..."}}`
- **OpenAI**: `data: {"choices":[{"delta":{"content":"..."}}]}` + `data: [DONE]`
- **Google**: `data: {"candidates":[{"content":{"parts":[{"text":"..."}]}}]}`

## Manejo de errores

`llamarIA` propaga errores con mensajes amigables:
- 401: "API key inválida o expirada"
- 429: "Rate limit · espere unos segundos"
- 500+: "Error del proveedor · reintente"
- Network: "Sin conexión · vuelva al modo offline"

En el chat IA, los errores se muestran como mensaje normal con sugerencia de revisar config.

## UI y feedback visual

| Elemento | Indicación |
|----------|------------|
| Badge topbar | "Offline" verde · "Modo IA · Claude" vino tinto con dot dorado pulsante |
| Mensaje IA en chat | Border-izquierdo dorado + gradient sutil + tag "Modo IA · {proveedor}" |
| Botón ✨ en textarea | Squircle gradient dorado→vino, esquina superior derecha, opacity .7 → 1 en hover |
| Botón hero "✨ Describir caso con IA" | Solo visible si IA activa · gradient dorado→vino · shadow elevada |
| Procesando | Dots animados + texto + border-left dorado |
| Éxito | Border-left verde + ✓ |
| Error | Border-left rojo + ✗ |

## Reglas inviolables

1. **NUNCA enviar la API key a un servidor del proyecto.** Es BYOK.
2. **SIEMPRE anonimizar por defecto.** El usuario puede desactivar con disclaimer pero el default debe ser anonimizar.
3. **NUNCA hacer caer la app si falla la IA.** El modo offline es siempre el fallback.
4. **NUNCA loggear la API key en consola** ni incluirla en mensajes de error.
5. **NO inventar artículos legales.** El system prompt instruye a la IA a NO inventar; si extiendes prompts, mantén esta regla.
6. **Respetar `iaState.anonimizar`.** Si está activo, NUNCA enviar el texto sin pasarlo por `anonimizarTexto`.
7. **No persistir respuestas con datos sensibles.** El historial del chat (`state.historialChat`) se guarda en localStorage; si tiene PII sin anonimizar, se filtra por Ley 1581.

## Extensión futura

Funcionalidades pendientes que encajan en este sistema:

- **Verificación legal de documento**: dado un .docx generado, la IA revisa si los considerandos están bien fundamentados.
- **Búsqueda semántica del Manual**: indexar el Manual en chunks y usar embeddings para responder preguntas específicas.
- **Sugerencias proactivas**: cuando el docente pasa N minutos en un nodo sin avanzar, la IA ofrece ayuda contextual.
- **Coautoría de documentos**: la IA pre-llena más campos basándose en lo que ya escribió el docente en otros formatos (ya parcialmente hecho con autorelleno semántico).
- **Multi-turno en clasificador**: si la IA necesita más info, hace una pregunta de vuelta antes de clasificar.
- **Modo "deep research"**: para casos complejos, la IA hace búsqueda extensa + razona y devuelve dictamen estructurado.

## Comandos de prueba

Para probar manualmente el módulo (consola del browser):

```js
// Ver estado IA actual
console.log(iaState)

// Ver anonimización
anonimizarTexto("María Fernanda Gómez agredió a un compañero")
// → { textoAnon: "Estudiante agredió a un compañero", mapa: { Estudiante: "María Fernanda Gómez" } }

// Probar conexión
await probarConexionIA()
// → { ok: true, respuesta: "OK" }

// Llamada directa
await llamarIA({
  systemPrompt: "Eres un asistente jurídico.",
  userPrompt: "¿Qué dice el Art. 43 del Manual?",
  onChunk: (chunk, all) => console.log(all)
})
```
