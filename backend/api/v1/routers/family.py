from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel, EmailStr
from uuid import UUID

from database.session import get_db
from models.family import FamilyMember, FamilyRelation
from models.user import User
from core.dependencies import get_current_user
from core.security import encrypt_field

router = APIRouter(prefix="/family", tags=["Family"])


class FamilyMemberCreate(BaseModel):
    name: str
    relation: FamilyRelation
    phone: str | None = None
    email: EmailStr | None = None
    is_primary: bool = False
    receives_emergency_alerts: bool = True
    receives_daily_digest: bool = True


class FamilyMemberResponse(BaseModel):
    id: UUID
    name: str
    relation: str
    email: str | None
    is_primary: bool
    receives_emergency_alerts: bool
    receives_daily_digest: bool
    invite_accepted: bool

    model_config = {"from_attributes": True}


@router.get("/", response_model=List[FamilyMemberResponse])
async def list_family_members(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FamilyMember).where(FamilyMember.elder_user_id == current_user.id)
    )
    return result.scalars().all()


@router.post("/", response_model=FamilyMemberResponse, status_code=201)
async def add_family_member(
    payload: FamilyMemberCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    member = FamilyMember(
        elder_user_id=current_user.id,
        name=payload.name,
        relation=payload.relation,
        phone_encrypted=encrypt_field(payload.phone) if payload.phone else None,
        email=payload.email,
        is_primary=payload.is_primary,
        receives_emergency_alerts=payload.receives_emergency_alerts,
        receives_daily_digest=payload.receives_daily_digest,
    )
    db.add(member)
    await db.commit()
    await db.refresh(member)
    return member


@router.delete("/{member_id}", status_code=204)
async def remove_family_member(
    member_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FamilyMember).where(
            FamilyMember.id == member_id,
            FamilyMember.elder_user_id == current_user.id,
        )
    )
    member = result.scalar_one_or_none()
    if not member:
        raise HTTPException(status_code=404, detail="Family member not found.")
    await db.delete(member)
    await db.commit()
