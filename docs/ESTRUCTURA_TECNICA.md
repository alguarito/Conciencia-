# Estructura Técnica de ConciencIA

Documento orientado a desarrolladores que quieran entender, modificar o extender la aplicación.

---

## 🏗️ Arquitectura general

ConciencIA es una **Single-Page Application** (SPA) construida intencionalmente sin frameworks. Todo el código está embebido en un único archivo `index.html` que pesa ~300 KB.

### ¿Por qué sin frameworks?

- **Portabilidad**: el archivo es ejecutable directamente, sin build step, sin servidor
- **Longevidad**: HTML/CSS/JS vanilla seguirán funcionando dentro de 10 años
- **Auditoria**: cualquier docente con conocimientos básicos puede revisar el código completo
- **Funcionamiento offline**: una vez cargado, no necesita conexión

### Stack técnico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| UI | HTML5 + CSS3 (variables custom) + JS vanilla | Sin dependencias |
| Datos | JSON embebido | Sin necesidad de base de datos |
| Generación Word | docx.js@8.5.0 (CDN) | Estándar de la industria |
| Generación PDF | window.print() + @media print | PDF vectorial nativo |
| Cache offline | Service Worker | API estándar de navegadores modernos |
| Instalación | Web App Manifest | PWA estándar |
| Cifrado (futuro) | Web Crypto API | Nativo, AES-GCM 256-bit |

---

## 📂 Estructura de los datos

Los datos del árbol están en `data/` como **3 archivos JSON modulares**. Esta separación facilita el mantenimiento por personas no-técnicas.

### `01_metadata.json` — Configuración base

```json
{
  "institucion": { "nombre", "direccion", "ciudad", "email" },
  "fundamento_legal": [ ... ],
  "principios": [ ... ],
  "instancias_competentes": [ ... ],
  "plazos_normativos": [ ... ],
  "alertas_globales": [ ... ],
  "campos_globales_caso": [ ... ],
  "configuracion_documentos": {
    "encabezado_estandar": { ... }
  }
}
```

### `02_arbol_principal.json` — El árbol de decisiones

```json
{
  "version": "2.0.0",
  "nodo_raiz": "n_inicial",
  "nodos": {
    "n_inicial": {
      "id": "n_inicial",
      "tipo": "pregunta",
      "titulo": "...",
      "pregunta": "...",
      "fundamento": "...",
      "opciones": [
        { "etiqueta": "...", "siguiente": "n_otro_nodo" }
      ]
    },
    "n_protocolo_tipo_ii": {
      "tipo": "protocolo",
      "responsable_general": "...",
      "pasos": [
        {
          "numero": 1,
          "titulo": "...",
          "responsable": "...",
          "plazo_dias": 3,
          "obligatorio": true,
          "urgencia": "alta",
          "fundamento": "...",
          "documentos_generar": ["doc_acta_version_libre"]
        }
      ]
    }
  }
}
```

**Tipos de nodos**:
- `pregunta` — bifurcación con opciones
- `informativo` — texto + botón "continuar"
- `alerta` — advertencia con acciones obligatorias
- `clasificacion` — resultado de tipificación (Tipo I/II/III)
- `protocolo` — secuencia de pasos verificables

### `03_catalogo_documentos.json` — Plantillas de documentos

```json
{
  "catalogo_documentos": {
    "doc_acta_version_libre": {
      "id": "doc_acta_version_libre",
      "nombre": "Acta de Versión Libre",
      "categoria": "disciplinario",
      "fundamento": "Manual Art. 37 num. 2",
      "campos": [
        {
          "id": "fecha",
          "tipo": "fecha",
          "etiqueta": "Fecha del hecho",
          "obligatorio": true
        },
        {
          "id": "narracion_libre",
          "tipo": "textarea",
          "etiqueta": "Versión libre de los hechos",
          "obligatorio": true,
          "min_chars": 100
        }
      ]
    }
  }
}
```

**Tipos de campos**:
- `texto`, `textarea`, `numero`, `email` — entradas básicas
- `fecha`, `hora`, `datetime` — fechas y horas
- `select` (con `opciones`) — desplegable
- `boolean` — checkbox
- `firma` — espacio para firma individual
- `firmas_multiples` (con `personas`) — múltiples firmas
- `min_chars` — validación de longitud mínima

---

## 🎨 Sistema de diseño

### Variables CSS semánticas

Definidas en `:root` y modificadas por tema:

```css
:root, [data-theme="editorial"] {
  --bg-app: #FAF7F2;
  --bg-surface: #FAF7F2;
  --text: #1A1614;
  --accent: #6B1820;
  /* ... */
}

[data-theme="moderno"] { ... }
[data-theme="moderno-oscuro"] { ... }
```

### Sistema tipográfico (7 escalones)

```css
--fs-xs: 10px;   /* metadatos, tags */
--fs-sm: 11px;   /* labels mayúsculas */
--fs-base: 13px; /* cuerpo de UI */
--fs-md: 14px;   /* títulos de tarjeta */
--fs-lg: 16px;   /* títulos de sección */
--fs-xl: 20px;   /* títulos de columna */
--fs-2xl: 26px;  /* títulos heroicos */
```

---

## 🔧 Funciones JavaScript principales

```
Estado global
  └── state                  # objeto con caso, nodoActual, docsValores, etc.

Navegación del árbol
  ├── iniciarProceso()
  ├── abrirModalIniciarCaso()
  ├── confirmarIniciarCaso()
  ├── navegarA(nodoId)
  └── editarDatosCaso()

Renderizado
  ├── renderColumnaRuta()
  ├── renderPregunta() / renderAlerta() / renderClasificacion() / renderProtocolo()
  ├── renderDocumentos(tab)
  └── renderCampo(campo, valores, prellenados)

Documentos
  ├── abrirEditorDoc(docId)
  ├── aplicarAutoRelleno(doc, valores)
  ├── validarCamposObligatorios(doc, valores)
  ├── descargarDocx()
  ├── descargarPDF()
  ├── construirDocumentoDocx(doc, valores)   # genera estructura docx.js
  └── construirHTMLImprimible(doc, valores)  # genera HTML para impresión

Chat
  ├── enviarMensaje()
  ├── agregarMensajeAsistente(obj)
  └── buscarRespuestaOffline(query)

Temas
  ├── cambiarTema(tema)
  └── inicializarTema()
```

---

## 🔐 Plan de seguridad y privacidad (v2.1)

### Almacenamiento cifrado planeado

```
Caso activo → AES-GCM 256-bit → IndexedDB
              ↑
              Clave derivada con PBKDF2 (100k iteraciones)
              ↑
              Contraseña del usuario (nunca almacenada)
```

### Por qué NO localStorage

- localStorage es síncrono (bloquea UI)
- Capacidad limitada (~5MB)
- IndexedDB permite ~50MB+
- IndexedDB tiene API asíncrona

---

## 🚀 Cómo desplegar

### GitHub Pages (recomendado)

1. Sube el repositorio a GitHub
2. Settings → Pages
3. Source: `main` branch, root folder
4. URL: `https://alguarito.github.io/Conciencia-/`

### Servidor propio

Cualquier servidor HTTP estático funciona. Solo requiere:
- Servir `index.html` con `Content-Type: text/html`
- HTTPS para que funcione el Service Worker (PWA)

### Local

`python3 -m http.server 8000` y abrir `http://localhost:8000`

> ⚠️ **Importante**: la PWA solo se instala bajo HTTPS o localhost.

---

## 🧪 Testing

Actualmente no hay tests automatizados. Cobertura sugerida para futuras versiones:

- Tests del árbol: validar que todos los nodos referenciados existen
- Tests del catálogo: validar que todos los `docs_requeridos` están en el catálogo
- Tests de generación: comparar Word/PDF generados contra plantilla de referencia
- Tests de validación: verificar bloqueo de descarga con campos obligatorios vacíos

---

## 📝 Convenciones

### Naming
- IDs de nodos: `n_descripcion_corta` (snake_case con prefijo `n_`)
- IDs de documentos: `doc_nombre_descriptivo`
- IDs de campos: `nombre_campo` (snake_case sin prefijo)
- Variables CSS: kebab-case con prefijo `--`
- Funciones JS: camelCase en español o inglés según contexto

### Fundamento legal
Formato estándar: `"Manual Art. 37 num. 2; Art. 43"` o `"SIE Art. 13 Lit. 2"`

### Commits (al contribuir)
- `feat:` nuevas funcionalidades
- `fix:` correcciones
- `docs:` cambios solo en documentación
- `style:` cambios visuales sin lógica
- `refactor:` reestructuración interna
- `data:` cambios en JSON del árbol/catálogo

---

*Documentación técnica para ConciencIA v2.0*
