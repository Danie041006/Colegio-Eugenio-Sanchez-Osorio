# AGENTS.md — Reglas de implementación

Estas reglas aplican a cualquier agente (OpenCode, Claude Code, Cursor, etc.) que trabaje en este repositorio.

## Antes de escribir código

1. Leer `README.md` completo. Es la fuente de verdad del producto.
2. El modelo de datos lo define Daniel por separado. No crear ni modificar tablas, SQL ni esquemas sin confirmación.
3. Si falta un dato del colegio (fechas, tarifas, teléfonos, grados, secciones), escribir `TODO` visible y listarlo al final. **No inventarlo.**
4. Si una ambigüedad afecta el modelo de datos, la seguridad o los pagos, preguntar antes de implementar.
5. No agregar dependencias sin justificarlas y pedir confirmación.
6. Leer `docs/decisiones.md`, `docs/infraestructura.md` y `docs/plan-mvp.md` antes de proponer cambios de arquitectura.
7. No cambiar el stack ni la infraestructura sin una nueva decisión registrada en `docs/decisiones.md`.

## Qué es este proyecto

Sistema interno de gestión de pagos para el Colegio Eugenio Sánchez Osorio. **No es una landing page.** Tiene login, roles, panel administrativo, registro de estudiantes, cargos, pagos, abonos, comprobantes, reportes y portal de representantes. Debe funcionar sin internet al menos para registrar pagos y sincronizar después.

## Stack

### Frontend

- Node.js LTS + pnpm.
- Vite + React + TypeScript estricto.
- React Router para navegación.
- TanStack Query para datos remotos.
- Tailwind CSS v4.
- `shadcn/ui` para componentes base.
- `react-hook-form` + Zod para formularios.
- PWA + IndexedDB para la cola offline.
- Sin librerías de UI adicionales sin justificar.

### Backend

- FastAPI + Python 3.12+.
- Pydantic v2 para validación y contratos.
- SQLAlchemy 2.0 con tipado.
- Alembic para migraciones.
- PostgreSQL 16.
- pytest + httpx para pruebas.
- Ruff para lint y formato.

### Autenticación

- `fastapi-users`, Authlib u otra librería consolidada. **Nunca autenticación casera.**
- Cookies `HttpOnly`, `Secure` y `SameSite`.
- Hash de contraseñas con Argon2id o bcrypt.
- Roles y permisos validados en el backend en cada endpoint.
- Rate limiting en login y bloqueo temporal por intentos fallidos.

### Archivos y documentos

- Fotos y comprobantes en almacenamiento S3-compatible privado (Cloudflare R2 o similar).
- URLs firmadas con expiración.
- PDF de comprobantes generado en el backend y guardado como snapshot inmutable cuando aplique.

### Infraestructura

- Un VPS Contabo con Ubuntu 24.04 LTS.
- Docker Compose para frontend, backend y PostgreSQL.
- Caddy como reverse proxy y TLS automático.
- Frontend y API en el mismo origen: `app.<dominio>` y `/api/*`.
- PostgreSQL sin puerto público.
- Respaldos cifrados diarios en Cloudflare R2.
- Sin Vercel para el MVP, salvo una decisión posterior registrada.

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
- Las fechas de negocio se interpretan en `America/Caracas`; en base de datos se guardan timestamps en UTC.
- Todo cambio de esquema va por migración de Alembic; no se edita la base de producción a mano.

## Contrato de seguridad

- Contraseñas con hash seguro (Argon2id o bcrypt). Nunca en texto.
- **No usar el número de documento como contraseña.** Se puede usar como nombre de usuario, pero la contraseña inicial debe ser temporal y aleatoria.
- Los datos de menores son sensibles: permisos mínimos, cifrado en tránsito, respaldos protegidos.
- Fotos de estudiantes en almacenamiento privado con URLs firmadas y expiración.
- Registrar auditoría de toda operación financiera: quién, qué, cuándo y por qué.
- No guardar contraseñas, tokens ni datos sensibles en la auditoría.
- La baja de un usuario no elimina registros financieros históricos.
- Validar y sanitizar toda entrada. Proteger contra inyección SQL, XSS y CSRF.
- No guardar tokens de sesión en `localStorage`.
- No exponer PostgreSQL ni el almacenamiento de archivos a internet.
- Secretos en variables de entorno o Docker secrets; nunca en Git.

## Contrato de funcionamiento offline

- La app debe cargar y permitir registrar pagos sin conexión.
- Cada operación lleva un `operation_id` único generado en el cliente.
- El servidor debe ser idempotente: la misma operación no se procesa dos veces.
- Los pagos creados offline se marcan `PENDING_SYNC`.
- El comprobante offline se marca como **provisional**.
- La numeración definitiva de recibos se asigna en el servidor.
- Los pagos confirmados no se reemplazan por una versión local más reciente sin validar.
- La app debe indicar claramente qué está pendiente de sincronizar.
- El modo offline solo está disponible para usuarios que ya iniciaron sesión previamente en el dispositivo.
- Los datos cacheados se limitan a lo necesario para operar y se limpian al cerrar sesión cuando sea posible.

## Contrato de interfaz

- Blanco dominante y azul rey; el azul rey se usa con intención.
- Tokens en `frontend/src/styles/globals.css`. **Nunca HEX sueltos en componentes.**
- Colores: `royal #1B3A8F`, `royal-dark #122A6B`, `navy #0F172A`, `muted #5A6475`, `white #FFFFFF`, `mist #F4F7FC`, `sky #DCE6F7`, `sky-strong #B9CCEE`.
- Tipografía Inter. Títulos con peso alto; datos en tablas legibles.
- Patrones: menú lateral, encabezado con título y acción principal, tablas con filtros, formularios en tarjetas, badges de estado, modales para confirmaciones.
- Estados obligatorios: vacío, cargando, error, éxito, sin conexión, pendiente de sincronizar.
- Un `h1` por página y una acción principal por pantalla.
- Mobile-first; probar 360, 768, 1024 y 1440 px.
- Contraste AA, foco visible, navegación con teclado, labels visibles, botones de 44 px.
- Sin gradientes morados, glassmorphism, carruseles automáticos ni animaciones decorativas.

## Convenciones de código

### Frontend

- TypeScript estricto; prohibido `any` implícito.
- Componentes funcionales; sin lógica de negocio dentro de la UI.
- Componentes en PascalCase, archivos en kebab-case, props tipadas.
- Clases Tailwind con `cn()`; variantes con `cva` cuando haya más de dos.
- Formularios con `react-hook-form` + Zod.
- Datos remotos con TanStack Query; no hacer `fetch` suelto en componentes.
- Sin `console.log` en producción.
- Sin componentes de más de ~150 líneas: dividir.
- Reutilizar primitivas de `components/ui` antes de crear nuevas.

### Backend

- Python 3.12+, type hints en funciones públicas.
- Ruff para lint y formato.
- Routers delgados; reglas de negocio en `app/modules/<modulo>/service.py`.
- Esquemas Pydantic separados de los modelos SQLAlchemy.
- SQLAlchemy 2.0 con sesiones y transacciones explícitas.
- Dinero con `Decimal`/`Numeric`, nunca `float`.
- No SQL crudo salvo justificación y con parámetros.
- Pruebas con pytest para reglas de dinero, permisos e idempotencia.
- No exponer modelos internos directamente en la API.

### API y contrato

- Prefijo `/api/v1`.
- OpenAPI generado por FastAPI como contrato.
- Cliente TypeScript generado desde OpenAPI o tipos mantenidos manualmente y revisados.
- Zod en frontend y Pydantic en backend deben representar el mismo contrato.
- Errores con formato consistente y códigos HTTP correctos.

## Estructura objetivo

```text
backend/
  app/
    main.py
    core/
      config.py
      database.py
      security.py
      dependencies.py
    modules/
      auth/
      people/
      academic/
      billing/
      payments/
      reports/
      audit/
    tests/
  alembic/
    versions/
  pyproject.toml
  Dockerfile
frontend/
  src/
    app/
      router.tsx
      providers.tsx
    features/
      auth/
      students/
      enrollment/
      billing/
      payments/
      reports/
    components/
      ui/
      app/
      portal/
    lib/
      api/
      auth/
      permissions/
      money/
      offline/
    styles/
      globals.css
    main.tsx
  package.json
  vite.config.ts
docs/
  decisiones.md
  infraestructura.md
  plan-mvp.md
  modelo-datos-mvp.md
infra/
  docker-compose.yml
  Caddyfile
  scripts/
```

## Comandos

Cuando el proyecto esté inicializado:

```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
alembic upgrade head
pytest

# Frontend
cd frontend
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck

# Infraestructura local
docker compose up -d
```

Si un comando no existe, no lo inventes: agrégalo al `package.json`, al `Makefile` o pregunta.

## Definition of Done

- [ ] El cambio respeta roles y permisos.
- [ ] Los montos usan tipo decimal y moneda explícita.
- [ ] No se borran registros financieros.
- [ ] Se registra auditoría cuando aplica.
- [ ] Formularios con validación cliente y servidor.
- [ ] Estados vacío, cargando, error y éxito implementados.
- [ ] Responsive verificado en 360, 768, 1024 y 1440.
- [ ] Teclado, foco visible y contraste AA.
- [ ] Sin errores de consola ni warnings de React.
- [ ] `pytest` pasa en backend.
- [ ] `pnpm build`, `pnpm lint` y `pnpm typecheck` pasan en frontend.
- [ ] La migración de Alembic fue revisada y probada.
- [ ] El contrato de API quedó actualizado.
- [ ] Datos faltantes marcados como `TODO` y listados.

## Prohibiciones

- Inventar datos, tarifas, fechas, cifras o testimonios.
- Generar imágenes de niños con IA.
- Usar contraseñas en texto o el documento como contraseña.
- Borrar físicamente pagos, cargos o estudiantes con historial financiero.
- Mezclar monedas sin una regla explícita de conversión.
- Exponer fotos de menores con URLs públicas permanentes.
- Usar `float` para dinero.
- Exponer PostgreSQL a internet.
- Introducir Next.js, Drizzle, Django o un segundo backend/ORM en este repositorio.
- Gradientes morados, glassmorphism, neón o emojis como iconos.
- Copiar plantillas sin adaptarlas al flujo del colegio.
- Hacer `force push` o reescribir historia sin confirmación.
