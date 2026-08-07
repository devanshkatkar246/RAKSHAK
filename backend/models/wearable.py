import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum as SAEnum, Float
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class WearableType(str, enum.Enum):
    smartwatch = "smartwatch"
    fitness_band = "fitness_band"
    pulse_oximeter = "pulse_oximeter"
    bp_monitor = "bp_monitor"
    glucometer = "glucometer"
    fall_detector = "fall_detector"
    ekg_patch = "ekg_patch"


class WearableStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    low_battery = "low_battery"
    disconnected = "disconnected"


class Wearable(Base):
    __tablename__ = "wearables"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    device_type = Column(SAEnum(WearableType), nullable=False)
    device_name = Column(String(255), nullable=False)
    device_id = Column(String(255), unique=True, nullable=False)
    manufacturer = Column(String(100), nullable=True)
    model = Column(String(100), nullable=True)
    firmware_version = Column(String(50), nullable=True)

    is_primary = Column(Boolean, default=False)
    status = Column(SAEnum(WearableStatus), default=WearableStatus.active)
    battery_level = Column(Float, nullable=True)               # 0.0 – 100.0
    last_sync_at = Column(DateTime(timezone=True), nullable=True)
    supported_vitals = Column(JSONB, default=list)             # ["heart_rate", "spo2"]

    paired_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="wearables")
