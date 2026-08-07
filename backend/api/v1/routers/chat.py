"""
AI Chat Router — Entry point for elder ↔ Rakshak AI Guardian conversations.
Routes through the SupervisorAgent LangGraph pipeline.
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database.session import get_db
from models.user import User
from models.chat import ChatMessage, MessageSender
from models.profile import Profile
from schemas.requests import ChatRequest, ChatResponse
from core.dependencies import get_current_user
from core.logging import get_logger
from agents.supervisor_agent import SupervisorAgent
from agents.base_agent import AgentInput
from sqlalchemy import select

router = APIRouter(prefix="/chat", tags=["AI Chat"])
logger = get_logger("chat_router")

# ── Singleton supervisor (shared across requests) ──────────────────────────────
_supervisor: SupervisorAgent | None = None


def get_supervisor() -> SupervisorAgent:
    global _supervisor
    if _supervisor is None:
        _supervisor = SupervisorAgent()
    return _supervisor


@router.post("/message", response_model=ChatResponse, status_code=201)
async def send_message(
    payload: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Process an elder's message through the multi-agent LangGraph pipeline
    and persist both user and AI messages to chat history.
    """
    session_id = payload.session_id or str(uuid.uuid4())

    # ── Persist user message ───────────────────────────────────────
    user_msg = ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        sender=MessageSender.user,
        content=payload.content,
    )
    db.add(user_msg)
    await db.flush()

    # ── Build agent input snapshot ─────────────────────────────────
    profile_result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile: Profile | None = profile_result.scalar_one_or_none()

    profile_snapshot: dict = {}
    if profile:
        profile_snapshot = {
            "full_name": profile.full_name,
            "age": profile.age,
            "blood_group": profile.blood_group,
            "primary_conditions": profile.primary_conditions or [],
            "known_allergies": profile.known_allergies or [],
            "preferred_language": profile.preferred_language,
        }

    agent_input = AgentInput(
        user_id=str(current_user.id),
        session_id=session_id,
        message=payload.content,
        profile_snapshot=profile_snapshot,
        vitals_snapshot={},       # Populated by VitalService in production
        medication_snapshot={},   # Populated by MedicationService
        emergency_context={},
    )

    # ── Run through Supervisor LangGraph pipeline ──────────────────
    supervisor = get_supervisor()
    try:
        state = await supervisor.process(agent_input)
    except Exception as e:
        logger.error("chat.supervisor_error", error=str(e))
        raise HTTPException(status_code=500, detail="AI Guardian processing error.")

    # ── Persist AI response message ────────────────────────────────
    ai_msg = ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        sender=MessageSender.rakshak_ai,
        content=state["final_response"],
        agent_invoked=state.get("classified_intent"),
        reasoning_steps=state.get("reasoning_steps", []),
        confidence_score=state.get("confidence_score"),
        suggested_actions=state.get("suggested_actions", []),
        rag_sources_used=state.get("rag_sources", []),
        is_emergency_flag=state.get("emergency_flag", False),
    )
    db.add(ai_msg)
    await db.commit()
    await db.refresh(ai_msg)

    logger.info(
        "chat.response_sent",
        user_id=str(current_user.id),
        session_id=session_id,
        emergency=state.get("emergency_flag"),
    )
    return ai_msg


@router.get("/history", response_model=list[ChatResponse])
async def get_chat_history(
    session_id: str | None = None,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve chat history for the authenticated user."""
    query = select(ChatMessage).where(ChatMessage.user_id == current_user.id)

    if session_id:
        query = query.where(ChatMessage.session_id == session_id)

    query = query.order_by(ChatMessage.created_at.desc()).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()
