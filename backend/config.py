import os
from dotenv import load_dotenv

load_dotenv()

# Base directory of the project
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # ==========================
    # Database Configuration
    # ==========================
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ==========================
    # Security
    # ==========================
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    # ==========================
    # File Upload Configuration
    # ==========================
    UPLOAD_FOLDER = os.path.join(
        BASE_DIR,
        "uploads",
        "data_sources"
    )

    MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100 MB


# Create upload directory automatically
os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)