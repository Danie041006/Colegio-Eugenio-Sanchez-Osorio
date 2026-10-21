from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Numeric,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    teaching_assignment_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("teaching_assignments.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    grading_period_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("grading_periods.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    sequence: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    max_score: Mapped[Decimal] = mapped_column(
        Numeric(4, 2),
        nullable=False,
        server_default=text("20.00"),
    )
    weight: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    assessment_date: Mapped[date | None] = mapped_column(Date)
    is_active: Mapped[bool] = mapped_column(Boolean, server_default=text("true"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "teaching_assignment_id",
            "grading_period_id",
            "sequence",
            name="uq_assessments_assignment_period_sequence",
        ),
        CheckConstraint("max_score > 0 AND max_score <= 20", name="max_score"),
        CheckConstraint("weight IS NULL OR weight BETWEEN 0 AND 100", name="weight"),
        CheckConstraint("sequence > 0", name="sequence"),
        Index("ix_assessments_grading_period_id", "grading_period_id"),
        Index("ix_assessments_teaching_assignment_id", "teaching_assignment_id"),
    )


class StudentGrade(Base):
    __tablename__ = "student_grades"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("assessments.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    enrollment_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("enrollments.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    score: Mapped[Decimal] = mapped_column(Numeric(4, 2), nullable=False)
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'DRAFT'"),
    )
    observation: Mapped[str | None] = mapped_column(Text)
    entered_by_user_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("users.id", ondelete="RESTRICT", onupdate="RESTRICT"),
    )
    entered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_by_user_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("users.id", ondelete="RESTRICT", onupdate="RESTRICT"),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "assessment_id",
            "enrollment_id",
            name="uq_student_grades_assessment_enrollment",
        ),
        CheckConstraint("score BETWEEN 0 AND 20", name="score"),
        CheckConstraint("status IN ('DRAFT', 'FINAL')", name="status"),
        Index("ix_student_grades_enrollment_id", "enrollment_id"),
        Index("ix_student_grades_assessment_id", "assessment_id"),
    )


class ReportCard(Base):
    __tablename__ = "report_cards"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    enrollment_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("enrollments.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    grading_period_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("grading_periods.id", ondelete="RESTRICT", onupdate="RESTRICT"),
        nullable=False,
    )
    average: Mapped[Decimal | None] = mapped_column(Numeric(4, 2))
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        server_default=text("'DRAFT'"),
    )
    snapshot: Mapped[dict | None] = mapped_column(JSONB)
    pdf_key: Mapped[str | None] = mapped_column(String(255))
    generated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    generated_by_user_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("users.id", ondelete="RESTRICT", onupdate="RESTRICT"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "enrollment_id",
            "grading_period_id",
            name="uq_report_cards_enrollment_period",
        ),
        CheckConstraint("average IS NULL OR average BETWEEN 0 AND 20", name="average"),
        CheckConstraint("status IN ('DRAFT', 'GENERATED', 'VOID')", name="status"),
        Index("ix_report_cards_grading_period_id", "grading_period_id"),
    )
