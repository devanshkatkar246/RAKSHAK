from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timezone, timedelta
from typing import Optional

from database.session import get_db
from models.user import User
from models.vital import Vital
from models.medication import DoseLog
from models.emergency import EmergencyEvent
from core.dependencies import get_current_user

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/health-summary")
async def get_health_summary(
    period_days: int = 7,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Generate a health summary report for the given period."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=period_days)

    # Vitals count
    vitals_count_result = await db.execute(
        select(func.count(Vital.id)).where(
            Vital.user_id == current_user.id,
            Vital.recorded_at >= cutoff,
        )
    )
    vitals_count = vitals_count_result.scalar() or 0

    # Dose adherence
    dose_total_result = await db.execute(
        select(func.count(DoseLog.id)).join(DoseLog.medication).where(
            DoseLog.scheduled_at >= cutoff,
        )
    )
    dose_total = dose_total_result.scalar() or 0

    dose_taken_result = await db.execute(
        select(func.count(DoseLog.id)).join(DoseLog.medication).where(
            DoseLog.scheduled_at >= cutoff,
            DoseLog.status == "taken",
        )
    )
    dose_taken = dose_taken_result.scalar() or 0

    adherence_rate = round((dose_taken / dose_total * 100) if dose_total > 0 else 0, 1)

    # Emergency events
    emergency_result = await db.execute(
        select(func.count(EmergencyEvent.id)).where(
            EmergencyEvent.user_id == current_user.id,
            EmergencyEvent.triggered_at >= cutoff,
        )
    )
    emergency_count = emergency_result.scalar() or 0

    return {
        "user_id": str(current_user.id),
        "period_days": period_days,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "vitals_recorded": vitals_count,
        "medication_adherence_pct": adherence_rate,
        "emergency_events": emergency_count,
        "overall_wellness_status": "optimal" if adherence_rate >= 80 and emergency_count == 0 else "stable",
    }


@router.get("/medication-adherence")
async def get_medication_adherence(
    period_days: int = 30,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Detailed medication adherence report with per-drug breakdown."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=period_days)

    result = await db.execute(
        select(DoseLog).join(DoseLog.medication).where(
            DoseLog.scheduled_at >= cutoff,
        )
    )
    logs = result.scalars().all()

    breakdown: dict = {}
    for log in logs:
        med_id = str(log.medication_id)
        if med_id not in breakdown:
            breakdown[med_id] = {"total": 0, "taken": 0, "missed": 0, "skipped": 0}
        breakdown[med_id]["total"] += 1
        breakdown[med_id][log.status] = breakdown[med_id].get(log.status, 0) + 1

    return {"period_days": period_days, "breakdown": breakdown}
