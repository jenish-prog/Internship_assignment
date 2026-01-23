from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models import UserRead
from auth import get_current_user
from models import User

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserRead)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

from models import UserUpdate
from auth import get_password_hash

@router.patch("/me", response_model=UserRead)
def update_user_me(
    user_update: UserUpdate, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    if user_update.username:
        current_user.username = user_update.username
    if user_update.email:
        current_user.email = user_update.email
    if user_update.password:
        current_user.hashed_password = get_password_hash(user_update.password)
    
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user
