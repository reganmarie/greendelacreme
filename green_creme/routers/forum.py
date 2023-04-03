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


@router.post("/forum", response_model=Union[ThreadOut, Error])
def create_thread(
    thread: ThreadIn,
    response: Response,
    repo: ThreadRepository = Depends(),
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


@router.get("/forum/{forum_id}", response_model=Union[Error, ThreadAccountOut])
def get_thread_details(
    forum_id: int,
    response: Response,
    repo: ThreadRepository = Depends(),
) -> ThreadAccountOut:
    try:
        return repo.get_one(forum_id)
    except:
        response.status_code = 404
        return {"message": "Could not receive the thread by that id"}


@router.put("/forum/{forum_id}", response_model=Union[ThreadOut, Error])
def update_thread(
    forum_id: int,
    forum: ThreadIn,
    response: Response,
    repo: ThreadRepository = Depends(),
) -> Union[ThreadOut, Error]:
    try:
        repo.get_one(forum_id)
        try:
            return repo.update(forum_id, forum)
        except Exception:
            response.status_code = 400
            return {"message": "Could not update forum"}
    except:
        response.status_code = 404
        return {"message": f"Forum with id {forum_id} not found"}

@router.delete("/forum/{forum_id}", response_model=bool)
def delete_thread(
    forum_id: int,
    response: Response,
    repo: ThreadRepository = Depends(),
    ) -> bool:
    try:
        repo.get_one(forum_id)
        return repo.delete(forum_id)
    except Exception:
        response.status_code = 404
        return False
