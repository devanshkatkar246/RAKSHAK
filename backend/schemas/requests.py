from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class ChatRequest(BaseModel):
    content: str
    session_id: Optional[str] = None
    is_voice: bool = False


class SuggestedAction(BaseModel):
    label: str
    action: str


class ChatResponse(BaseModel):
    id: UUID
    session_id: Optional[str]
    sender: str
    content: str
    agent_invoked: Optional[str]
    reasoning_steps: List[str] = []
    confidence_score: Optional[float]
    suggested_actions: List[SuggestedAction] = []
    rag_sources_used: List[dict] = []
    is_emergency_flag: bool = False
    tokens_used: Optional[float]
    created_at: datetime

    model_config = {"from_attributes": True}


class MedicationCreateRequest(BaseModel):
    name: str
    generic_name: Optional[str] = None
    dosage: str
    form: Optional[str] = None
    frequency: str
    scheduled_times: List[str]       # ["08:00", "21:00"]
    instructions: Optional[str] = None
    pill_color_hex: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    remaining_pills: int = 0
    total_pills: int = 0


class MedicationResponse(BaseModel):
    id: UUID
    name: str
    generic_name: Optional[str]
    dosage: str
    frequency: str
    scheduled_times: List[str]
    instructions: Optional[str]
    pill_color_hex: Optional[str]
    remaining_pills: int
    total_pills: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class DoseLogRequest(BaseModel):
    medication_id: UUID
    scheduled_at: datetime
    status: str                       # "taken" | "skipped" | "missed"
    notes: Optional[str] = None


class EmergencyTriggerRequest(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    event_type: str = "sos_manual"
    notes: Optional[str] = None


class EmergencyEventResponse(BaseModel):
    id: UUID
    event_type: str
    status: str
    latitude: Optional[float]
    longitude: Optional[float]
    address_snapshot: Optional[str]
    severity_score: float
    ai_assessment: Optional[str]
    contacts_notified: List[str]
    triggered_at: datetime

    model_config = {"from_attributes": True}
