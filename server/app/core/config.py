import os
from dataclasses import dataclass, field
from typing import List

@dataclass
class Settings:
    APP_NAME: str = "Phishing Detector API"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    CORS_ORIGINS: List[str] = field(default_factory=lambda: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "*"
    ])
    MODEL_PATH: str = os.path.join(os.path.dirname(__file__), "..", "ml", "model.pkl")

settings = Settings()
