from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.modules.academic.models import Grade
from app.modules.identity.models import Role

ROLES = [
    ("ADMINISTRADOR", "Administrador", "Acceso total al sistema"),
    ("GESTOR", "Gestor", "Registro de estudiantes y pagos"),
    ("DOCENTE", "Docente", "Carga de notas de sus secciones asignadas"),
    ("REPRESENTANTE", "Representante", "Consulta de estudiantes autorizados"),
]

GRADES = [
    ("P1", "1.º grado", "PRIMARY", 1),
    ("P2", "2.º grado", "PRIMARY", 2),
    ("P3", "3.º grado", "PRIMARY", 3),
    ("P4", "4.º grado", "PRIMARY", 4),
    ("P5", "5.º grado", "PRIMARY", 5),
    ("P6", "6.º grado", "PRIMARY", 6),
    ("M1", "1.º año", "MEDIA_GENERAL", 1),
    ("M2", "2.º año", "MEDIA_GENERAL", 2),
    ("M3", "3.º año", "MEDIA_GENERAL", 3),
    ("M4", "4.º año", "MEDIA_GENERAL", 4),
    ("M5", "5.º año", "MEDIA_GENERAL", 5),
]


def seed_roles(db: Session) -> int:
    created = 0
    for code, name, description in ROLES:
        existing = db.scalar(select(Role).where(Role.code == code))
        if existing is None:
            db.add(Role(code=code, name=name, description=description))
            created += 1
    return created


def seed_grades(db: Session) -> int:
    created = 0
    for code, name, level, sort_order in GRADES:
        existing = db.scalar(select(Grade).where(Grade.code == code))
        if existing is None:
            db.add(
                Grade(
                    code=code,
                    name=name,
                    level=level,
                    sort_order=sort_order,
                )
            )
            created += 1
    return created


def main() -> None:
    with SessionLocal() as db:
        roles_created = seed_roles(db)
        grades_created = seed_grades(db)
        db.commit()

    print(f"Roles creados: {roles_created}")
    print(f"Grados creados: {grades_created}")
    print(
        "TODO: año académico, secciones y usuario administrador se cargan "
        "cuando Diego confirme los datos."
    )


if __name__ == "__main__":
    main()
