from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Configure SQLite or PostgreSQL connection arguments
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# SQLAlchemy Engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base for ORM models
Base = declarative_base()

def get_db():
    """
    FastAPI dependency yielding a database session.
    Automatically closes the session after request finishes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
