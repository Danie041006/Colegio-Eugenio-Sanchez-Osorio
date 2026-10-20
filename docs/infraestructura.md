# Infraestructura y operación

Documento de trabajo para el despliegue en Contabo. No contiene credenciales ni secretos.

## Arquitectura

```text
Internet
   |
   v
Caddy (HTTPS :443)
   |
   +-- /              -> frontend Vite compilado
   |
   +-- /api/*         -> FastAPI :8000 (red interna)
   |
   +-- /health        -> FastAPI
                         |
                         v
                    PostgreSQL 16
                    (sin puerto público)

Fotos y comprobantes -> Cloudflare R2 (privado, URLs firmadas)
Respaldos de BD      -> Cloudflare R2 (bucket separado, cifrado)
```

## VPS

- Proveedor: Contabo.
- Plan recomendado: Cloud VPS 20 (6 vCPU, 12 GB RAM, 100 GB NVMe) o superior.
- Región recomendada: US East (New York), por cercanía a Venezuela.
- Sistema operativo: Ubuntu 24.04 LTS.
- Contratación inicial: mensual, para probar latencia y estabilidad antes de un contrato anual.
- Dominio: `TODO: definir dominio`.
- Subdominio previsto: `app.<dominio>`.

Los precios y especificaciones deben verificarse en el checkout de Contabo antes de comprar.

## Servicios

```text
caddy    -> reverse proxy, TLS, frontend estático
api      -> FastAPI
db       -> PostgreSQL 16
backup   -> tarea programada de respaldo
```

Reglas:

- Solo Caddy publica los puertos 80 y 443.
- FastAPI escucha en la red interna; no se publica directamente.
- PostgreSQL no tiene `ports` en Docker Compose.
- Los datos de PostgreSQL viven en un volumen persistente.
- Los archivos no viven en el disco del VPS; van a R2.
- Los secretos van en `.env` con permisos restringidos o Docker secrets.

## Caddy

Responsabilidades:

- Obtener y renovar certificados TLS.
- Servir `frontend/dist`.
- Hacer fallback de React Router a `index.html`.
- Proxy de `/api/*` hacia FastAPI.
- Comprimir respuestas.

No se debe exponer el puerto de FastAPI ni el de PostgreSQL.

## PostgreSQL

- Imagen: `postgres:16`.
- Sin puerto público.
- Contraseña fuerte y única.
- Usuario de aplicación con privilegios mínimos.
- Migraciones con Alembic.
- Respaldo antes de cada migración en producción.
- No editar datos de producción manualmente sin auditoría.
- Monitorear tamaño, conexiones y consultas lentas.

## Respaldos

### Base de datos

- `pg_dump` diario como mínimo, a las 02:00 de `America/Caracas`.
- Cifrado con `age` o `gpg` antes de subir.
- Subida a Cloudflare R2.
- Retención:
  - 30 copias diarias.
  - 12 semanales.
  - 12 mensuales.
- Verificación de que el archivo se subió y tiene tamaño razonable.
- Alerta por correo o Telegram si falla.
- Prueba de restauración mensual en staging.

RPO inicial: hasta 24 horas. Si el colegio necesita menor pérdida, evaluar respaldo horario o WAL archiving.

### Archivos

- Bucket privado en R2.
- URLs firmadas con expiración.
- Versioning o copia de seguridad si el presupuesto lo permite.
- Bucket de archivos separado del bucket de respaldos de base de datos.

### Claves

- La clave de cifrado de respaldos no se guarda en el VPS.
- Guardar una copia en un gestor de contraseñas y otra copia física segura.
- Si se pierde la clave, los respaldos no se pueden restaurar.

## Seguridad

- SSH solo con llaves; sin login de root por contraseña.
- Usuarios separados para Daniel, el equipo de despliegue y tareas automatizadas.
- UFW: solo 22, 80 y 443.
- Fail2ban.
- Actualizaciones de seguridad del sistema.
- Docker y Docker Compose actualizados.
- PostgreSQL y R2 sin exposición pública.
- TLS obligatorio.
- Cookies `HttpOnly`, `Secure`, `SameSite`.
- Rate limiting en login.
- Secretos fuera de Git.
- Respaldos cifrados.
- Monitoreo de salud, disco y respaldos.
- Revisión de logs.
- 2FA en Contabo, GitHub, Cloudflare y R2.

## Despliegue

1. Push a una rama.
2. GitHub Actions ejecuta lint, typecheck, pruebas y build.
3. Se construye la imagen de FastAPI y el build de Vite.
4. Se publica la imagen en GitHub Container Registry.
5. Se conecta al VPS con un usuario de despliegue.
6. Se respalda la base de datos.
7. Se ejecutan las migraciones de Alembic.
8. Se levanta la nueva versión.
9. Se actualiza el frontend estático.
10. Se prueba `/health`.
11. Si falla, se vuelve a la versión anterior.

No se hace `git pull` manual en producción como procedimiento normal. No se suben archivos por FTP.

## Staging

- Base de datos separada.
- Datos ficticios.
- Nunca datos reales de estudiantes.
- Mismo stack que producción.
- Se usa para probar migraciones y restauraciones.

Si no hay presupuesto para un segundo VPS, staging puede correr localmente o en un proyecto separado de Docker Compose en el mismo VPS, con base y credenciales distintas.

## Roles de administración

| Área | Principal | Suplente |
|---|---|---|
| VPS, SSH y firewall | Daniel | Segunda persona |
| PostgreSQL y migraciones | Daniel | Segunda persona |
| Respaldos R2 | Segunda persona | Daniel |
| Frontend y PWA | Segunda persona | Daniel |
| CI/CD | Daniel | Segunda persona |
| Monitoreo y alertas | Ambos | Ambos |

Los dos pueden administrar, pero no deben cambiar infraestructura al mismo tiempo sin avisar.

## Costos aproximados

- VPS Contabo: USD 8-12/mes, según plan, región y ciclo.
- Dominio: USD 10-20/año.
- R2: gratis hasta 10 GB; después centavos por GB.
- Monitoreo: gratis o USD 0-20/mes.
- Total inicial: aproximadamente USD 10-20/mes, sin contar tiempo de operación.

## Pendientes

- `TODO: comprar VPS y definir plan/región`.
- `TODO: definir dominio`.
- `TODO: crear buckets R2 y credenciales de mínimo privilegio`.
- `TODO: decidir proveedor de alertas`.
- `TODO: elegir librería de autenticación`.
- `TODO: definir RPO/RTO con el colegio`.
- `TODO: escribir el runbook de restauración`.
- `TODO: configurar staging`.
