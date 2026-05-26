# Auditorías de ConciencIA

Esta carpeta contiene las auditorías profesionales del proyecto, ejecutadas con skills especializadas que viven en `.claude/skills/`.

## Auditoría 2026-05-26

| # | Tipo | Skill aplicada | Marco teórico | Issues | Archivo |
|---|------|----------------|---------------|--------|---------|
| 1 | **UX / Usabilidad** | `audit-ux-conciencia` | 10 heurísticas Nielsen + GOV.UK Design System | 24 (4 críticos, 8 altos, 8 medios, 4 bajos) | [2026-05-26_auditoria_ux.md](2026-05-26_auditoria_ux.md) |
| 2 | **Accesibilidad WCAG 2.2 AA** | `a11y-conciencia` | WCAG 2.2 + criterios nuevos de 2.2 + Ley 1618/2013 | 21 (7 críticos, 6 altos, 5 medios, 3 bajos) | [2026-05-26_auditoria_a11y.md](2026-05-26_auditoria_a11y.md) |
| 3 | **Tipografía** | `tipografia-legal-conciencia` | Butterick (*Practical Typography* + *Typography for Lawyers*) + Vignelli | 18 (6 críticos, 6 altos, 6 long-term) | [2026-05-26_auditoria_tipografia.md](2026-05-26_auditoria_tipografia.md) |

**Total: 63 issues identificados** con marco teórico de cada hallazgo y código sugerido para parchar.

## Top 5 hallazgos críticos compartidos entre auditorías

1. **🚨 Banner Tipo III indistinguible** del banner de validación + no se anuncia a lectores de pantalla. Riesgo jurídico real (UX-002 + A11Y-002).
2. **🚨 Pérdida total del caso** al cerrar la pestaña, sin advertencia ni autosave (UX-003).
3. **🚨 Calibri en documentos jurídicos** generados, el "default perezoso" según Butterick (TIPO-DOC-001).
4. **🚨 Sin botón "Atrás"** en el árbol — un error de respuesta obliga a reiniciar todo el caso (UX-001).
5. **🚨 Contrastes de color insuficientes** en los 3 temas — dorado 2.40:1, accent oscuro 3.53:1 (A11Y-001).

## Cómo re-ejecutar las auditorías

Cada skill es reutilizable. Para volver a auditar (después de implementar fixes):

```
# En una sesión de Claude Code con el proyecto abierto, simplemente pide:
"Ejecuta la skill audit-ux-conciencia"
"Ejecuta la skill a11y-conciencia"
"Ejecuta la skill tipografia-legal-conciencia"
```

Las skills viven versionadas en `.claude/skills/<nombre>/SKILL.md` y se aplican automáticamente.
