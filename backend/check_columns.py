from sqlmodel import create_engine, inspect
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def check_task_columns():
    inspector = inspect(engine)
    columns = inspector.get_columns('task')
    print("Columns in 'task' table:")
    for column in columns:
        print(f"- {column['name']} ({column['type']})")

if __name__ == "__main__":
    check_task_columns()
