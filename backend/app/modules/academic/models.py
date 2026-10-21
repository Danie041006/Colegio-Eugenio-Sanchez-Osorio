from datetime import date, datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    ForeignKeyConstraint,
    Index,
    Integer,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base
from app.db.mixins import TimestampMixin


class Student(TimestampMixin, Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    person_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("people.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
        unique=True,
    )
    student_code: Mapped[str | None] = mapped_column(String(40), unique=True)
    photo_key: Mapped[str | None] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'ACTIVE'"),
    )

    __table_args__ = (
        CheckConstraint(
            "status IN ('ACTIVE', 'WITHDRAWN', 'GRADUATED', 'INACTIVE')",
            name="status",
        ),
        Index("ix_students_status", "status"),
    )


class StudentGuardian(TimestampMixin, Base):
    __tablename__ = "student_guardians"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    guardian_person_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("people.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    student_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("students.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    relationship: Mapped[str] = mapped_column(String(40), nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("false"))
    can_view_payments: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("true"),
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    verified_by_user_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("users.id", ondelete="RESTRICT", onupdate="RESTRICT"),
    )

    __table_args__ = (
        UniqueConstraint(
            "guardian_person_id",
            "student_id",
            name="uq_student_guardians_guardian_student",
        ),
        Index(
            "uq_student_guardians_primary_active",
            "student_id",
            unique=True,
            postgresql_where=text("is_primary IS TRUE AND is_active IS TRUE"),
        ),
        Index("ix_student_guardians_student_id", "student_id"),
        Index("ix_student_guardians_guardian_person_id", "guardian_person_id"),
    )


class Grade(Base):
    __tablename__ = "grades"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    level: Mapped[str] = mapped_column(String(30), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))

    __table_args__ = (
        CheckConstraint(
            "level IN ('PRIMARY', 'MEDIA_GENERAL')",
            name="level",
        ),
        UniqueConstraint("level", "sort_order", name="uq_grades_level_sort_order"),
    )


class AcademicYear(Base):
    __tablename__ = "academic_years"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(40), nullable=False, unique=True)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'PLANNED'"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        CheckConstraint("start_date < end_date", name="dates"),
        CheckConstraint(
            "status IN ('PLANNED', 'ACTIVE', 'CLOSED')",
            name="status",
        ),
    )


class Section(Base):
    __tablename__ = "sections"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    grade_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("grades.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    academic_year_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("academic_years.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(20), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "grade_id",
            "academic_year_id",
            "name",
            name="uq_sections_grade_year_name",
        ),
        UniqueConstraint(
            "id",
            "grade_id",
            "academic_year_id",
            name="uq_sections_id_grade_year",
        ),
        UniqueConstraint(
            "id",
            "academic_year_id",
            name="uq_sections_id_academic_year",
        ),
        Index("ix_sections_academic_year_id", "academic_year_id"),
        Index("ix_sections_grade_id", "grade_id"),
    )


class Enrollment(TimestampMixin, Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("students.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    grade_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    section_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    academic_year_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("academic_years.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    enrollment_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
        server_default=func.current_date(),
    )
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'ACTIVE'"),
    )
    end_date: Mapped[date | None] = mapped_column(Date)
    end_reason: Mapped[str | None] = mapped_column(Text)

    __table_args__ = (
        UniqueConstraint(
            "student_id",
            "academic_year_id",
            name="uq_enrollments_student_year",
        ),
        ForeignKeyConstraint(
            ["section_id", "grade_id", "academic_year_id"],
            [
                "sections.id",
                "sections.grade_id",
                "sections.academic_year_id",
            ],
            name="fk_enrollments_section_grade_year",
            ondelete="RESTRICT",
            onupdate="RESTRICT",
        ),
        CheckConstraint(
            "status IN ('ACTIVE', 'WITHDRAWN', 'GRADUATED', 'CANCELLED')",
            name="status",
        ),
        Index("ix_enrollments_section_id", "section_id"),
        Index("ix_enrollments_academic_year_id", "academic_year_id"),
    )


class Teacher(TimestampMixin, Base):
    __tablename__ = "teachers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    person_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("people.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
        unique=True,
    )
    employee_code: Mapped[str | None] = mapped_column(String(40), unique=True)
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'ACTIVE'"),
    )

    __table_args__ = (
        CheckConstraint("status IN ('ACTIVE', 'INACTIVE')", name="status"),
        Index("ix_teachers_status", "status"),
    )


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    code: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    area: Mapped[str | None] = mapped_column(String(80))
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


class GradeSubject(Base):
    __tablename__ = "grade_subjects"

    grade_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("grades.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        primary_key=True,
    )
    subject_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("subjects.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        primary_key=True,
    )
    weekly_hours: Mapped[int | None] = mapped_column(SmallInteger)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))

    __table_args__ = (Index("ix_grade_subjects_subject_id", "subject_id"),)


class TeachingAssignment(Base):
    __tablename__ = "teaching_assignments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    teacher_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("teachers.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    subject_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("subjects.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    section_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    academic_year_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        ForeignKeyConstraint(
            ["section_id", "academic_year_id"],
            ["sections.id", "sections.academic_year_id"],
            name="fk_teaching_assignments_section_year",
            ondelete="RESTRICT",
            onupdate="RESTRICT",
        ),
        Index(
            "uq_teaching_assignments_active",
            "subject_id",
            "section_id",
            "academic_year_id",
            unique=True,
            postgresql_where=text("is_active IS TRUE"),
        ),
        Index("ix_teaching_assignments_teacher_id", "teacher_id"),
        Index("ix_teaching_assignments_subject_id", "subject_id"),
        Index("ix_teaching_assignments_section_id", "section_id"),
    )


class GradingPeriod(Base):
    __tablename__ = "grading_periods"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    academic_year_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("academic_years.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    sequence: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'PLANNED'"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "academic_year_id",
            "sequence",
            name="uq_grading_periods_year_sequence",
        ),
        CheckConstraint("sequence BETWEEN 1 AND 3", name="sequence"),
        CheckConstraint("start_date < end_date", name="dates"),
        CheckConstraint("status IN ('PLANNED', 'ACTIVE', 'CLOSED')", name="status"),
        Index("ix_grading_periods_academic_year_id", "academic_year_id"),
    )
