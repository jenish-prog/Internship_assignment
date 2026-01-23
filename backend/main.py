from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from database import engine
import models

# ✅ FORCE CREATE TABLES (As requested, adapting for SQLModel)
SQLModel.metadata.create_all(bind=engine)

app = FastAPI(title="Scalable Web App Backend")

import os

# Default allowed origins (Local + Production)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://shimmering-renewal-production.up.railway.app",
]

# Extend with environment variable references if available
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    origins.extend([origin.strip() for origin in env_origins.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print(f"Error initializing database: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

from routes import auth, users, tasks
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
