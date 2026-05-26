# Cómo contribuir a ConciencIA

¡Gracias por su interés en contribuir a **ConciencIA**! Este es un proyecto educativo colaborativo de la I.E. Sor María Juliana, y agradecemos las contribuciones de docentes, coordinadores, desarrolladores y la comunidad educativa en general.

## 🌟 Formas de contribuir

### Para docentes y directivos (sin conocimientos técnicos)

1. **Reportar errores** o casos que no fueron bien clasificados
   - Abra un [Issue](../../issues/new) describiendo el caso
   - Indique qué esperaba que sucediera vs qué sucedió
   - Anonimice los datos del estudiante

2. **Sugerir mejoras a los textos** de los documentos
   - Si un formato Word/PDF tiene errores ortográficos o de fondo, repórtelo
   - Si un fundamento legal cambió, indíquelo con la nueva referencia

3. **Proponer nuevos protocolos** que no estén cubiertos
   - Indique en qué artículo del Manual o SIE se basa
   - Describa los pasos esperados

### Para colaboradores técnicos

1. **Mejorar el código** (bugs, accesibilidad, performance)
2. **Añadir/corregir plantillas** de documentos
3. **Actualizar protocolos** en el árbol de decisiones
4. **Traducir** a otras variantes regionales del español

## 🔄 Proceso de contribución técnica

### 1. Fork del repositorio
```bash
git clone https://github.com/[su-usuario]/ConciencIA.git
cd ConciencIA
```

### 2. Estructura modular del código

```
ConciencIA/
├── index.html              # Aplicación completa (HTML + CSS + JS)
├── data/                   # JSONs del árbol (referencia, no se cargan dinámicamente)
│   ├── 01_metadata.json    # Configuración, institución, fundamento legal
│   ├── 02_arbol_principal.json  # 60 nodos: preguntas, alertas, clasificaciones, protocolos
│   └── 03_catalogo_documentos.json  # 124 plantillas con campos
```

⚠️ **Importante**: los JSON dentro de `data/` son **referencia**. Los datos reales están embebidos en `index.html` como constantes JS. Si modifica los JSON, debe regenerar el HTML.

### 3. Modificar el árbol o agregar documentos

#### Para añadir un nuevo protocolo:

1. Edite `data/02_arbol_principal.json`
2. Añada un nuevo nodo con `tipo: "protocolo"` siguiendo el esquema de los existentes
3. Incluya en `pasos` todos los pasos verificables con `numero`, `titulo`, `responsable`, `plazo_dias`, `documentos_generar`, `obligatorio`, `urgencia`, `fundamento`

#### Para añadir un nuevo documento:

1. Edite `data/03_catalogo_documentos.json`
2. Añada bajo `catalogo_documentos` con esquema:
   ```json
   "doc_nuevo": {
     "id": "doc_nuevo",
     "nombre": "Nombre del Documento",
     "categoria": "categoria",
     "fundamento": "Manual Art. X num. Y",
     "campos": [
       {"id": "campo1", "tipo": "texto", "etiqueta": "Etiqueta", "obligatorio": true}
     ]
   }
   ```
3. Tipos de campo válidos: `texto`, `textarea`, `fecha`, `hora`, `datetime`, `numero`, `email`, `select` (con `opciones`), `boolean`, `firma`, `firmas_multiples`

### 4. Regenerar el HTML

Después de modificar los JSON, hay un script que los embebe en el HTML. Próximamente publicaremos una herramienta automatizada para esto. Por ahora, los datos se actualizan manualmente.

### 5. Probar localmente

1. Abra `index.html` en su navegador
2. Pruebe el flujo completo: iniciar caso → llegar al protocolo → llenar documentos → descargar Word y PDF
3. Verifique que la PWA se instala (revise consola del navegador)

### 6. Pull Request

1. Cree una rama: `git checkout -b feature/descripcion-corta`
2. Commit con mensajes descriptivos en español: `git commit -m "Añade protocolo de XYZ del SIE Art. N"`
3. Push a su fork: `git push origin feature/descripcion-corta`
4. Abra un Pull Request describiendo qué cambió y por qué

## 📋 Convenciones del proyecto

### Código
- Sin frameworks ni dependencias salvo `docx.js` y `FileSaver.js` (vía CDN)
- HTML, CSS y JS en un solo archivo `index.html`
- Variables CSS semánticas en `:root` (ver `--bg-app`, `--text`, `--accent`...)
- Funciones JavaScript en español o inglés, consistente con el contexto

### Idioma
- Toda interfaz, mensajes y documentación en **español de Colombia**
- Términos jurídicos según el Código Civil y normas educativas colombianas
- Fechas en formato "5 de mayo de 2026" (no "May 5, 2026")

### Diseño visual
- Tres temas: editorial (default), moderno claro, moderno oscuro
- Identidad institucional: vino tinto `#6B1820`, dorado `#B89968`
- Documentos generados (Word/PDF): siempre con estética editorial (no cambia con el tema activo)

## 🛡️ Código de conducta

Esperamos que todas las interacciones sean:
- **Respetuosas** — con docentes, estudiantes, familias y otros colaboradores
- **Constructivas** — críticas centradas en la mejora, no en personas
- **Inclusivas** — sin discriminación por género, etnia, religión, etc.
- **Confidenciales** — nunca compartir datos reales de casos al reportar errores

## 📜 Licencia de las contribuciones

Al contribuir, acepta que su trabajo se licencie bajo **CC BY-NC-SA 4.0** (misma del proyecto). Conserva la autoría intelectual de su aporte.

## 🙏 Agradecimientos

Toda contribución, por pequeña que sea, ayuda a mejorar la herramienta para la comunidad educativa. Los contribuidores aparecerán en la sección de créditos del proyecto.

---

**¿Dudas?** Abra una [Discusión](../../discussions) o escriba a iesormariajuliana@gmail.com
