from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "MITS ONE"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Institution
    INSTITUTION_NAME: str = "Madhav Institute of Technology and Science, Gwalior"
    DEPARTMENT_NAME: str = "Mathematics and Computing"
    PROJECT_MENTOR: str = "Dr. Dheeraj Dixit (HOD)"
    TEAM_MEMBERS: List[str] = [
        "Adarsh Patel — BTMC25O1008 (Frontend & UI)",
        "Atul Kushwah — BTMC25O1034 (Backend & DB)"
    ]

    # Security
    SECRET_KEY: str = "mits-one-super-secret-development-security-key-team-nexora"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database — Absolute path rooted at backend directory so CWD changes do not create split DBs
    DATABASE_URL: str = f"sqlite:///{os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'mits_one.db')).replace(chr(92), '/')}"

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"

    # AI Configuration
    GEMINI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

settings = Settings()
