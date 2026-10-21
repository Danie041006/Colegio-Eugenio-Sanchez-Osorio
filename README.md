# Sistema de Gestión de Pagos — Colegio Eugenio Sánchez Osorio

> **Para la bellota **
>
> Querida:  coffee and tea. Este proyecto es un **sistema interno** para el colegio, no una página pública. La gente entra con usuario y contraseña y ve solo lo que su rol permite. Tu tarea es diseñar la interfaz en Figma, con calma y con cariño. Si algo no sale, respiras, me mandas una captura y lo vemos juntos.
>
> Vas a hacerlo muy bien coffee and tea
>
> — att. tu ardilla admiradora

ahora si, la IA  te va dar un análisis de lo que puedes hacer si?

**Repositorio:** https://github.com/Danie041006/Colegio-Eugenio-Sanchez-Osorio

---

## Para empezar (bellota)

Esta guía es para que puedas instalar el proyecto, verlo en tu computadora y editarlo sin miedo. El diseño que hiciste se conserva tal cual; solo lo dividimos en componentes para que sea más fácil mantenerlo.

### 1. Instala lo necesario

- **Git:** https://git-scm.com/downloads
- **Node.js LTS:** https://nodejs.org/
- **VS Code:** https://code.visualstudio.com/ (opcional, pero recomendado)
- Una cuenta de GitHub.

No necesitas instalar PostgreSQL ni el backend para ver el frontend por ahora.

### 2. Clona el repositorio

```bash
git clone git@github.com:Danie041006/Colegio-Eugenio-Sanchez-Osorio.git
cd Colegio-Eugenio-Sanchez-Osorio
```

### 3. Activa pnpm

El proyecto usa **pnpm**, no npm.

```bash
corepack enable
corepack prepare pnpm@10.18.0 --activate
```

Si `corepack enable` te da error de permisos, usa `corepack pnpm` en todos los comandos.

### 4. Levanta el frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Abre la URL que muestre la terminal. Normalmente es:

```text
http://localhost:5173
```

Si el puerto está ocupado, Vite usará el siguiente, por ejemplo `5174`.

### 5. Dónde está cada cosa

```text
frontend/src/
  app/            -> rutas, navegación y composición general
  components/
    app/          -> sidebar, topbar y menú móvil
    ui/           -> botones, campos, tarjetas, badges, tablas
  features/       -> pantallas por área
    auth/
    dashboard/
    students/
    payments/
    receipts/
    billing/
    reports/
    users/
    annulments/
    profile/
    portal/
    design/
  styles/
    globals.css   -> colores, tipografía y estilos visuales aprobados
```

### 6. Qué puedes editar

- Textos de pantallas: dentro de `features/`.
- Componentes reutilizables: dentro de `components/ui/`.
- Navegación y rutas: `app/App.tsx`, `app/navigation.ts`.
- Estilos visuales: `styles/globals.css`.

**Importante:** `globals.css` es el diseño que hiciste. Si quieres cambiar colores, tamaños o jerarquía visual, hazlo en una rama aparte y avísame para revisarlo juntos.

### 7. Qué no debes tocar todavía

- `backend/` (aún no existe).
- Base de datos o migraciones.
- `AGENTS.md`, salvo que acordemos un cambio de reglas.
- Los controles de cambio de rol y el selector de rol del login: son solo del prototipo y se quitarán cuando exista autenticación real.
- `node_modules/`, `dist/` o archivos `.env`.

### 8. Cómo hacer un cambio sin romper nada

Crea una rama:

```bash
git switch -c feat/mi-cambio
```

Edita lo que necesites. Antes de subir, verifica:

```bash
cd frontend
pnpm typecheck
pnpm lint
pnpm build
```

Si todo pasa:

```bash
git add .
git commit -m "feat: describir el cambio"
git push -u origin feat/mi-cambio
```

Luego abre un Pull Request en GitHub. No hagas push directo a `main`.

### 9. Reglas de diseño

- No cambies el diseño aprobado sin hablarlo.
- No inventes datos reales de estudiantes.
- Donde falte información, deja `TODO`.
- No uses fotos de niños generadas con IA.
- Mantén el blanco dominante y el azul rey con intención.
- Prueba en computadora y en celular.

Para cambios de diseño, usa la skill `colegio-ui-craft`. Está explicada en `docs/skills.md` y combina `apple-design` con `emil-design-eng` para cuidar jerarquía, tipografía, estados y microinteracciones sin cambiar la identidad del colegio.

### 10. Si algo falla

No borres archivos ni hagas `force push`. Copia el error, toma una captura y mándamela. Lo revisamos juntos.

---

## 0. Lo que es y lo que NO es

| Es | No es |
|---|---|
| Un **sistema interno** de gestión de pagos escolares | Una landing page |
| Una aplicación privada con **login y roles** | Un sitio público de marketing |
| Una herramienta para registrar estudiantes, cargos, pagos, abonos y comprobantes | Una pasarela de pagos o una tienda |
| Un panel para el director, el gestor y los representantes | Una red social |
| Una web **responsive** con funcionamiento offline previsto | Una app nativa de iOS/Android (por ahora) |

**Si en algún documento viejo ves palabras como “hero”, “admisiones” o “agendar visita”, ignóralo: eso era del concepto anterior.**

---

## 1. Contexto real del colegio

- Colegio privado venezolano, cerca de la frontera con Colombia (San Antonio del Táchira).
- Atiende **primaria y media general**.
- Hoy todo se lleva en **Excel** y un **cuaderno contable**; después se pasa a Excel.
- Los pagos se reciben **solo en pesos colombianos (COP)**, en **efectivo**, **Nequi** y **Bancolombia**.
- El sistema nace como **gestor de pagos**, pero la visión es que crezca: estudiantes, matrículas, cargos, recibos, reportes y libro de entradas.
- El colegio **aún recibe estudiantes nuevos**.
- La moneda queda preparada para el futuro (VES, USD), pero **solo COP estará activa** al inicio.

### Decisiones ya confirmadas con Diego

| Tema | Decisión |
|---|---|
| Mensualidad | Una sola tarifa general para todos los grados |
| Vencimiento | No se maneja fecha límite obligatoria en la primera versión |
| Mora | No se aplican intereses ni multas por ahora |
| Abonos | Se permiten pagos parciales, sin monto mínimo |
| Comprobantes | Cada pago genera un recibo con número único |
| Anulaciones | Los pagos confirmados no se borran; se anulan con autorización del administrador |
| Libro de entradas | Se genera a partir de los pagos registrados en el sistema |
| Monedas | COP activa; VES y USD quedan previstas en el modelo |
| Offline | Debe funcionar sin internet al menos para registrar pagos |
| Datos | Se protegen porque hay información de menores de edad |

---

## 2. Roles del sistema

| Rol | Quién | Qué puede hacer |
|---|---|---|
| **Administrador** | Profe Diego | Todo: registrar, modificar, consultar, configurar tarifas, docentes, materias, notas, reportes y autorizar anulaciones |
| **Gestor** | Personal de oficina | Registrar estudiantes, registrar pagos, consultar estados de pago y solicitar anulaciones |
| **Docente** | Profesores | Ver únicamente sus secciones y materias asignadas, cargar notas y consultar boletines |
| **Representante** | Padres o tutores | Ver únicamente sus estudiantes autorizados, historial, saldos, notas, boletines y comprobantes |

Regla de oro: un representante **nunca** puede ver estudiantes que no tenga autorizados.

---

## 3. Qué debe tener el MVP

### Entra en el MVP

1. **Login** con usuario y contraseña, con redirección según el rol.
2. **Estudiantes:** registrar, listar, buscar, ver ficha y estado.
3. **Foto del estudiante** como apoyo visual para identificarlo.
4. **Representantes:** asociar uno o varios representantes a cada estudiante.
5. **Grados, secciones y períodos académicos.**
6. **Matrícula:** relacionar estudiante con grado, sección y período.
7. **Conceptos de cobro y tarifas:** mensualidad, inscripción y otros.
8. **Cargos:** deuda de cada estudiante con su saldo pendiente.
9. **Pagos:** registrar pago completo o abono.
10. **Aplicación del pago:** indicar a qué cargos se aplica el dinero.
11. **Comprobante:** recibo con número único, listo para imprimir o guardar.
12. **Portal del representante:** historial de pagos y saldo pendiente de sus estudiantes.
13. **Libro de entradas:** reporte diario de lo recibido, por método y cuenta.
14. **Anulación de pagos:** el gestor solicita, el administrador autoriza.
15. **Auditoría:** quién hizo qué, cuándo y por qué.
16. **Responsive:** funciona en computador y celular.
17. **Offline (fase 1):** registrar pagos sin internet y sincronizar al volver.

### NO entra todavía

- Conversión entre monedas (COP ↔ VES ↔ USD).
- Moras, intereses o fechas de vencimiento obligatorias.
- Facturación electrónica.
- Sincronización multi-dispositivo en tiempo real (fase 2).
- App nativa de iOS/Android.
- Reconocimiento facial.
- Asistencia, conducta y otras funciones académicas.
- Pagos en línea con tarjeta.

Las notas y boletines entran en la fase 2, después de cerrar el flujo de pagos.

---

## 4. Pantallas que debe diseñar bellota

### Para administrador y gestor (escritorio y celular)

1. **Login**
2. **Panel principal:** recaudado hoy, total pendiente, estudiantes activos, últimos pagos y accesos rápidos.
3. **Estudiantes:** tabla con foto, nombre, documento, grado, sección, estado y saldo.
4. **Ficha del estudiante:** datos, representantes, cargos pendientes, historial de pagos y comprobantes.
5. **Nuevo estudiante:** formulario con foto, datos básicos y representante.
6. **Registrar pago:** buscar estudiante → ver cargos pendientes → monto recibido → método (efectivo, Nequi, Bancolombia) → cuenta → aplicar a cargos → confirmar.
7. **Comprobante:** vista imprimible con número, fecha, estudiante, representante, conceptos, monto, método, usuario y estado.
8. **Cobros:** conceptos, tarifas y generación de cargos.
9. **Reportes / libro de entradas:** filtros por fecha, método y cuenta; total del día; exportar.
10. **Usuarios y roles.**
11. **Anulaciones:** solicitudes pendientes, motivo, aprobar o rechazar.
12. **Perfil y cambio de contraseña.**

### Para el representante (principalmente celular)

1. **Login.**
2. **Mis estudiantes:** tarjetas con foto, nombre, grado y saldo pendiente.
3. **Detalle del estudiante:** información personal, académica y financiera.
4. **Comprobantes:** ver y descargar.

### Estados que no se pueden olvidar

- Vacío (sin estudiantes, sin pagos).
- Cargando.
- Error.
- Éxito.
- Sin conexión.
- Pendiente de sincronizar.

---

## 5. Paso a paso en Figma

### Paso 1 — Entra a Figma

Abre **figma.com** e inicia sesión. Si no tienes cuenta, créala con tu correo. Es gratis.

### Paso 2 — Crea el archivo

1. Pulsa **New design file**.
2. Ponle nombre: **“Sistema de Pagos — Colegio Eugenio Sánchez Osorio”**.
3. Guárdalo en tu borrador o en el equipo del colegio.

### Paso 3 — Abre Figma Make

Dentro del archivo, busca el botón **Make** o **Figma Make**. Es la parte de Figma que crea pantallas con inteligencia artificial.

Si no lo encuentras, busca **First Draft** o pregúntame. No te quedes trabada.

### Paso 4 — Pega el mensaje

Copia el bloque de la sección **6. El mensaje para Figma** y pégalo en la caja de texto de Figma Make. Envíalo.

### Paso 5 — Revisa con calma

- ¿Se entiende que es un sistema interno y no una página pública?
- ¿El login tiene sentido?
- ¿El panel principal muestra lo importante de un vistazo?
- ¿Se ve claro cómo registrar un pago?
- ¿El comprobante parece un recibo de verdad?
- ¿El blanco y el azul rey se sienten elegantes, no cargados?

No tiene que quedar perfecto en el primer intento.

### Paso 6 — Pide la versión móvil

Cuando tengas la versión de escritorio, escribe esto:

```text
Ahora haz la versión móvil de las pantallas de administrador, gestor y representante. Mantén la misma jerarquía. En móvil, el menú debe ser un botón fácil de tocar y las tablas deben convertirse en tarjetas legibles.
```

### Paso 7 — Corrige con mensajes concretos

No digas “hazlo más bonito”. Dile exactamente qué cambiar. Por ejemplo:

- *“El panel principal tiene demasiadas tarjetas. Deja solo cuatro indicadores y una lista de últimos pagos.”*
- *“La tabla de estudiantes debe tener foto, nombre, grado, sección, estado y saldo. Si no cabe en celular, conviértela en tarjetas.”*
- *“El formulario de pago debe mostrar primero los cargos pendientes y luego el monto, el método y la cuenta.”*
- *“El comprobante debe verse como un recibo formal, con número y fecha arriba.”*
- *“Usa azul rey solo en botones, enlaces y títulos. El fondo debe ser blanco.”*
- *“Agrega los estados vacío, cargando y error.”*

### Paso 8 — Revisa antes de aprobar

- [ ] Se entiende que es un sistema interno.
- [ ] Hay un solo botón principal por pantalla.
- [ ] El menú se entiende sin explicación.
- [ ] Registrar un pago se siente rápido y claro.
- [ ] El comprobante tiene toda la información del recibo.
- [ ] El representante solo ve a sus estudiantes.
- [ ] Todo se ve bien en celular.
- [ ] No hay datos inventados: donde falta algo dice `TODO`.
- [ ] No hay fotos de niños generadas con IA.
- [ ] El blanco domina y el azul rey se usa con intención.
- [ ] No hay degradados morados ni efectos raros.

---

## 6. El mensaje para Figma

Copia todo lo que está entre las líneas y pégalo en Figma Make:

```text
Diseña la interfaz de un sistema interno de gestión de pagos para el Colegio Eugenio Sánchez Osorio. NO es una página web pública: es una aplicación privada con login, roles y panel de administración.

Estilo: blanco dominante, azul rey #1B3A8F para botones, enlaces y títulos destacados; azul marino #122A6B en el menú lateral y encabezados; celeste #DCE6F7 en tarjetas y filas alternas; texto #0F172A. Tipografía Inter. Tablas, formularios, badges de estado y navegación lateral. Nada de degradados, glassmorphism ni animaciones llamativas.

ROLES
1. Administrador (Diego): acceso total.
2. Gestor: registrar estudiantes, registrar pagos, consultar estados de pago, solicitar anulaciones.
3. Representante: ver solo sus estudiantes, su historial, saldos, notas, boletines y comprobantes.

PANTALLAS DE ESCRITORIO (1440 px)
- Login.
- Panel principal: recaudado hoy, total pendiente, estudiantes activos, últimos pagos y accesos rápidos.
- Estudiantes: tabla con foto, nombre, documento, grado, sección, estado y saldo. Buscador y filtros.
- Ficha del estudiante: datos, representantes, cargos pendientes, historial de pagos y comprobantes.
- Nuevo estudiante: formulario con foto, datos del estudiante y representante.
- Registrar pago: buscar estudiante, ver cargos pendientes, monto recibido, método (efectivo, Nequi, Bancolombia), cuenta, referencia, aplicar a cargos y confirmar.
- Comprobante: vista imprimible con número, fecha, estudiante, representante, conceptos, monto, método, usuario y estado.
- Cobros: conceptos, tarifas y generación de cargos.
- Reportes / libro de entradas: filtros por fecha, método y cuenta; total del día; exportar.
- Usuarios y roles.
- Anulaciones: solicitudes pendientes, motivo, aprobar o rechazar.
- Perfil y cambio de contraseña.

PANTALLAS DE REPRESENTANTE (390 px)
- Login.
- Mis estudiantes: tarjetas con foto, nombre, grado y saldo pendiente.
- Detalle del estudiante: información personal, académica y financiera.
- Comprobantes: ver y descargar.

ESTADOS
- Vacío, cargando, error, éxito, sin conexión y pendiente de sincronizar.

REGLAS
- No inventes datos ni cifras. Si falta algo, escribe "TODO: [dato]".
- No generes imágenes de niños con IA. Usa placeholders de foto claramente marcados.
- Contraste accesible y botones de al menos 44 px.
- Labels visibles en todos los formularios.
- Un solo botón principal por pantalla.
- El menú lateral debe mostrar solo lo que el rol puede usar.
- Incluye una página de sistema de diseño: colores, tipografía, botones, inputs, badges, tablas y modales.
- Al final, entrégame una lista de los datos y pantallas que faltan.
```

---

## 7. Cómo entrega bellota el diseño (sin push)

1. En Figma, pulsa **Share**.
2. Activa **Anyone with the link can view**.
3. Copia el enlace.
4. Exporta las pantallas como PNG: selecciona el frame → **Export** → PNG → 2x.
5. Envía:
   - el enlace de Figma,
   - las capturas,
   - una nota con lo que le gusta y lo que no.

**No se sube nada al repositorio todavía.** Daniel revisa, corrige y luego lo sube a `design/`.

---

## 8. Stack decidido

| Capa | Tecnología |
|---|---|
| Frontend | Vite + React + TypeScript estricto + Tailwind CSS v4 + shadcn/ui |
| Runtime y paquetes | Node.js LTS + pnpm |
| Navegación | React Router |
| Datos remotos | TanStack Query |
| Formularios | React Hook Form + Zod |
| Backend | FastAPI + Python 3.12+ |
| Validación | Pydantic v2 |
| Base de datos | PostgreSQL 16 |
| Acceso a datos | SQLAlchemy 2.0 |
| Migraciones | Alembic |
| Autenticación | `fastapi-users`, Authlib u otra librería consolidada; cookies HttpOnly |
| Archivos (fotos, recibos) | Almacenamiento privado S3-compatible (Cloudflare R2) con URLs firmadas |
| PDF de comprobantes | Generado en el backend |
| Offline (fase 1) | PWA + IndexedDB + cola de sincronización |
| Despliegue | Contabo VPS + Docker Compose + Caddy |
| Respaldos | `pg_dump` cifrado + Cloudflare R2 |
| Moneda | COP activa; campo de moneda en cargo, tarifa y pago |

El frontend y la API se sirven desde el mismo dominio para evitar CORS y simplificar cookies y PWA. Vercel queda descartado para el MVP.

---

## 9. Documentos del proyecto

| Documento | Contenido |
|---|---|
| `README.md` | Esta guía. |
| `AGENTS.md` | Reglas de implementación y contratos técnicos. |
| `docs/decisiones.md` | Decisiones de arquitectura y su justificación. |
| `docs/infraestructura.md` | VPS, Docker, Caddy, respaldos y operación. |
| `docs/plan-mvp.md` | Plan de trabajo por fases, equipo y riesgos. |
| `docs/skills.md` | Skills de diseño y desarrollo disponibles, y cómo usarlas. |
| `docs/modelo-datos-mvp.md` | Modelo lógico del MVP; identidad, academia, docentes y notas implementados. |
| `backend/alembic/versions/` | Migraciones; la primera crea identidad y academia. |
| `docs/cotizacion.md` | Pendiente: precio y condiciones comerciales. |
| `docs/archive/landing/` | Documentos viejos del concepto de landing. Ignorar. |

---

## 10. Reglas de oro

1. No inventar datos ni cifras.
2. No borrar pagos confirmados: se anulan con motivo y auditoría.
3. Cada pago genera un comprobante.
4. Un representante solo ve a sus estudiantes autorizados.
5. Las contraseñas se guardan con hash, nunca en texto.
6. Las fotos de estudiantes son privadas.
7. El blanco domina; el azul rey se usa con intención.
8. Si falta un dato, se escribe `TODO` y se avisa.
9. Primero se diseña y se aprueba; después se programa.
10. Confiar, pero verificar.

---

## 11. Estado actual y próximo paso

Hoy el repositorio contiene la documentación del producto, las reglas de implementación, las decisiones de arquitectura, un **frontend modular** en `frontend/` que conserva el diseño aprobado y un **backend base** en `backend/` con FastAPI, SQLAlchemy y Alembic.

La primera migración crea las tablas de **identidad y academia**: personas, usuarios, roles, estudiantes, representantes, grados, períodos, secciones y matrículas.

La segunda migración agrega **docentes, materias, lapsos, evaluaciones, notas y boletines**. La autenticación, los endpoints y los módulos de cobros y pagos todavía están pendientes.

La arquitectura confirmada es:

- Vite + React + TypeScript + pnpm.
- FastAPI + SQLAlchemy + Alembic.
- PostgreSQL 16.
- Un VPS Contabo con Docker Compose y Caddy.
- Cloudflare R2 para archivos privados y respaldos.

El siguiente paso es implementar autenticación con `fastapi-users` y los endpoints de estudiantes para conectar el frontend con datos reales. Después siguen docentes/notas, cobros, pagos y comprobantes.

La ficha del estudiante ya está dividida en información personal, académica y financiera. El módulo de notas queda como fase 2 y no debe retrasar el cierre del flujo de pagos.
