import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Text, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class DoctorSpecialty(str, enum.Enum):
    general_physician = "General Physician"
    cardiologist = "Cardiologist"
    neurologist = "Neurologist"
    endocrinologist = "Endocrinologist"
    orthopedic = "Orthopedic"
    psychiatrist = "Psychiatrist"
    geriatrician = "Geriatrician"
    other = "Other"


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)  # If doctor is also a platform user

    name = Column(String(255), nullable=False)
    specialty = Column(SAEnum(DoctorSpecialty), default=DoctorSpecialty.general_physician)
    registration_number = Column(String(100), nullable=True)
    hospital = Column(String(255), nullable=True)
    phone_encrypted = Column(String(512), nullable=True)
    email = Column(String(320), nullable=True)
    is_verified = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
