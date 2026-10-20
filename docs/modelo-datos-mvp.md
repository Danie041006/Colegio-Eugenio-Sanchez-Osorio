# Modelo de datos del MVP

Documento de referencia para la base de datos PostgreSQL del sistema de pagos del Colegio Eugenio Sánchez Osorio.

## Decisiones generales

- Motor: PostgreSQL 16 en Contabo.
- Nombres de tablas y columnas en inglés; etiquetas de interfaz en español.
- Claves primarias internas: `BIGINT GENERATED ALWAYS AS IDENTITY`.
- Identificador offline: `UUID` en `payments.operation_id`.
- Dinero: `NUMERIC(14,2)`. Nunca `float`.
- Fechas de negocio: `DATE`; eventos: `TIMESTAMPTZ` en UTC.
- Fechas de negocio se interpretan en `America/Caracas`.
- Estados con `TEXT` + `CHECK`, no enums nativos, para facilitar migraciones.
- Bajas lógicas con `status` o `is_active`; no se borran registros con historial financiero.
- `ON DELETE RESTRICT` en relaciones financieras.
- El saldo de un cargo y el estado de cuenta son vistas/cálculos, no columnas editables.

## Alcance del primer corte

La primera migración implementa identidad y academia:

- `people`
- `users`
- `roles`
- `user_roles`
- `students`
- `student_guardians`
- `grades`
- `academic_years`
- `sections`
- `enrollments`

Cobros, pagos, anulaciones y auditoría se agregan en migraciones posteriores.

## Identidad

### `people`

Persona física. Puede ser estudiante, representante, empleado o usuario.

| Columna | Tipo | Regla |
|---|---|---|
| `id` | BIGINT PK | Identidad |
| `first_name` | TEXT | Obligatorio |
| `last_name` | TEXT | Obligatorio |
| `document_type` | TEXT NULL | V-, E-, pasaporte, CC, TI, etc. |
| `document_number` | TEXT NULL | Único junto con el tipo cuando exista |
| `phone` | TEXT NULL | Contacto |
| `email` | TEXT NULL | Contacto |
| `created_at` | TIMESTAMPTZ | Auditoría |
| `updated_at` | TIMESTAMPTZ | Auditoría |

Restricciones:

- Índice único parcial en `(document_type, document_number)` cuando `document_number IS NOT NULL`.
- El documento no es clave primaria ni contraseña.

### `users`

Credenciales de acceso. Una persona puede tener cero o una cuenta.

| Columna | Tipo | Regla |
|---|---|---|
| `id` | BIGINT PK | Identidad |
| `person_id` | BIGINT FK UNIQUE | `people.id` |
| `username` | TEXT UNIQUE | Documento normalizado o usuario interno |
| `email` | TEXT NULL | Opcional |
| `hashed_password` | TEXT | Argon2id o bcrypt |
| `is_active` | BOOLEAN | Cuenta habilitada |
| `is_verified` | BOOLEAN | Verificación administrativa |
| `must_change_password` | BOOLEAN | Cambio obligatorio |
| `failed_login_attempts` | INTEGER | Bloqueo temporal |
| `locked_until` | TIMESTAMPTZ NULL | Bloqueo |
| `last_login_at` | TIMESTAMPTZ NULL | Último acceso |
| `created_at` | TIMESTAMPTZ | Auditoría |
| `updated_at` | TIMESTAMPTZ | Auditoría |

### `roles`

Catálogo de roles.

- `ADMINISTRADOR`
- `GESTOR`
- `REPRESENTANTE`

### `user_roles`

Relación muchos-a-muchos entre usuarios y roles.

- PK compuesta: `(user_id, role_id)`.
- `assigned_at`.
- `assigned_by_user_id` opcional.

## Academia

### `students`

Condición de alumno de una persona.

| Columna | Tipo | Regla |
|---|---|---|
| `id` | BIGINT PK | Identidad |
| `person_id` | BIGINT FK UNIQUE | `people.id` |
| `student_code` | TEXT NULL UNIQUE | Código interno |
| `photo_key` | TEXT NULL | Referencia privada, no URL pública |
| `status` | TEXT | `ACTIVE`, `WITHDRAWN`, `GRADUATED`, `INACTIVE` |
| `created_at` | TIMESTAMPTZ | Auditoría |
| `updated_at` | TIMESTAMPTZ | Auditoría |

### `student_guardians`

Relación muchos-a-muchos entre estudiantes y representantes.

| Columna | Tipo | Regla |
|---|---|---|
| `id` | BIGINT PK | Identidad |
| `guardian_person_id` | BIGINT FK | `people.id` |
| `student_id` | BIGINT FK | `students.id` |
| `relationship` | TEXT | Padre, madre, tutor, otro |
| `is_primary` | BOOLEAN | Contacto principal |
| `can_view_payments` | BOOLEAN | Autorización de consulta |
| `is_active` | BOOLEAN | Vínculo vigente |
| `verified_at` | TIMESTAMPTZ NULL | Verificación |
| `verified_by_user_id` | BIGINT FK NULL | `users.id` |
| `created_at` | TIMESTAMPTZ | Auditoría |
| `updated_at` | TIMESTAMPTZ | Auditoría |

Restricciones:

- Único `(guardian_person_id, student_id)`.
- Solo un representante principal activo por estudiante.

### `grades`

Catálogo de grados y años.

- `PRIMARY`: 1.º a 6.º grado.
- `MEDIA_GENERAL`: 1.º a 5.º año.
- `sort_order` para ordenar.
- Único `(level, sort_order)` y `code`.

### `academic_years`

Período escolar.

- `name` único, por ejemplo `2026-2027`.
- `start_date`, `end_date`.
- `status`: `PLANNED`, `ACTIVE`, `CLOSED`.
- `CHECK (start_date < end_date)`.

`TODO`: confirmar con Diego las fechas exactas del período.

### `sections`

Sección de un grado dentro de un período escolar.

- `grade_id`.
- `academic_year_id`.
- `name` (A, B, etc.).
- `is_active`.
- Único `(grade_id, academic_year_id, name)`.
- Único `(id, grade_id, academic_year_id)` para la FK compuesta de matrícula.

### `enrollments`

Matrícula de un estudiante en un período.

- `student_id`.
- `grade_id`.
- `section_id`.
- `academic_year_id`.
- `enrollment_date`.
- `status`: `ACTIVE`, `WITHDRAWN`, `GRADUATED`, `CANCELLED`.
- `end_date`, `end_reason` opcionales.
- Único `(student_id, academic_year_id)`.
- FK compuesta `(section_id, grade_id, academic_year_id)` hacia `sections`.

Reglas:

- No se sobrescribe la matrícula anterior al avanzar de grado.
- Un retiro o graduación se registra con estado y fecha; no se borra.
- Los cargos se generan por matrícula, no por estudiante suelto.

## Cobros (segunda migración)

- `currencies`: COP activa; VES/USD inactivas.
- `fee_concepts`: inscripción, mensualidad, otros.
- `fee_rates`: monto, moneda y vigencia.
- `charges`: obligación por matrícula, concepto y período; monto original.

Reglas:

- La inscripción es anual y se cobra a todos.
- Las mensualidades son configurables; no se hardcodea el número.
- Un cargo conserva su monto original.
- No hay dos cargos activos iguales para la misma matrícula, concepto y período.
- El descuento de hermanos queda pendiente; se agregará con `benefits` y `enrollment_benefits`.

## Pagos (tercera migración)

- `payment_methods`: efectivo, transferencia.
- `collection_accounts`: caja, Nequi, Bancolombia.
- `payments`: pago recibido, moneda, método, cuenta, pagador, número de recibo, `operation_id`, estado.
- `payment_applications`: aplicación de un pago a uno o varios cargos.
- `payment_voids`: solicitudes y aprobación de anulación.
- `audit_log`: historial append-only.
- `institutions`: datos del colegio para el comprobante.

Reglas:

- Un pago puede cubrir varios cargos.
- Un cargo puede pagarse con varios abonos.
- La suma aplicada a un pago no supera el monto recibido.
- La suma aplicada a un cargo no supera su monto original.
- Pago y cargo comparten moneda en v1.
- Un pago confirmado no se borra: se anula.
- Solo una anulación aprobada por pago.
- `operation_id` UUID único para idempotencia offline.
- El comprobante se guarda como snapshot JSON y PDF generado desde ese snapshot.

## Comprobante

Para el MVP:

- Vista HTML imprimible con CSS de impresión.
- PDF generado desde el backend.
- `receipt_snapshot JSONB` en el pago, con los datos congelados al confirmar.
- `receipt_pdf_key` opcional en almacenamiento privado.
- Recibo provisional offline; definitivo en el servidor.
- Comprobante anulado se conserva y se marca como **ANULADO**.

## Fuera del MVP

- Conversión multimoneda.
- Mora e intereses.
- Facturación electrónica.
- Notas, boletines y asistencia.
- Sincronización multi-dispositivo en tiempo real.
- Integración bancaria automática.
- App nativa.

## Pendientes con el colegio

- `TODO`: número de mensualidades y meses.
- `TODO`: regla de descuento de hermanos.
- `TODO`: política de retiro con deuda.
- `TODO`: fechas exactas del período 2026-2027.
- `TODO`: grados y secciones exactos.
- `TODO`: formato legal del comprobante.
- `TODO`: quién más puede aprobar anulaciones.
