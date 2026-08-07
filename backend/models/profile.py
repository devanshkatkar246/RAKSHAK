import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class BloodGroup(str, enum.Enum):
    A_pos = "A+"
    A_neg = "A-"
    B_pos = "B+"
    B_neg = "B-"
    AB_pos = "AB+"
    AB_neg = "AB-"
    O_pos = "O+"
    O_neg = "O-"
    unknown = "unknown"


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    # Personal Details
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=True)
    date_of_birth = Column(DateTime(timezone=True), nullable=True)
    gender = Column(String(20), nullable=True)
    avatar_url = Column(String(512), nullable=True)

    # ── PII (encrypted at application layer) ──────────────────────
    phone_encrypted = Column(String(512), nullable=True)          # phone (encrypted)
    address_encrypted = Column(String(1024), nullable=True)       # full address (encrypted)
    emergency_contact_encrypted = Column(String(512), nullable=True)

    # Medical
    blood_group = Column(SAEnum(BloodGroup), default=BloodGroup.unknown)
    primary_conditions = Column(JSONB, default=list)              # ["Hypertension", "Type-2 Diabetes"]
    known_allergies = Column(JSONB, default=list)
    current_doctors = Column(JSONB, default=list)                 # [{name, specialty, phone}]
    government_health_id = Column(String(64), nullable=True)      # Ayushman Bharat ID etc.

    guardian_agent_name = Column(String(100), default="Rakshak AI Guardian")
    locale = Column(String(10), default="en-IN")
    timezone = Column(String(50), default="Asia/Kolkata")
    preferred_language = Column(String(30), default="English")

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="profile")
