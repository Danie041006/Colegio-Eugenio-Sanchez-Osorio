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
        "teachers",
        "subjects",
        "grade_subjects",
        "teaching_assignments",
        "grading_periods",
        "assessments",
        "student_grades",
        "report_cards",
    }
    assert expected.issubset(set(Base.metadata.tables))
