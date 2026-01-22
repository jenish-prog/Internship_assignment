import os
import getpass
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

# Possible connection strings to try
common_urls = [
    # 1. Current Env (might fail if user didn't update)
    os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/internship_app"),
    # 2. Postgres user, no password (common on Mac/Postgres.app)
    "postgresql://postgres@localhost:5432/internship_app",
    # 3. System user, no password (common on Homebrew/Mac)
    f"postgresql://{getpass.getuser()}@localhost:5432/internship_app",
    # 4. Postgres user, 'postgres' password
    "postgresql://postgres:postgres@localhost:5432/internship_app",
]

print("Attempting to connect to PostgreSQL...")

found_url = None

for url in common_urls:
    if not url: continue
    # Mask password for printing
    masked_url = url
    if ":" in url.split("@")[0]:
         prefix = url.split("@")[0]
         # rough masking
         pass
    
    print(f"Trying: {url} ...")
    try:
        engine = create_engine(url)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print(f"✅ SUCCESS! Connected with: {url}")
        found_url = url
        break
    except Exception as e:
        print(f"❌ Failed: {e}")

if found_url:
    print(f"\nRECOMMENDED FIX: Update backend/.env to use:\nDATABASE_URL={found_url}")
else:
    print("\nCould not find a working connection configuration. Please verify your PostgreSQL password.")
