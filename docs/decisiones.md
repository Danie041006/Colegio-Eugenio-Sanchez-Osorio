# Decisiones de arquitectura

Este documento registra las decisiones técnicas del proyecto y su justificación. Si una decisión cambia, se agrega una nueva entrada; no se borra la anterior.

Fecha de inicio: 2026-10-20.

## ADR-001 — Stack del sistema

**Estado:** Aceptada.

**Contexto:**
El repositorio había quedado documentado con Next.js + Drizzle, pero el equipo confirmó Vite + React/TypeScript y FastAPI. Daniel tiene experiencia en FastAPI; ambos tienen base de React/TypeScript; PostgreSQL es la base acordada. El proyecto es interno, no necesita SEO ni renderizado del lado del servidor.

**Decisión:**
- Frontend: Vite + React + TypeScript estricto.
- Navegación: React Router.
- Datos remotos: TanStack Query.
- Formularios: React Hook Form + Zod.
- UI: Tailwind CSS v4 + shadcn/ui.
- Backend: FastAPI + Python 3.12+.
- Validación: Pydantic v2.
- Base de datos: PostgreSQL 16.
- ORM: SQLAlchemy 2.0.
- Migraciones: Alembic.
- Pruebas: pytest + httpx, Vitest + Testing Library, Playwright.
- Paquetes frontend: Node.js LTS + pnpm.

**Consecuencias:**
- Hay dos aplicaciones: `frontend/` y `backend/`.
- El contrato de API se define con OpenAPI.
- El frontend consume la API; no hay Server Actions ni Server Components.
- Se pueden ejecutar pruebas y despliegues independientes.
- Aumenta ligeramente la configuración inicial frente a un framework full-stack.

**Alternativas descartadas:**
- Next.js + Drizzle: válido y más simple en infraestructura, pero no aprovecha la experiencia del equipo en FastAPI y mezcla frontend/backend en un solo framework.
- Django + DRF: buen ecosistema y admin integrado, pero Daniel tendría que aprender Django y el proyecto ya tiene suficiente complejidad.
- Django + FastAPI o Next.js + FastAPI: dos backends/frameworks; descartado.

## ADR-002 — Hosting en un VPS Contabo

**Estado:** Aceptada, sujeta a compra y pruebas.

**Contexto:**
No hay VPS comprado todavía. El equipo quiere administrar la base de datos y el backend en un servidor propio. El frontend puede servirse desde el mismo VPS.

**Decisión:**
- Un VPS Contabo con Ubuntu 24.04 LTS.
- Docker Compose para frontend, backend y PostgreSQL.
- Caddy como reverse proxy y TLS automático.
- PostgreSQL sin puerto público.
- Frontend y API en el mismo origen.
- Cloudflare R2 para archivos privados y respaldos.
- Sin Vercel para el MVP.

**Consecuencias:**
- Menos plataformas y menor costo.
- Cookies, CORS y PWA más simples al compartir origen.
- El equipo asume la operación del servidor: actualizaciones, firewall, respaldos y monitoreo.
- Un solo VPS es un punto único de falla. Se mitiga con respaldos fuera del servidor y un plan de restauración.

**Pendiente:**
- Plan y región definitivos de Contabo.
- Dominio.
- Proveedor de correo para alertas.
- Decidir si los archivos van a R2 desde el inicio o si se usa MinIO temporalmente.

## ADR-003 — Frontend en el mismo origen, sin Vercel por ahora

**Estado:** Aceptada.

**Contexto:**
Vercel ofrece CDN y preview deployments, pero el sistema usa cookies de sesión, PWA y una API en el VPS. Separar el frontend agrega CORS, cookies cross-site y una plataforma más.

**Decisión:**
Servir el frontend compilado con Caddy desde el mismo dominio de la API:

```text
https://app.<dominio>/
https://app.<dominio>/api/v1/...
```

**Consecuencias:**
- Sin CORS para el frontend principal.
- Cookies `HttpOnly` más simples.
- Un solo despliegue y un solo dominio.
- Se pierden los preview deployments automáticos de Vercel.
- Si más adelante se necesita Vercel, se puede migrar usando un rewrite de `/api/*` hacia el VPS para conservar el mismo origen.

## ADR-004 — pnpm en el frontend

**Estado:** Aceptada.

**Contexto:**
El equipo quiere reducir riesgos de dependencias y mantener un entorno reproducible. npm funciona, pero pnpm ofrece una resolución más estricta y control de scripts de instalación.

**Decisión:**
- Usar Node.js LTS.
- Usar pnpm.
- Commitear `pnpm-lock.yaml`.
- Usar `pnpm install --frozen-lockfile` en CI.
- Aprobar explícitamente las dependencias que ejecutan scripts de instalación.
- No mezclar `package-lock.json` con `pnpm-lock.yaml`.

**Consecuencias:**
- Menos dependencias fantasma.
- Mejor uso de disco.
- Un paso adicional de configuración inicial.
- Hay que educar al equipo en los comandos de pnpm.

## ADR-005 — Librería de autenticación

**Estado:** Aceptada.

**Decisión:** `fastapi-users`.

**Razones:**
- Trae login, hash de contraseña, recuperación y transporte por cookies.
- Se integra con FastAPI y permite personalizar el modelo de usuario.
- Evita autenticación casera.
- Soporta cookies `HttpOnly`.

**Requisitos mínimos:**
- Cookies `HttpOnly`, `Secure` y `SameSite`.
- Hash Argon2id o bcrypt.
- Roles y permisos.
- Bloqueo por intentos fallidos.
- Recuperación de acceso administrada por el colegio.
- No usar el documento como contraseña.
- No autenticación casera.

**Pendiente de implementación:** endpoints de login, activación, cambio de PIN y recuperación en oficina.

## ADR-006 — Respaldos en Cloudflare R2

**Estado:** Aceptada.

**Contexto:**
La base de datos estará en el VPS. Los snapshots de Contabo no son suficientes como respaldo offsite.

**Decisión:**
- `pg_dump` diario como mínimo.
- Cifrado antes de subir.
- Copia a un bucket R2 privado.
- Retención de 30 diarios, 12 semanales y 12 mensuales.
- Prueba de restauración mensual.
- Alertas si el respaldo falla.
- Bucket separado para archivos y para respaldos de base de datos.

**Consecuencias:**
- RPO inicial de hasta 24 horas.
- Si el colegio necesita menor pérdida, se evalúa `pg_dump` horario o WAL archiving.
- La clave de cifrado se guarda fuera del VPS.

## ADR-007 — Comprobante imprimible y snapshot

**Estado:** Aceptada.

**Decisión:**
- El comprobante se puede imprimir desde una vista HTML.
- El backend genera un PDF descargable.
- Al confirmar el pago se guarda un snapshot de los datos del recibo.
- El PDF se genera desde el snapshot, no desde los datos actuales.
- Un recibo anulado se conserva y se marca como **ANULADO**.
- El recibo offline es provisional hasta que el servidor asigne el número definitivo.

**Consecuencias:**
- Un cambio posterior en el nombre del estudiante o del concepto no altera el recibo histórico.
- Se necesita una librería de PDF en el backend (WeasyPrint o ReportLab).
- El snapshot se guarda en `payments.receipt_snapshot` y el PDF en almacenamiento privado.

## ADR-008 — Sin descuento por hermanos

**Estado:** Aceptada.

**Decisión:**
- No existe descuento por cantidad de hermanos.
- Cada estudiante paga su propia tarifa.
- No se crea tabla de grupo familiar ni beneficios por hermanos.
- El representante puede tener varios estudiantes, pero cada uno tiene cargos independientes.

**Consecuencias:**
- Se simplifica el modelo de cargos.
- No se necesita `benefits` ni `enrollment_benefits` para hermanos.
- Si más adelante existen becas o convenios, se modelan como un módulo separado.

## ADR-009 — Módulo de docentes y notas

**Estado:** Aceptada.

**Decisiones:**
- Tres lapsos por año escolar.
- Escala de notas de 0 a 20.
- Entre 4 y 6 evaluaciones configurables por lapso.
- El administrador asigna docentes, materias y secciones.
- El docente solo ve sus asignaciones.
- El boletín se genera en PDF por estudiante y lapso.
- La nota se asocia a la matrícula.
- El boletín guarda snapshot para no alterar documentos históricos.
- Ver notas con deuda queda pendiente de confirmar con Diego.

**Consecuencias:**
- Se agrega el rol `DOCENTE`.
- Se agregan tablas de docentes, materias, asignaciones, lapsos, evaluaciones, notas y boletines.
- La ficha del estudiante se separa en información personal, académica y financiera.

## Decisiones pendientes

- Dominio definitivo.
- Plan y región de Contabo.
- Buckets y credenciales de R2.
- RPO/RTO aceptados por el colegio.
- Modelo de datos de cobros y pagos (siguiente migración).
- Política de retiro y mensualidades.
- Nota mínima aprobatoria y pesos de evaluación.
- Si las notas se bloquean por deuda.
