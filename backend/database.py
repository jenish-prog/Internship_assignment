from sqlmodel import SQLModel, Session
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Load environment variables from .env file (for local development)
load_dotenv()

# 1. Try to get the URL from either standard variable name
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL")

# 2. DEBUGGING: Print what we found (check your logs for this!)
if DATABASE_URL is None:
    print("❌ ERROR: DATABASE_URL is missing! Check Railway Variables.")
else:
    print(f"✅ FOUND URL: {DATABASE_URL[:10]}...") # Prints first 10 chars only

# 3. FIX: Replace 'postgres://' with 'postgresql://' for SQLAlchemy
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 4. Create the engine (Only if URL exists)
if DATABASE_URL:
    engine = create_engine(DATABASE_URL, echo=True)
else:
    # This prevents the "None" crash and gives a clear error instead
    raise ValueError("No DATABASE_URL found in environment variables")

def init_db():
    import models  # Absolute import for safety
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
