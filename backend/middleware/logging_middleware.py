"""
Request/Response Logging Middleware
Logs every request with timing and structured metadata.
"""
import time
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

import structlog

logger = structlog.get_logger("http")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = str(uuid.uuid4())[:8]
        start_time = time.perf_counter()

        # Bind request ID to the context for all logs in this request chain
        structlog.contextvars.bind_contextvars(request_id=request_id)

        logger.info(
            "http.request",
            method=request.method,
            path=request.url.path,
            client=request.client.host if request.client else "unknown",
        )

        try:
            response = await call_next(request)
        except Exception as exc:
            logger.error("http.unhandled_exception", error=str(exc))
            raise
        finally:
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
            logger.info(
                "http.response",
                status_code=getattr(response, "status_code", 0),
                duration_ms=duration_ms,
            )
            structlog.contextvars.unbind_contextvars("request_id")

        response.headers["X-Request-ID"] = request_id
        return response
