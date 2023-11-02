from fastapi import FastAPI
from routers import users, posts, favorites, reviews, status
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os
from cronjobs.jobs import scheduler


app = FastAPI()

scheduler.start()

app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(users.router, tags=["User"])
app.include_router(posts.router, tags=["Posts"])
app.include_router(favorites.router, tags=["Favorites"])
app.include_router(reviews.router, tags=["Reviews"])
app.include_router(status.router, tags=["Status"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
