from datetime import datetime, timedelta
from typing import Optional, Dict, Any, Tuple
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def compare_passwords(password: str, hashed_password: str) -> bool:
    """Compare a plain password with a hashed password"""
    return pwd_context.verify(password, hashed_password)


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)


def set_time_expired(number: int, unit: str) -> Optional[Tuple[datetime, str]]:
    """
    Set expiration time based on number and unit

    Args:
        number: Number of time units
        unit: 'm' for minutes, 'h' for hours, 'd' for days

    Returns:
        Tuple of (expiration_time, time_string) or None if invalid unit
    """
    if unit == "m":
        times = datetime.now() + timedelta(minutes=number)
        string_time = f"{number}m"
        return times, string_time
    elif unit == "h":
        times = datetime.now() + timedelta(hours=number)
        string_time = f"{number}h"
        return times, string_time
    elif unit == "d":
        times = datetime.now() + timedelta(days=number)
        string_time = f"{number}d"
        return times, string_time

    return None
