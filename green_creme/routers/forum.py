from fastapi import APIRouter, Depends, Response
from queries.forums import (
    Error,
    ThreadIn,
    ThreadRepository,
    ThreadOut,
    ThreadAccountOut,
)
from typing import Union, List

router = APIRouter()


@router.post("/forum/", response_model=Union[ThreadOut, Error])
def create_thread(
    thread: ThreadIn, response: Response, repo: ThreadRepository = Depends()
):
    if thread.title == "" or thread.body == "":
        response.status_code = 400
        return {"message": "Could not create forum"}
    try:
        return repo.create(thread)
    except:
        response.status_code = 400
        return {"message": "Could not create forum"}


@router.get("/forum", response_model=Union[Error, List[ThreadAccountOut]])
def get_all_threads(
    response: Response,
    repo: ThreadRepository = Depends(),
):
    if len(repo.get_all()) == 0:
        return {"message": "No threads exist"}
    try:
        return repo.get_all()
    except:
        response.status_code = 400
        return {"message": "Could not retrieve threads"}
