from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from queries.forums import (
    Error,
    ThreadIn,
    ThreadRepository,
    ThreadOut,
    ThreadAccountOut,
)
from typing import Union, List


router = APIRouter()


@router.post("/forum", response_model=Union[ThreadOut, Error])
def create_thread(
    thread: ThreadIn,
    response: Response,
    repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if thread.title == "" or thread.body == "":
        response.status_code = 400
        return {"message": "Could not create forum"}
    try:
        return repo.create(thread, account_data["id"])
    except Exception:
        response.status_code = 400
        return {"message": "Could not create forum"}


@router.get("/forum", response_model=Union[Error, List[ThreadAccountOut]])
def get_all_threads(
    response: Response,
    repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if len(repo.get_all()) == 0:
        return {"message": "No threads exist"}
    try:
        return repo.get_all()
    except Exception:
        response.status_code = 400
        return {"message": "Could not retrieve threads"}


@router.get("/forum/{forum_id}", response_model=Union[Error, ThreadAccountOut])
def get_thread_details(
    forum_id: int,
    response: Response,
    repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ThreadAccountOut:
    try:
        return repo.get_one(forum_id)
    except Exception:
        response.status_code = 404
        return {"message": "Could not receive the thread by that id"}


@router.put("/forum/{forum_id}", response_model=Union[ThreadOut, Error])
def update_thread(
    forum_id: int,
    forum: ThreadIn,
    response: Response,
    repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ThreadOut, Error]:
    try:
        result = repo.get_one(forum_id)
        if account_data["id"] == result.author_id:
            try:
                return repo.update(forum_id, forum, result.author_id)
            except Exception:
                response.status_code = 400
                return {"message": "Could not update forum"}
        else:
            response.status_code = 401
            return {
                "message": "You are not authorized to update this forum thread"
            }
    except Exception:
        response.status_code = 404
        return {"message": f"Forum with id {forum_id} not found"}


@router.delete("/forum/{forum_id}", response_model=Union[bool, Error])
def delete_thread(
    forum_id: int,
    response: Response,
    repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        result = repo.get_one(forum_id)
        if account_data["id"] == result.author_id:
            return repo.delete(forum_id)
        else:
            response.status_code = 401
            return {
                "message": "You are not authorized to delete this forum thread"
            }
    except Exception:
        response.status_code = 404
        return False
