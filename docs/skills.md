# Skills del proyecto

Skills instaladas para mejorar el trabajo de diseño y desarrollo. No son dependencias del frontend; son instrucciones especializadas para el agente.

## Diseño de interfaces

### `colegio-ui-craft`

Skill propia del proyecto. Orquesta el diseño y la revisión visual con las reglas del colegio.

Úsala cuando haya que:

- Crear una pantalla.
- Mejorar una existente.
- Revisar jerarquía, tipografía, espaciado o estados.
- Proponer microinteracciones.
- Revisar responsive y accesibilidad.

### `apple-design`

Principios de Apple para interfaces web: respuesta inmediata, manipulación directa, interrumpibilidad, springs, materiales, tipografía, movimiento y accesibilidad.

Úsala para:

- Entender por qué una interacción se siente lenta o rígida.
- Diseñar sheets, menús, drawers, transiciones y gestos.
- Mejorar la sensación física de la interfaz.
- Revisar `prefers-reduced-motion` y materiales.

### `emil-design-eng`

Filosofía de pulido de UI y componentes de Emil Kowalski: detalles invisibles, decisiones de interacción, animación y craft.

Úsala para:

- Revisar componentes antes de un PR.
- Mejorar la sensación de botones, menús, formularios y tablas.
- Detectar animaciones innecesarias.
- Elevar el nivel de detalle sin cambiar la identidad visual.

## Cómo las usa la diseñadora

La persona de diseño puede pedirle al agente:

```text
Usa la skill colegio-ui-craft.

Pantalla: Registrar pago
Rol: Gestor
Objetivo: registrar un pago parcial y aplicarlo a dos cargos
Datos: estudiante, cargos pendientes, monto, método, cuenta
Acciones: buscar, seleccionar cargos, aplicar, confirmar
Estados: vacío, cargando, error, sin conexión, pendiente de sincronizar
Restricciones: conservar el diseño aprobado y el azul rey
Quiero: una auditoría y dos propuestas antes de implementar
```

El agente debe:

1. Leer el brief.
2. Revisar la pantalla actual.
3. Presentar propuestas.
4. Implementar solo lo aprobado.
5. Verificar responsive, accesibilidad y estados.
6. Entregar capturas y un resumen.

## Reglas importantes

- No rediseñar sin aprobación.
- No cambiar la paleta aprobada.
- No agregar librerías de UI o animación sin justificar.
- No inventar datos.
- No usar fotos de menores generadas con IA.
- No cambiar `frontend/src/styles/globals.css` sin revisar el impacto global.
- Mantener el sistema administrativo denso y legible; no convertirlo en una app de consumo.

## Instalación

Las skills externas están registradas en `skills-lock.json` y copiadas en `.agents/skills/`.

Para restaurarlas en otra máquina:

```bash
npx skills experimental_install
```

O instalarlas manualmente:

```bash
npx skills add emilkowalski/skills --skill apple-design -a opencode -y
npx skills add emilkowalski/skills --skill emil-design-eng -a opencode -y
```

La skill propia del proyecto vive en:

```text
.agents/skills/colegio-ui-craft/SKILL.md
```

## Referencias

- https://skills.sh/emilkowalski/skills/apple-design
- https://skills.sh/emilkowalski/skills/emil-design-eng
