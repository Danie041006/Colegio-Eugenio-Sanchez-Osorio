# AGENTS.md — Reglas de implementación

Estas reglas aplican a cualquier agente (OpenCode, Claude Code, Cursor, etc.) que trabaje en este repositorio.

## Antes de escribir código

1. Leer `README.md` completo. Es la fuente de verdad del producto.
2. El modelo de datos lo define Daniel por separado. No crear ni modificar tablas, SQL ni esquemas sin confirmación.
3. Si falta un dato del colegio (fechas, tarifas, teléfonos, grados, secciones), escribir `TODO` visible y listarlo al final. **No inventarlo.**
4. Si una ambigüedad afecta el modelo de datos, la seguridad o los pagos, preguntar antes de implementar.
5. No agregar dependencias sin justificarlas y pedir confirmación.

## Qué es este proyecto

Sistema interno de gestión de pagos para el Colegio Eugenio Sánchez Osorio. **No es una landing page.** Tiene login, roles, panel administrativo, registro de estudiantes, cargos, pagos, abonos, comprobantes, reportes y portal de representantes. Debe funcionar sin internet al menos para registrar pagos y sincronizar después.

## Stack

- Next.js con App Router y TypeScript estricto.
- Tailwind CSS v4.
- `shadcn/ui` para componentes base.
- `react-hook-form` + Zod para formularios.
- PostgreSQL + Drizzle ORM.
- Auth.js o Supabase Auth. Nunca autenticación casera.
- Almacenamiento privado para fotos y comprobantes, con URLs firmadas.
- PWA + IndexedDB para la cola offline.
- Sin librerías de UI adicionales sin justificar.

## Roles y permisos

| Rol | Permisos |
|---|---|
| `ADMINISTRADOR` | Todo: usuarios, tarifas, pagos, anulaciones, reportes, configuración |
| `GESTOR` | Registrar estudiantes, registrar pagos, consultar estados de pago, solicitar anulaciones |
| `REPRESENTANTE` | Ver solo sus estudiantes autorizados, historial, saldos y comprobantes |

Reglas:

- El backend valida permisos en cada endpoint. No confiar solo en la UI.
- El representante nunca accede a estudiantes que no tenga asociados.
- Solo el administrador autoriza anulaciones de pagos confirmados.
- El gestor no puede modificar pagos históricos ni tarifas.

## Contrato de datos

- Dinero: `numeric(14,2)` o enteros en centavos. **Nunca `float`.**
- Cada cargo, tarifa y pago tiene `currency_id`. Al inicio solo COP está activa.
- Un cargo guarda `original_amount`; el saldo se calcula con las aplicaciones.
- Un pago puede cubrir varios cargos (tabla `payment_applications`).
- Un cargo puede pagarse con varios abonos.
- La suma aplicada a un pago no puede superar el monto recibido.
- La suma aplicada a un cargo no puede superar su importe original.
- Pago y cargo deben usar la misma moneda para aplicarse directamente.
- Pagos confirmados no se borran: se anulan con motivo, responsables y fecha.
- El comprobante tiene número único. En offline puede ser provisional.
- No hay vencimiento obligatorio ni mora en la primera versión.
- Las tarifas tienen vigencia y no se modifican retroactivamente.
- Los grados, secciones y períodos conservan historial: no se sobrescriben.

## Contrato de seguridad

- Contraseñas con hash seguro (Argon2 o bcrypt). Nunca en texto.
- **No usar el número de documento como contraseña.** Se puede usar como nombre de usuario, pero la contraseña inicial debe ser temporal y aleatoria.
- Los datos de menores son sensibles: permisos mínimos, cifrado en tránsito, respaldos protegidos.
- Fotos de estudiantes en almacenamiento privado con URLs firmadas y expiración.
- Registrar auditoría de toda operación financiera: quién, qué, cuándo y por qué.
- No guardar contraseñas, tokens ni datos sensibles en la auditoría.
- La baja de un usuario no elimina registros financieros históricos.
- Validar y sanitizar toda entrada. Proteger contra inyección SQL, XSS y CSRF.

## Contrato de funcionamiento offline

- La app debe cargar y permitir registrar pagos sin conexión.
- Cada operación lleva un `operation_id` único generado en el cliente.
- El servidor debe ser idempotente: la misma operación no se procesa dos veces.
- Los pagos creados offline se marcan `PENDING_SYNC`.
- El comprobante offline se marca como **provisional**.
- La numeración definitiva de recibos se asigna en el servidor.
- Los pagos confirmados no se reemplazan por una versión local más reciente sin validar.
- La app debe indicar claramente qué está pendiente de sincronizar.

## Contrato de interfaz

- Blanco dominante y azul rey; el azul rey se usa con intención.
- Tokens en `app/globals.css`. **Nunca HEX sueltos en componentes.**
- Colores: `royal #1B3A8F`, `royal-dark #122A6B`, `navy #0F172A`, `muted #5A6475`, `white #FFFFFF`, `mist #F4F7FC`, `sky #DCE6F7`, `sky-strong #B9CCEE`.
- Tipografía Inter. Títulos con peso alto; datos en tablas legibles.
- Patrones: menú lateral, encabezado con título y acción principal, tablas con filtros, formularios en tarjetas, badges de estado, modales para confirmaciones.
- Estados obligatorios: vacío, cargando, error, éxito, sin conexión, pendiente de sincronizar.
- Un `h1` por página y una acción principal por pantalla.
- Mobile-first; probar 360, 768, 1024 y 1440 px.
- Contraste AA, foco visible, navegación con teclado, labels visibles, botones de 44 px.
- Sin gradientes morados, glassmorphism, carruseles automáticos ni animaciones decorativas.

## Convenciones de código

- TypeScript estricto; prohibido `any` implícito.
- Server Components por defecto. `"use client"` solo para interactividad real.
- Componentes en PascalCase, archivos en kebab-case, props tipadas.
- Clases Tailwind con `cn()`; variantes con `cva` cuando haya más de dos.
- Lógica de negocio en `lib/` o `services/`, no dentro de los componentes.
- Validaciones compartidas entre cliente y servidor con Zod.
- Sin `console.log` en producción.
- Sin componentes de más de ~150 líneas: dividir.
- Reutilizar primitivas de `components/ui` antes de crear nuevas.

## Estructura objetivo

```text
app/
  (auth)/login/page.tsx
  (app)/
    dashboard/page.tsx
    estudiantes/
    estudiantes/[id]/page.tsx
    pagos/nuevo/page.tsx
    comprobantes/[id]/page.tsx
    cobros/page.tsx
    reportes/page.tsx
    usuarios/page.tsx
    anulaciones/page.tsx
  (portal)/
    mis-hijos/page.tsx
    mis-hijos/[id]/page.tsx
components/
  ui/
  app/
  portal/
content/
  site.ts
db/
  schema.ts
  seed.ts
lib/
  auth.ts
  permissions.ts
  money.ts
  offline/
services/
  payments.ts
  charges.ts
  receipts.ts
```

## Comandos

Cuando el proyecto esté inicializado:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:push
npm run db:seed
```

Si un comando no existe, no lo inventes: agrégalo al `package.json` o pregunta.

## Definition of Done

- [ ] El cambio respeta roles y permisos.
- [ ] Los montos usan tipo decimal y moneda explícita.
- [ ] No se borran registros financieros.
- [ ] Se registra auditoría cuando aplica.
- [ ] Formularios con validación cliente y servidor.
- [ ] Estados vacío, cargando, error y éxito implementados.
- [ ] Responsive verificado en 360, 768, 1024 y 1440.
- [ ] Teclado, foco visible y contraste AA.
- [ ] Sin errores de consola ni de hidratación.
- [ ] `npm run build`, `lint` y `typecheck` pasan.
- [ ] Datos faltantes marcados como `TODO` y listados.

## Prohibiciones

- Inventar datos, tarifas, fechas, cifras o testimonios.
- Generar imágenes de niños con IA.
- Usar contraseñas en texto o el documento como contraseña.
- Borrar físicamente pagos, cargos o estudiantes con historial financiero.
- Mezclar monedas sin una regla explícita de conversión.
- Exponer fotos de menores con URLs públicas permanentes.
- Gradientes morados, glassmorphism, neón o emojis como iconos.
- Copiar plantillas sin adaptarlas al flujo del colegio.
- Hacer `force push` o reescribir historia sin confirmación.
