import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Boolean, Text, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class EmergencyType(str, enum.Enum):
    sos_manual = "sos_manual"
    fall_detected = "fall_detected"
    vitals_critical = "vitals_critical"
    medication_overdue = "medication_overdue"
    geofence_breach = "geofence_breach"
    inactivity = "inactivity"


class EmergencyStatus(str, enum.Enum):
    triggered = "triggered"
    notifying = "notifying"
    acknowledged = "acknowledged"
    resolved = "resolved"
    false_alarm = "false_alarm"


class EmergencyEvent(Base):
    __tablename__ = "emergency_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    event_type = Column(SAEnum(EmergencyType), nullable=False)
    status = Column(SAEnum(EmergencyStatus), default=EmergencyStatus.triggered, nullable=False)

    # Location at time of event
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address_snapshot = Column(String(512), nullable=True)

    # Severity & context
    severity_score = Column(Float, default=0.0)           # 0.0 – 1.0
    ai_assessment = Column(Text, nullable=True)            # Guardian AI commentary
    trigger_metadata = Column(JSONB, default=dict)         # Raw sensor data that triggered

    # Response tracking
    contacts_notified = Column(JSONB, default=list)        # [contact_id, ...]
    notification_log = Column(JSONB, default=list)         # [{channel, contact, sent_at, status}]
    acknowledged_by = Column(String(255), nullable=True)
    acknowledged_at = Column(DateTime(timezone=True), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    resolution_notes = Column(Text, nullable=True)

    triggered_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="emergency_events")
