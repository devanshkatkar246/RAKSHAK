from pydantic import BaseModel
from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime
from models.vital import VitalType, VitalRiskLevel, VitalSource


class VitalCreateRequest(BaseModel):
    vital_type: VitalType
    value: Optional[float] = None
    value_str: Optional[str] = None
    unit: str
    source: VitalSource = VitalSource.manual
    recorded_at: datetime
    context_metadata: Optional[dict] = None


class VitalResponse(BaseModel):
    id: UUID
    user_id: UUID
    vital_type: VitalType
    value: Optional[float]
    value_str: Optional[str]
    unit: str
    risk_level: VitalRiskLevel
    ai_analysis: Optional[str]
    source: VitalSource
    recorded_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}


class VitalBatchUpload(BaseModel):
    vitals: List[VitalCreateRequest]


class VitalHistoryResponse(BaseModel):
    vital_type: VitalType
    unit: str
    history: List[dict]         # [{time, value}]
    average: Optional[float]
    min_value: Optional[float]
    max_value: Optional[float]
    current_risk_level: VitalRiskLevel


class HealthDashboardResponse(BaseModel):
    overall_score: float
    status: str
    status_message: str
    last_assessment_time: str
    vitals: List[VitalResponse]
