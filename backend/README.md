# Backend — Colegio Eugenio Sánchez Osorio

FastAPI + SQLAlchemy 2.0 + Alembic + PostgreSQL 16.

## Requisitos

- Python 3.12+
- Docker + Docker Compose
- PostgreSQL local en Docker (puerto 5433 para no chocar con otros proyectos)

## Levantar la base de datos

Desde la raíz del repositorio:

```bash
docker compose -f infra/docker-compose.yml up -d db
```

La base queda en:

```text
postgresql+psycopg://colegio:colegio_dev@localhost:5433/colegio
```

## Instalar dependencias

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Migraciones

```bash
alembic upgrade head
```

Para crear una migración nueva:

```bash
alembic revision --autogenerate -m "descripcion"
```

Revisar siempre el SQL generado antes de aplicarlo.

## Seed

```bash
python -m app.seed
```

Carga roles y grados. El año académico, las secciones y el usuario administrador quedan pendientes hasta confirmar los datos del colegio.

## Correr la API

```bash
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Salud: http://localhost:8000/health
- Documentación: http://localhost:8000/docs

## Pruebas y lint

```bash
pytest
ruff check .
ruff format --check .
```

## Estado

Primera migración: identidad y academia.

Pendiente:

- Cobros y tarifas.
- Pagos, aplicaciones y anulaciones.
- Auditoría e institución.
- Autenticación con `fastapi-users`.
- Comprobante PDF.
- Offline.
