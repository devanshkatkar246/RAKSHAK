import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum as SAEnum, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class VitalType(str, enum.Enum):
    heart_rate = "heart_rate"
    blood_pressure = "blood_pressure"
    spo2 = "spo2"
    temperature = "temperature"
    glucose = "glucose"
    steps = "steps"
    sleep_hours = "sleep_hours"
    respiratory_rate = "respiratory_rate"
    weight = "weight"


class VitalRiskLevel(str, enum.Enum):
    optimal = "optimal"
    stable = "stable"
    caution = "caution"
    critical = "critical"


class VitalSource(str, enum.Enum):
    wearable = "wearable"
    manual = "manual"
    iot_sensor = "iot_sensor"
    ai_inferred = "ai_inferred"


class Vital(Base):
    __tablename__ = "vitals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    vital_type = Column(SAEnum(VitalType), nullable=False, index=True)
    value = Column(Float, nullable=True)
    value_str = Column(String(50), nullable=True)       # For compound: "120/80"
    unit = Column(String(20), nullable=False)
    risk_level = Column(SAEnum(VitalRiskLevel), default=VitalRiskLevel.stable)
    source = Column(SAEnum(VitalSource), default=VitalSource.wearable)

    # Optional AI analysis
    ai_analysis = Column(Text, nullable=True)           # AI agent commentary
    context_metadata = Column(JSONB, default=dict)      # Device ID, firmware, coords

    recorded_at = Column(DateTime(timezone=True), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="vitals")
