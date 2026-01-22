from sqlmodel import Session, select
from backend.database import engine
from backend.models import User

def list_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        print(f"Found {len(users)} users:")
        for user in users:
            print(f"- ID: {user.id} | Username: {user.username} | Email: {user.email}")

if __name__ == "__main__":
    list_users()
