from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from database.session import get_db
from models.emergency import EmergencyEvent, EmergencyType, EmergencyStatus
from models.user import User
from models.family import FamilyMember
from schemas.requests import EmergencyTriggerRequest, EmergencyEventResponse
from core.dependencies import get_current_user
from core.logging import get_logger
from agents.supervisor_agent import SupervisorAgent
from agents.base_agent import AgentInput

router = APIRouter(prefix="/emergency", tags=["Emergency"])
logger = get_logger("emergency_router")

_supervisor: SupervisorAgent | None = None


def get_supervisor() -> SupervisorAgent:
    global _supervisor
    if _supervisor is None:
        _supervisor = SupervisorAgent()
    return _supervisor


async def _dispatch_emergency_background(
    user_id: str, event_id: str, vitals_snapshot: dict, emergency_context: dict
) -> None:
    """Background task: run emergency agent and update event record."""
    try:
        supervisor = get_supervisor()
        agent_input = AgentInput(
            user_id=user_id,
            session_id=f"sos_{event_id}",
            message="EMERGENCY SOS TRIGGERED",
            vitals_snapshot=vitals_snapshot,
            emergency_context=emergency_context,
        )
        await supervisor.process(agent_input)
        logger.info("emergency.background_dispatch_complete", event_id=event_id)
    except Exception as e:
        logger.error("emergency.background_dispatch_error", error=str(e))


@router.post("/sos", response_model=EmergencyEventResponse, status_code=201)
async def trigger_sos(
    payload: EmergencyTriggerRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Trigger emergency SOS event — dispatches multi-channel alerts via agent."""
    # Persist emergency event immediately for audit trail
    event = EmergencyEvent(
        user_id=current_user.id,
        event_type=EmergencyType(payload.event_type),
        status=EmergencyStatus.triggered,
        latitude=payload.latitude,
        longitude=payload.longitude,
        address_snapshot=f"Lat: {payload.latitude}, Lon: {payload.longitude}" if payload.latitude else None,
        severity_score=0.9,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)

    emergency_context = {
        "event_type": payload.event_type,
        "event_id": str(event.id),
        "location": f"{payload.latitude},{payload.longitude}" if payload.latitude else "Unknown",
        "notes": payload.notes,
    }

    # Dispatch AI agent pipeline in background (non-blocking SOS response)
    background_tasks.add_task(
        _dispatch_emergency_background,
        user_id=str(current_user.id),
        event_id=str(event.id),
        vitals_snapshot={},
        emergency_context=emergency_context,
    )

    logger.info("sos_triggered", user_id=str(current_user.id), event_id=str(event.id))
    return event


@router.get("/events", response_model=List[EmergencyEventResponse])
async def get_emergency_history(
    limit: int = 10,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve emergency event history for the authenticated user."""
    result = await db.execute(
        select(EmergencyEvent)
        .where(EmergencyEvent.user_id == current_user.id)
        .order_by(EmergencyEvent.triggered_at.desc())
        .limit(limit)
    )
    return result.scalars().all()


@router.patch("/events/{event_id}/resolve")
async def resolve_event(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark an emergency event as resolved."""
    from datetime import datetime, timezone

    result = await db.execute(
        select(EmergencyEvent).where(
            EmergencyEvent.id == event_id,
            EmergencyEvent.user_id == current_user.id,
        )
    )
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Emergency event not found.")

    event.status = EmergencyStatus.resolved
    event.resolved_at = datetime.now(timezone.utc)
    await db.commit()
    return {"status": "resolved", "event_id": event_id}
