import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, Enum as SAEnum, Float
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import enum

from database.session import Base


class MessageSender(str, enum.Enum):
    user = "user"
    rakshak_ai = "rakshak_ai"
    system = "system"


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    session_id = Column(String(100), nullable=True, index=True)  # Group conversation turns
    sender = Column(SAEnum(MessageSender), nullable=False)
    content = Column(Text, nullable=False)
    content_audio_url = Column(String(512), nullable=True)

    # AI metadata
    agent_invoked = Column(String(100), nullable=True)           # Which agent responded
    reasoning_steps = Column(JSONB, default=list)
    confidence_score = Column(Float, nullable=True)
    suggested_actions = Column(JSONB, default=list)
    context_vitals_snapshot = Column(JSONB, nullable=True)       # Vitals at time of message

    # RAG
    rag_sources_used = Column(JSONB, default=list)               # [{doc_title, chunk_id, score}]

    is_emergency_flag = Column(Boolean, default=False)
    tokens_used = Column(Float, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

    # ── Relationships ──────────────────────────────────────────────
    user = relationship("User", back_populates="chat_messages")
