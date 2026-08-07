import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text, Enum as SAEnum, Time
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class MedicationStatus(str, enum.Enum):
    active = "active"
    paused = "paused"
    discontinued = "discontinued"
    completed = "completed"


class DoseLogStatus(str, enum.Enum):
    taken = "taken"
    missed = "missed"
    skipped = "skipped"
    pending = "pending"


class Medication(Base):
    __tablename__ = "medications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    prescribed_by = Column(UUID(as_uuid=True), ForeignKey("doctors.id"), nullable=True)

    name = Column(String(255), nullable=False)
    generic_name = Column(String(255), nullable=True)
    dosage = Column(String(100), nullable=False)           # "500 mg"
    form = Column(String(50), nullable=True)               # tablet, capsule, syrup
    frequency = Column(String(100), nullable=False)        # "Twice Daily"
    scheduled_times = Column(JSONB, default=list)          # ["08:00", "21:00"]
    instructions = Column(Text, nullable=True)
    pill_color_hex = Column(String(10), nullable=True)

    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(SAEnum(MedicationStatus), default=MedicationStatus.active)

    remaining_pills = Column(Integer, default=0)
    total_pills = Column(Integer, default=0)
    refill_reminder_at = Column(Integer, default=7)       # days before empty

    interactions = Column(JSONB, default=list)            # Known drug interactions
    side_effects = Column(JSONB, default=list)
    tags = Column(JSONB, default=list)                    # ["heart", "blood pressure"]

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="medications")
    dose_logs = relationship("DoseLog", back_populates="medication", cascade="all, delete-orphan")


class DoseLog(Base):
    """Records every scheduled dose event and the outcome."""

    __tablename__ = "dose_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    medication_id = Column(UUID(as_uuid=True), ForeignKey("medications.id", ondelete="CASCADE"), nullable=False, index=True)
    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    taken_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(SAEnum(DoseLogStatus), default=DoseLogStatus.pending, nullable=False)
    notes = Column(Text, nullable=True)
    reminder_sent = Column(Boolean, default=False)

    medication = relationship("Medication", back_populates="dose_logs")
