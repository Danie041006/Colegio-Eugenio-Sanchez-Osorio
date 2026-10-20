# Frontend — Colegio Eugenio Sánchez Osorio

Prototipo modular de la interfaz aprobada en Figma. Conserva el diseño visual y el CSS original; el código está separado por componentes y pantallas para evitar archivos gigantes.

## Stack

- Vite + React 19 + TypeScript estricto.
- React Router.
- Tailwind CSS v4.
- pnpm.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

## Estructura

```text
src/
  app/            # composición, rutas y navegación
  components/
    app/          # sidebar, topbar, menú móvil
    ui/           # botones, campos, cards, badges, tablas
  features/       # pantallas por dominio
  styles/         # tokens y estilos visuales aprobados
```

## Nota de diseño

`src/styles/globals.css` se conserva como base visual del prototipo aprobado. No cambiar valores, jerarquía ni estructura visual sin revisión de diseño.

Este frontend todavía usa datos de ejemplo y controles de prototipo (cambio de rol y selector de rol en login). Se reemplazarán cuando se conecte la autenticación y la API real.
