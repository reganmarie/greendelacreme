from fastapi import FastAPI
from routers import forum, blogs
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(forum.router)
app.include_router(blogs.router)


# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  adding a cookie from the request response
# @app.post("/cookie-and-object/")
# def create_cookie(response: Response):
#     response.set_cookie(key="fakesession", value="fake-cookie-session-value")
#     return {"message": "Come to the dark side, we have cookies"}
