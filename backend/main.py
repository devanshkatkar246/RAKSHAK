"""
RAKSHAK Backend — FastAPI Application Entry Point
─────────────────────────────────────────────────────────────────────────────
"The AI Digital Guardian for Elders"

Architecture:
  FastAPI + LangGraph + Gemini 2.5 + PostgreSQL + pgvector + Redis + JWT
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded

from core.config import settings
from core.logging import configure_logging, get_logger
from database.session import engine
from database.redis_client import get_redis, close_redis
from middleware.logging_middleware import RequestLoggingMiddleware
from middleware.rate_limiter import limiter, rate_limit_exceeded_handler
from api.v1 import api_router

# ── Configure logging early ───────────────────────────────────────────────────
configure_logging()
logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown lifecycle."""
    # ── Startup ────────────────────────────────────────────────────
    logger.info("rakshak_backend.starting", version=settings.APP_VERSION, env=settings.ENVIRONMENT)

    # Verify Redis connection
    try:
        redis = await get_redis()
        await redis.ping()
        logger.info("redis.connected")
    except Exception as e:
        logger.warning("redis.connection_failed", error=str(e))

    # Verify DB connection
    try:
        async with engine.begin() as conn:
            await conn.run_sync(lambda c: c.execute(__import__("sqlalchemy").text("SELECT 1")))
        logger.info("database.connected")
    except Exception as e:
        logger.warning("database.connection_failed", error=str(e))

    logger.info("rakshak_backend.ready")
    yield

    # ── Shutdown ───────────────────────────────────────────────────
    logger.info("rakshak_backend.shutdown")
    await close_redis()
    await engine.dispose()


# ── FastAPI Application ───────────────────────────────────────────────────────
app = FastAPI(
    title="RAKSHAK API",
    description=(
        "**RAKSHAK — The AI Digital Guardian for Elders**\n\n"
        "Agentic AI-powered health monitoring, medication management, "
        "emergency dispatch, and family communication platform for elderly care.\n\n"
        "**Powered by:** Gemini 2.5 · LangGraph · FastAPI · PostgreSQL + pgvector · Redis"
    ),
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan,
)

# ── Rate Limiter ──────────────────────────────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request Logging ───────────────────────────────────────────────────────────
app.add_middleware(RequestLoggingMiddleware)

# ── API Router ────────────────────────────────────────────────────────────────
app.include_router(api_router, prefix=settings.API_V1_STR)


# ── Health / Ping Endpoints ───────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health_check():
    """Service health check endpoint."""
    return {
        "status": "healthy",
        "service": "RAKSHAK Backend",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }


@app.get("/", tags=["System"])
async def root():
    return {
        "message": "🛡️ RAKSHAK API — The AI Digital Guardian for Elders",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }
