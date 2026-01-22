from sqlmodel import create_engine, inspect
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def check_tables():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Tables found: {tables}")
    
    required = {"user", "task"}
    missing = required - set(tables)
    
    if missing:
        print(f"❌ MISSING TABLES: {missing}")
    else:
        print("✅ All required tables exist.")

if __name__ == "__main__":
    check_tables()
