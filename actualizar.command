#!/bin/bash
# ========================================================
#  CONCIENCIA - Script de actualización a GitHub
#  Doble click para subir cambios al repositorio
#  https://github.com/alguarito/Conciencia-
# ========================================================

# Ir al directorio donde está este script (importante para doble-click)
cd "$(dirname "$0")" || exit 1

# Colores para mejor lectura en Terminal
ROJO='\033[0;31m'
VERDE='\033[0;32m'
AMARILLO='\033[1;33m'
AZUL='\033[0;34m'
NEGRITA='\033[1m'
RESET='\033[0m'

clear
echo ""
echo -e "${AZUL}════════════════════════════════════════════════════════${RESET}"
echo -e "${NEGRITA}  ConciencIA · Actualización a GitHub${RESET}"
echo -e "${AZUL}════════════════════════════════════════════════════════${RESET}"
echo ""

# Verificar que estamos en un repo git
if [ ! -d ".git" ]; then
    echo -e "${ROJO}✗ Error: esta carpeta no es un repositorio git.${RESET}"
    echo "  Esperaba encontrar la carpeta .git aquí."
    echo ""
    read -p "Presione Enter para cerrar..."
    exit 1
fi

# Verificar autenticación con GitHub
if ! gh auth status >/dev/null 2>&1; then
    echo -e "${ROJO}✗ Error: no está autenticado con GitHub.${RESET}"
    echo "  Ejecute en Terminal: gh auth login"
    echo ""
    read -p "Presione Enter para cerrar..."
    exit 1
fi

# Traer últimos cambios del remoto (por si trabajó alguien más)
echo -e "${AZUL}→${RESET} Sincronizando con GitHub..."
git fetch origin main >/dev/null 2>&1

# Detectar si el remoto tiene commits que el local no tiene
COMMITS_DETRAS=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "0")
if [ "$COMMITS_DETRAS" -gt 0 ]; then
    echo -e "${AMARILLO}⚠️  Hay $COMMITS_DETRAS cambio(s) en GitHub que no tiene localmente.${RESET}"
    echo "   Esto puede pasar si alguien subió archivos desde la web."
    echo ""
    read -p "¿Bajar esos cambios primero? (s/n) " respuesta
    if [[ "$respuesta" =~ ^[sSyY] ]]; then
        if git pull --rebase origin main; then
            echo -e "${VERDE}✓ Sincronizado con éxito.${RESET}"
        else
            echo -e "${ROJO}✗ Hubo un conflicto al sincronizar.${RESET}"
            echo "  Resuélvalo manualmente o pida ayuda técnica."
            read -p "Presione Enter para cerrar..."
            exit 1
        fi
    fi
    echo ""
fi

# Verificar si hay cambios para subir
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo -e "${VERDE}✓ Todo está sincronizado. No hay cambios para subir.${RESET}"
    echo ""
    read -p "Presione Enter para cerrar..."
    exit 0
fi

# Mostrar resumen de cambios
echo -e "${NEGRITA}Cambios detectados:${RESET}"
echo "────────────────────────────────────────────────────────"
git -c color.status=always status --short
echo "────────────────────────────────────────────────────────"
echo ""
echo "  M = modificado · A = nuevo · D = borrado · ?? = sin rastrear"
echo ""

# Pedir mensaje de commit
echo -e "${NEGRITA}Describa brevemente qué cambió.${RESET}"
echo "  Ejemplos:"
echo "    - Corrige texto del Art. 39 num. 5"
echo "    - Añade nuevo formato de citación"
echo "    - Actualiza fundamento legal Tipo III"
echo ""
echo "  (Presione Enter sin escribir nada para mensaje automático)"
echo ""
read -p "→ Mensaje: " mensaje

if [ -z "$mensaje" ]; then
    mensaje="Actualización del $(date '+%Y-%m-%d a las %H:%M')"
fi

# Confirmar antes de subir
echo ""
echo -e "${AMARILLO}Se subirá con el mensaje:${RESET}"
echo "  \"$mensaje\""
echo ""
read -p "¿Confirma subir a GitHub? (s/n) " confirma
if [[ ! "$confirma" =~ ^[sSyY] ]]; then
    echo ""
    echo -e "${AMARILLO}✗ Cancelado por el usuario.${RESET}"
    echo "  No se subió nada. Puede volver a ejecutar este script cuando quiera."
    echo ""
    read -p "Presione Enter para cerrar..."
    exit 0
fi

# Hacer el commit y push
echo ""
echo -e "${AZUL}→${RESET} Agregando archivos..."
git add -A

echo -e "${AZUL}→${RESET} Creando commit..."
if ! git commit -m "$mensaje"; then
    echo -e "${ROJO}✗ Error al crear el commit.${RESET}"
    read -p "Presione Enter para cerrar..."
    exit 1
fi

echo -e "${AZUL}→${RESET} Subiendo a GitHub..."
if git push origin main; then
    echo ""
    echo -e "${VERDE}════════════════════════════════════════════════════════${RESET}"
    echo -e "${VERDE}  ✅ ¡Cambios subidos exitosamente!${RESET}"
    echo -e "${VERDE}════════════════════════════════════════════════════════${RESET}"
    echo ""
    echo "  Ver en: https://github.com/alguarito/Conciencia-"
    echo ""
else
    echo ""
    echo -e "${ROJO}════════════════════════════════════════════════════════${RESET}"
    echo -e "${ROJO}  ✗ Hubo un error subiendo los cambios.${RESET}"
    echo -e "${ROJO}════════════════════════════════════════════════════════${RESET}"
    echo ""
    echo "  Revise el mensaje arriba para más detalles."
    echo "  Sus cambios están guardados localmente (commit creado)."
    echo "  Puede intentar de nuevo más tarde."
    echo ""
fi

read -p "Presione Enter para cerrar..."
