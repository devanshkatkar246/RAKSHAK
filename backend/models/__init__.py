"""
Registers all ORM models so SQLAlchemy / Alembic discover them.
Import order matters for FK resolution.
"""
from models.user import User, UserRole  # noqa: F401
from models.profile import Profile, BloodGroup  # noqa: F401
from models.doctor import Doctor, DoctorSpecialty  # noqa: F401
from models.vital import Vital, VitalType, VitalRiskLevel, VitalSource  # noqa: F401
from models.medication import Medication, DoseLog, MedicationStatus, DoseLogStatus  # noqa: F401
from models.emergency import EmergencyEvent, EmergencyType, EmergencyStatus  # noqa: F401
from models.notification import Notification, NotificationChannel, NotificationType, NotificationPriority  # noqa: F401
from models.chat import ChatMessage, MessageSender  # noqa: F401
from models.family import FamilyMember, FamilyRelation  # noqa: F401
from models.wearable import Wearable, WearableType, WearableStatus  # noqa: F401

__all__ = [
    "User", "UserRole",
    "Profile", "BloodGroup",
    "Doctor", "DoctorSpecialty",
    "Vital", "VitalType", "VitalRiskLevel", "VitalSource",
    "Medication", "DoseLog", "MedicationStatus", "DoseLogStatus",
    "EmergencyEvent", "EmergencyType", "EmergencyStatus",
    "Notification", "NotificationChannel", "NotificationType", "NotificationPriority",
    "ChatMessage", "MessageSender",
    "FamilyMember", "FamilyRelation",
    "Wearable", "WearableType", "WearableStatus",
]
