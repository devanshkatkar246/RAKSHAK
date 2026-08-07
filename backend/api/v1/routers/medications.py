from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from datetime import datetime, timezone

from database.session import get_db
from models.medication import Medication, DoseLog
from models.user import User
from schemas.requests import MedicationCreateRequest, MedicationResponse, DoseLogRequest
from core.dependencies import get_current_user
from core.logging import get_logger

router = APIRouter(prefix="/medications", tags=["Medications"])
logger = get_logger("medications_router")


@router.get("/", response_model=List[MedicationResponse])
async def list_medications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all active medications for the authenticated user."""
    result = await db.execute(
        select(Medication).where(
            Medication.user_id == current_user.id,
            Medication.status == "active",
        ).order_by(Medication.created_at.desc())
    )
    return result.scalars().all()


@router.post("/", response_model=MedicationResponse, status_code=201)
async def add_medication(
    payload: MedicationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Add a new medication to the elder's schedule."""
    medication = Medication(
        user_id=current_user.id,
        name=payload.name,
        generic_name=payload.generic_name,
        dosage=payload.dosage,
        form=payload.form,
        frequency=payload.frequency,
        scheduled_times=payload.scheduled_times,
        instructions=payload.instructions,
        pill_color_hex=payload.pill_color_hex,
        start_date=payload.start_date,
        end_date=payload.end_date,
        remaining_pills=payload.remaining_pills,
        total_pills=payload.total_pills,
    )
    db.add(medication)
    await db.commit()
    await db.refresh(medication)
    logger.info("medication_added", user_id=str(current_user.id), name=payload.name)
    return medication


@router.post("/log-dose", status_code=201)
async def log_dose(
    payload: DoseLogRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Record a dose event (taken/skipped/missed)."""
    # Verify medication belongs to user
    med_result = await db.execute(
        select(Medication).where(
            Medication.id == payload.medication_id,
            Medication.user_id == current_user.id,
        )
    )
    medication = med_result.scalar_one_or_none()
    if not medication:
        raise HTTPException(status_code=404, detail="Medication not found.")

    dose_log = DoseLog(
        medication_id=payload.medication_id,
        scheduled_at=payload.scheduled_at,
        status=payload.status,
        notes=payload.notes,
        taken_at=datetime.now(timezone.utc) if payload.status == "taken" else None,
    )
    db.add(dose_log)

    # Update remaining pills if taken
    if payload.status == "taken" and medication.remaining_pills > 0:
        medication.remaining_pills -= 1

    await db.commit()
    return {"status": "logged", "dose_status": payload.status}


@router.delete("/{medication_id}", status_code=204)
async def remove_medication(
    medication_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Discontinue a medication (soft delete via status)."""
    result = await db.execute(
        select(Medication).where(
            Medication.id == medication_id,
            Medication.user_id == current_user.id,
        )
    )
    medication = result.scalar_one_or_none()
    if not medication:
        raise HTTPException(status_code=404, detail="Medication not found.")

    medication.status = "discontinued"
    await db.commit()
