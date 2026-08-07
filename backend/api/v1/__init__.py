from fastapi import APIRouter
from api.v1.routers import auth, vitals, chat, medications, emergency, family, notifications, reports

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(vitals.router)
api_router.include_router(chat.router)
api_router.include_router(medications.router)
api_router.include_router(emergency.router)
api_router.include_router(family.router)
api_router.include_router(notifications.router)
api_router.include_router(reports.router)
