import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class FamilyRelation(str, enum.Enum):
    son = "son"
    daughter = "daughter"
    son_in_law = "son_in_law"
    daughter_in_law = "daughter_in_law"
    spouse = "spouse"
    sibling = "sibling"
    grandchild = "grandchild"
    neighbor = "neighbor"
    caregiver = "caregiver"
    other = "other"


class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    elder_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    member_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)  # Null if not yet registered

    name = Column(String(255), nullable=False)
    relation = Column(SAEnum(FamilyRelation), nullable=False, default=FamilyRelation.other)
    phone_encrypted = Column(String(512), nullable=True)          # Encrypted
    email = Column(String(320), nullable=True)
    avatar_url = Column(String(512), nullable=True)

    is_primary = Column(Boolean, default=False)                   # Primary emergency contact
    receives_daily_digest = Column(Boolean, default=True)
    receives_emergency_alerts = Column(Boolean, default=True)
    receives_medication_alerts = Column(Boolean, default=False)

    notification_channels = Column(JSONB, default=["push", "sms"])
    invite_accepted = Column(Boolean, default=False)
    invited_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # ── Relationships ──────────────────────────────────────────────
    elder = relationship("User", foreign_keys=[elder_user_id], back_populates="family_members")
