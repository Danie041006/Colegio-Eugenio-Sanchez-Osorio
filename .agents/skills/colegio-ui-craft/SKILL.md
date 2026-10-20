---
name: colegio-ui-craft
description: Diseña y refina interfaces para el sistema de pagos del Colegio Eugenio Sánchez Osorio con nivel de craft tipo Apple, preservando la identidad visual aprobada. Úsala cuando haya que crear una pantalla nueva, mejorar una existente, revisar jerarquía visual, tipografía, espaciado, estados, responsive o microinteracciones.
---

# Colegio UI Craft

Skill de proyecto para diseñar y refinar la interfaz del sistema de pagos del Colegio Eugenio Sánchez Osorio.

## Cuándo usarla

- Crear una pantalla nueva.
- Mejorar una pantalla existente.
- Revisar jerarquía, tipografía, espaciado, color o densidad.
- Diseñar estados vacío, cargando, error, sin conexión o pendiente de sincronizar.
- Revisar responsive en 360, 768, 1024 y 1440 px.
- Proponer microinteracciones o transiciones.
- Revisar una implementación visual antes de un PR.

## Skills de apoyo

Antes de diseñar o revisar, carga y aplica:

- `apple-design`: principios de respuesta, manipulación directa, interrumpibilidad, springs, materiales, tipografía y accesibilidad.
- `emil-design-eng`: pulido de UI, decisiones de componentes, animación y detalles invisibles.

Esta skill no reemplaza esas dos: las orquesta con las reglas del colegio.

## Principios del proyecto

1. **No rediseñar sin permiso.** La identidad visual fue aprobada. Se mejora, no se reemplaza.
2. **Blanco dominante y azul rey con intención.** No convertir todo en azul ni usar gradientes morados.
3. **Densidad útil.** Es un sistema administrativo con tablas, formularios y estados. Apple no significa espacios gigantes ni ocultar información.
4. **Jerarquía clara.** Un `h1` por página, una acción principal, el resto secundario.
5. **Feedback inmediato.** Todo botón, campo, tabla y acción debe tener estados claros.
6. **Consistencia espacial.** Los paneles, modales y menús salen y entran por el mismo camino.
7. **Tipografía con oficio.** Inter, pesos altos en títulos, tracking y leading cuidados, números legibles en tablas.
8. **Movimiento con propósito.** Nada de animaciones decorativas. Si no comunica estado, no se anima.
9. **Accesibilidad primero.** Contraste AA, foco visible, teclado, labels, botones de 44 px, `prefers-reduced-motion`.
10. **No inventar datos.** Si falta un dato del colegio, se escribe `TODO` y se avisa.

## Flujo de trabajo

### 1. Brief

Antes de tocar código, escribe:

- Pantalla o componente.
- Usuario y rol.
- Objetivo principal.
- Datos que muestra.
- Acciones disponibles.
- Estados que debe cubrir.
- Restricciones de negocio.
- Qué se conserva del diseño actual.

Si falta algo, pregunta. No inventes.

### 2. Auditoría

Revisa la pantalla actual contra:

- Jerarquía visual.
- Espaciado y alineación.
- Tipografía y legibilidad.
- Contraste y foco.
- Densidad de tablas y formularios.
- Estados vacío, cargando, error, éxito, sin conexión y pendiente de sincronizar.
- Responsive.
- Consistencia con el resto del sistema.

### 3. Propuestas

Antes de implementar, presenta **2 o 3 opciones** con diferencias reales:

- Qué cambia.
- Por qué mejora.
- Qué se conserva.
- Riesgos o tradeoffs.

No presentes tres variaciones cosméticas del mismo botón. Si no hay una decisión que tomar, implementa la mejor opción y explica por qué.

### 4. Implementación

- Reutiliza `components/ui` antes de crear algo nuevo.
- Usa los tokens de `frontend/src/styles/globals.css`.
- No agregues librerías de UI o animación sin justificarlo.
- Mantén los componentes por debajo de ~150 líneas.
- No metas lógica de negocio en la UI.
- No cambies el CSS global sin revisar el impacto en todas las pantallas.

### 5. Verificación

- 360, 768, 1024 y 1440 px.
- Teclado y foco visible.
- Contraste AA.
- Estados vacío, cargando, error y éxito.
- Sin errores de consola.
- Captura antes/después si el cambio es visual.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`.

### 6. Entrega

El PR debe incluir:

- Qué cambió.
- Por qué.
- Capturas o descripción visual.
- Cómo probarlo.
- Qué no se tocó.
- TODOs pendientes.

## Craft tipo Apple, aplicado al colegio

- **Respuesta:** feedback en `:active`, no solo al hacer clic.
- **Jerarquía:** una acción principal por pantalla; el resto, secundario.
- **Espacio:** más aire entre secciones, no dentro de cada celda.
- **Tipografía:** títulos con peso alto, cuerpo legible, metadatos con moderación.
- **Materiales:** usar translucidez solo si aporta jerarquía; no abusar del glassmorphism.
- **Movimiento:** transiciones cortas, interrumpibles, con propósito; respetar `prefers-reduced-motion`.
- **Estados:** un botón deshabilitado, una tabla vacía y un error deben verse intencionales, no rotos.
- **Detalle:** alinear números, cuidar el ancho de columnas, evitar saltos de layout, mantener foco y selección.

## Qué evitar

- Copiar iOS literalmente en un panel administrativo.
- Llenar la pantalla de vidrio, blur y sombras.
- Animaciones en cascada para todo.
- Cambiar la paleta aprobada.
- Inventar cifras, fechas o estudiantes.
- Usar fotos de menores generadas con IA.
- Agregar dependencias sin aprobación.
- Rediseñar el login o el menú sin hablarlo.

## Plantilla de invocación

```text
Usa la skill colegio-ui-craft.

Pantalla: [nombre]
Rol: [administrador / gestor / representante]
Objetivo: [qué debe lograr]
Datos: [qué muestra]
Acciones: [qué puede hacer]
Estados: [vacío, cargando, error, sin conexión, etc.]
Restricciones: [qué no se puede cambiar]
Quiero: [auditoría / propuestas / implementación / revisión]
```

## Respuesta inicial

Cuando se invoque sin un brief completo, responde:

> Listo. Vamos a cuidar esta interfaz sin cambiar la identidad del colegio. Mándame pantalla, rol, objetivo, datos, acciones y estados; si falta algo, lo dejo como TODO y lo pregunto.
