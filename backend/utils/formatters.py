from datetime import datetime, timezone
import pytz


IST = pytz.timezone("Asia/Kolkata")


def format_date_ist(dt: datetime, fmt: str = "%d %b %Y, %I:%M %p") -> str:
    """Format a UTC datetime to human-readable IST string."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    ist_dt = dt.astimezone(IST)
    return ist_dt.strftime(fmt)


def humanize_duration(seconds: float) -> str:
    """Return human readable duration from seconds."""
    if seconds < 60:
        return f"{int(seconds)}s"
    if seconds < 3600:
        return f"{int(seconds // 60)}m {int(seconds % 60)}s"
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    return f"{hours}h {minutes}m"
