import app.db.base  # noqa: F401
from app.db.base_class import Base


def test_first_migration_tables_are_registered() -> None:
    expected = {
        "people",
        "users",
        "roles",
        "user_roles",
        "students",
        "student_guardians",
        "grades",
        "academic_years",
        "sections",
        "enrollments",
    }
    assert expected.issubset(set(Base.metadata.tables))
