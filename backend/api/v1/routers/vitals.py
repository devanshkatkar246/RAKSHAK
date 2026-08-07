from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from typing import List

from database.session import get_db
from models.vital import Vital
from models.user import User
from schemas.vital import VitalCreateRequest, VitalResponse, VitalBatchUpload, HealthDashboardResponse
from core.dependencies import get_current_user
from core.logging import get_logger

router = APIRouter(prefix="/vitals", tags=["Vitals"])
logger = get_logger("vitals_router")


@router.post("/", response_model=VitalResponse, status_code=201)
async def record_vital(
    payload: VitalCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Record a single vital measurement for the authenticated elder."""
    vital = Vital(
        user_id=current_user.id,
        vital_type=payload.vital_type,
        value=payload.value,
        value_str=payload.value_str,
        unit=payload.unit,
        source=payload.source,
        recorded_at=payload.recorded_at,
        context_metadata=payload.context_metadata or {},
    )
    db.add(vital)
    await db.commit()
    await db.refresh(vital)
    logger.info("vital_recorded", user_id=str(current_user.id), type=payload.vital_type)
    return vital


@router.post("/batch", response_model=List[VitalResponse], status_code=201)
async def batch_upload_vitals(
    payload: VitalBatchUpload,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Batch-upload multiple vitals (wearable sync endpoint)."""
    vitals = []
    for item in payload.vitals:
        vital = Vital(
            user_id=current_user.id,
            vital_type=item.vital_type,
            value=item.value,
            value_str=item.value_str,
            unit=item.unit,
            source=item.source,
            recorded_at=item.recorded_at,
            context_metadata=item.context_metadata or {},
        )
        db.add(vital)
        vitals.append(vital)

    await db.commit()
    for v in vitals:
        await db.refresh(v)

    logger.info("vitals_batch_uploaded", user_id=str(current_user.id), count=len(vitals))
    return vitals


@router.get("/latest", response_model=List[VitalResponse])
async def get_latest_vitals(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve the most recent reading for each vital type."""
    from sqlalchemy import func

    subq = (
        select(Vital.vital_type, func.max(Vital.recorded_at).label("max_recorded_at"))
        .where(Vital.user_id == current_user.id)
        .group_by(Vital.vital_type)
        .subquery()
    )
    result = await db.execute(
        select(Vital).join(
            subq,
            (Vital.vital_type == subq.c.vital_type) & (Vital.recorded_at == subq.c.max_recorded_at),
        )
    )
    return result.scalars().all()


@router.get("/history/{vital_type}", response_model=List[VitalResponse])
async def get_vital_history(
    vital_type: str,
    days: int = 7,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve vital history for a specific type over N days."""
    from datetime import timedelta
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)

    result = await db.execute(
        select(Vital)
        .where(
            Vital.user_id == current_user.id,
            Vital.vital_type == vital_type,
            Vital.recorded_at >= cutoff,
        )
        .order_by(Vital.recorded_at.asc())
    )
    return result.scalars().all()
