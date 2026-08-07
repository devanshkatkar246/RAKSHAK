import re


def is_valid_phone(phone: str) -> bool:
    """Validate Indian mobile phone number (+91 or 10 digits)."""
    pattern = r"^(\+91[\-\s]?)?[6-9]\d{9}$"
    return bool(re.match(pattern, phone.replace(" ", "")))


def is_valid_aadhaar(aadhaar: str) -> bool:
    """Validate 12-digit Aadhaar number (basic format check)."""
    return bool(re.match(r"^\d{12}$", aadhaar.replace(" ", "")))
