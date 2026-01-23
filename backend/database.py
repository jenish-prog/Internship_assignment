from sqlmodel import SQLModel, Session
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Get the variable
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. FIX: Replace 'postgres://' with 'postgresql://' if needed
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 3. Create the engine
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    from . import models  # noqa: F401
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
