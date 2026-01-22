from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db

app = FastAPI(title="Scalable Web App Backend")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

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

from .routes import auth, users, tasks
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
