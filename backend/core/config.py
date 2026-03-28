import os
from pydantic_settings import BaseSettings
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Database
    MYSQL_DATABASE: str = os.getenv("MYSQL_DATABASE", "")
    MYSQL_USERNAME: str = os.getenv("MYSQL_USERNAME", "")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "")
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "")
    MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")
    MYSQL_ROOT_PASSWORD: str = os.getenv("MYSQL_ROOT_PASSWORD", "")

    # Server
    NODE_HOST: str = "localhost"
    NODE_PORT: int = 8000

    # SSL
    SSL_KEY_PATH: Optional[str] = None
    SSL_CERT_PATH: Optional[str] = None
    
    # JWT
    JWT_SECRET: str = ""
    JWT_EXPIRE: str = "7d"

    # OCR Configuration
    OCR_EASYOCR_LANGUAGES: str = "en,th"  # Comma-separated language codes
    OCR_MIN_CONFIDENCE: float = 0.5

    class Config:
        env_file = ".env"

settings = Settings()