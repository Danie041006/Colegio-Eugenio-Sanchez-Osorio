# Plan del MVP

## Objetivo

Construir un sistema interno de gestión de pagos para el Colegio Eugenio Sánchez Osorio, usable por administrador, gestor y representantes, con registro de estudiantes, matrícula, cargos, pagos, abonos, comprobantes, libro de entradas, anulaciones y auditoría.

El MVP debe funcionar en un VPS, ser responsive y permitir registrar pagos sin internet para sincronizarlos después.

## Alcance del MVP

Incluye:

1. Login con roles.
2. Estudiantes, representantes y foto.
3. Grados, secciones y períodos.
4. Matrícula.
5. Conceptos de cobro y tarifas.
6. Cargos y saldos.
7. Pagos completos y abonos.
8. Aplicación de pagos a cargos.
9. Comprobante con numeración.
10. Portal del representante.
11. Libro de entradas.
12. Anulación con aprobación.
13. Auditoría.
14. Responsive.
15. Offline para registrar pagos.

No incluye:

- Conversión de monedas.
- Mora o intereses.
- Facturación electrónica.
- Pagos con tarjeta.
- Notas, boletines o asistencia.
- App nativa.
- Reconocimiento facial.
- Sincronización multi-dispositivo en tiempo real.

## Stack

- Frontend: Vite + React + TypeScript + React Router + TanStack Query + Tailwind v4 + shadcn/ui.
- Formularios: React Hook Form + Zod.
- Backend: FastAPI + Pydantic v2 + SQLAlchemy 2.0 + Alembic.
- Base de datos: PostgreSQL 16.
- Paquetes frontend: pnpm + Node.js LTS.
- Autenticación: librería consolidada; pendiente de elección.
- Archivos: Cloudflare R2 privado.
- Offline: PWA + IndexedDB.
- Infraestructura: Contabo VPS + Docker Compose + Caddy.
- Respaldos: `pg_dump` cifrado a R2.

## Principios de trabajo

- Una rebanada vertical a la vez: base de datos, backend, frontend y prueba.
- El contrato de API se define antes de dividir el trabajo.
- Una sola persona es dueña de las migraciones.
- PRs pequeños y revisados.
- Nada de datos reales en desarrollo.
- Nada de dinero con `float`.
- Nada de pagos confirmados borrados.
- Si falta un dato del colegio, se marca `TODO`; no se inventa.
- Cada semana se muestra un avance funcional.

## Fases

### Fase 0 — Fundamentos

Objetivo: dejar el proyecto listo para construir.

- Confirmar modelo de datos inicial con Daniel.
- Definir contrato de API v1.
- Crear estructura `frontend/`, `backend/`, `infra/`, `docs/`.
- Configurar pnpm, Node LTS, Python y PostgreSQL local.
- Configurar Docker Compose.
- Configurar lint, typecheck, pruebas y CI.
- Desplegar un “hello world” en el VPS con HTTPS y `/health`.
- Configurar respaldo diario a R2 y probar una restauración.

Criterio de salida:

- El frontend y la API se ven en el dominio.
- `/health` responde.
- La base de datos está conectada.
- El respaldo se genera y se puede restaurar.

### Fase 1 — Acceso y estudiantes

- Login y logout.
- Roles `ADMINISTRADOR`, `GESTOR`, `REPRESENTANTE`.
- Layout administrativo y layout de representante.
- CRUD de estudiantes.
- Vínculo representante-estudiante.
- Foto opcional en almacenamiento privado.
- Búsqueda y filtros.
- Permisos en backend.

Criterio de salida:

- El administrador y el gestor pueden registrar y consultar estudiantes.
- Un representante no puede ver estudiantes ajenos.

### Fase 2 — Academia y cargos

- Períodos académicos.
- Grados y secciones por período.
- Matrícula.
- Conceptos de cobro.
- Tarifas con vigencia.
- Generación de inscripción y mensualidades.
- Estado de cuenta.
- Saldo calculado.

Criterio de salida:

- Un estudiante tiene matrícula.
- Se generan cargos sin duplicados.
- El saldo refleja las aplicaciones.

### Fase 3 — Pagos y comprobantes

- Registrar pago.
- Métodos y cuentas de recaudo.
- Aplicación a uno o varios cargos.
- Abonos parciales.
- Sobrepago no aplicado.
- Comprobante PDF.
- Numeración definitiva en servidor.
- Libro de entradas.

Criterio de salida:

- Un pago cubre dos cargos.
- Un cargo recibe dos abonos.
- El recibo es único.
- El libro del día cuadra.

### Fase 4 — Portal, anulaciones y auditoría

- Portal del representante.
- Historial y saldos por hijo.
- Descarga de comprobantes.
- Solicitud de anulación.
- Aprobación o rechazo por administrador.
- Reversión de aplicaciones.
- Auditoría de operaciones.
- Graduación y ciclo de vida de la cuenta del representante.

Criterio de salida:

- El padre solo ve lo suyo.
- Una anulación restaura saldos y deja rastro.
- El administrador puede auditar.

### Fase 5 — Offline

- PWA instalable.
- Cache del shell.
- IndexedDB.
- Cola de pagos.
- `operation_id` idempotente.
- Comprobante provisional.
- Sincronización al recuperar conexión.
- Estados “sin conexión” y “pendiente de sincronizar”.

Criterio de salida:

- Se registra un pago sin internet.
- Al volver la conexión, se sincroniza una sola vez.
- El recibo provisional se convierte en definitivo.

### Fase 6 — Piloto

- Migración de estudiantes y saldos iniciales.
- Capacitación a Diego y al gestor.
- Piloto con una sección.
- Operación en paralelo con Excel durante un período corto.
- Retrospectiva y ajustes.

Criterio de salida:

- El colegio registra pagos reales.
- El libro de entradas se usa a diario.
- Los respaldos y restauraciones están probados.

## Reparto de trabajo

| Área | Principal | Apoyo |
|---|---|---|
| Modelo de datos | Daniel | Segunda persona |
| Migraciones | Daniel | Segunda persona |
| Auth y permisos | Daniel | Segunda persona |
| Backend de estudiantes | Segunda persona | Daniel |
| Frontend de estudiantes | Segunda persona | Daniel |
| Cargos y tarifas | Daniel | Segunda persona |
| Pagos y transacciones | Ambos | Ambos |
| Comprobantes y reportes | Segunda persona | Daniel |
| Portal del representante | Segunda persona | Daniel |
| Offline y PWA | Segunda persona | Daniel |
| Infraestructura y respaldos | Daniel | Segunda persona |
| Pruebas de dinero | Ambos | Ambos |

Rotación: después del piloto, cada uno lidera un módulo del otro para evitar silos.

## Calendario sugerido

- Semana 0: fundamentos, VPS y “hello world”.
- Semana 1: login y estudiantes.
- Semana 2: academia, matrícula y cargos.
- Semana 3: pagos y comprobantes.
- Semana 4: portal, anulaciones y auditoría.
- Semana 5: offline, pruebas y despliegue.
- Semana 6: piloto, capacitación y buffer.

Si trabajan menos de 30 horas semanales entre los dos, el calendario se extiende. No prometer fechas sin revisar disponibilidad.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Cambios de alcance | Issues, criterios de aceptación y control de cambios |
| Datos del colegio incompletos | `TODO` visible y preguntas a Diego |
| Offline mal diseñado | Fase 5, no al inicio; idempotencia y pruebas |
| Pérdida de datos | Respaldos R2, restauración mensual |
| Migraciones conflictivas | Un dueño de migraciones |
| Pagos mal aplicados | Transacciones, constraints y pruebas |
| Fuga de datos de menores | RBAC, HTTPS, fotos privadas, auditoría |
| VPS único | Respaldos offsite y plan de recuperación |
| Equipo aprendiendo | Pair programming, rebanadas pequeñas y revisión |

## Pendientes con el colegio

- `TODO: cuántas mensualidades y de qué mes a qué mes`.
- `TODO: política de retiro y deuda`.
- `TODO: descuento de hermanos`.
- `TODO: secciones exactas y grados`.
- `TODO: datos para migración desde Excel`.
- `TODO: formato oficial del comprobante`.
- `TODO: quién autoriza anulaciones además de Diego`.
- `TODO: dominio y correo institucional`.
