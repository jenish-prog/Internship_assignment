from sqlmodel import Session, select
from backend.database import engine
from backend.models import User
from backend.auth import get_password_hash

def test_create_user(username, email, password):
    with Session(engine) as session:
        # Check if exists
        user = session.exec(select(User).where(User.username == username)).first()
        if user:
            print(f"❌ User '{username}' already exists.")
            return

        user_email = session.exec(select(User).where(User.email == email)).first()
        if user_email:
            print(f"❌ Email '{email}' already exists.")
            return

        # Create
        hashed_password = get_password_hash(password)
        new_user = User(username=username, email=email, hashed_password=hashed_password)
        
        try:
            session.add(new_user)
            session.commit()
            print(f"✅ Successfully created user: {username} ({email})")
        except Exception as e:
            print(f"❌ Failed to create user: {e}")

if __name__ == "__main__":
    # Content of test
    test_create_user("debug_user", "debug@example.com", "password123")
