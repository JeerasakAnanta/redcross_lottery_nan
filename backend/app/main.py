import os
import socket
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from core.database import engine
from models import user, lottery

from routers import (
    user as user_router,
    lottery as lottery_router,
    reward as reward_router,
)

# Create database tables
user.Base.metadata.create_all(bind=engine)
lottery.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Red Cross Lottery API",
    description="A lottery management system with authentication and reward checking",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router.router, tags=["users"])
app.include_router(lottery_router.router, tags=["lotteries"])
app.include_router(reward_router.router, tags=["rewards"])

@app.get("/")
async def root():
    return {"message": f"Hello from the server running on {socket.gethostname()}"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}
