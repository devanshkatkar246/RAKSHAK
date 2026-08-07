import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class NotificationChannel(str, enum.Enum):
    push = "push"
    sms = "sms"
    voice_call = "voice_call"
    in_app = "in_app"
    email = "email"
    whatsapp = "whatsapp"


class NotificationType(str, enum.Enum):
    vital_alert = "vital_alert"
    medication_reminder = "medication_reminder"
    emergency_alert = "emergency_alert"
    wellness_tip = "wellness_tip"
    family_update = "family_update"
    system = "system"


class NotificationPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    title = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    notification_type = Column(SAEnum(NotificationType), nullable=False)
    channel = Column(SAEnum(NotificationChannel), default=NotificationChannel.in_app)
    priority = Column(SAEnum(NotificationPriority), default=NotificationPriority.medium)

    is_read = Column(Boolean, default=False)
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    read_at = Column(DateTime(timezone=True), nullable=True)

    reference_id = Column(UUID(as_uuid=True), nullable=True)    # e.g. emergency_event.id
    reference_type = Column(String(50), nullable=True)           # "emergency_event"
    extra_data = Column(JSONB, default=dict)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="notifications")
