from fastapi import APIRouter, Depends, Response
from queries.forums import Error, ThreadIn, ThreadRepository, ThreadOut
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




@router.get("/forum", response_model=List[ThreadOut])
def get_all_threads(
    repo: ThreadRepository = Depends(),
):
    return repo.get_all()
