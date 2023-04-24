from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.forums import ThreadRepository
from queries.replies import (
    ReplyIn,
    ReplyRepository,
    ReplyOut,
    ReplyOutUser,
    Error,
)

router = APIRouter()


@router.post("/replies", response_model=Union[ReplyOut, Error])
def create_reply(
    reply: ReplyIn,
    response: Response,
    repo: ReplyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(reply, account_data["id"])
    except Exception:
        response.status_code = 400
        return {"message": "Could not create reply"}


@router.get("/replies", response_model=Union[List[ReplyOutUser], Error])
def get_thread_replies(
    forum_id: int,
    response: Response,
    reply_repo: ReplyRepository = Depends(),
    forum_repo: ThreadRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        forum_repo.get_one(forum_id)
        try:
            if len(reply_repo.get_replies(forum_id)) == 0:
                return {"message": "No replies exist for this thread"}
            return reply_repo.get_replies(forum_id)
        except Exception:
            response.status_code = 400
            return {"message": "Could not retrieve the replies for thread"}
    except Exception:
        response.status_code = 404
        return {"message": "Could not receive any forum by that id"}


@router.delete("/replies/{reply_id}", response_model=Union[bool, Error])
def delete_reply(
    reply_id: int,
    response: Response,
    reply_repo: ReplyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return reply_repo.delete(reply_id)
    except Exception:
        response.status_code = 404
        return {"message": "Could not find nor delete reply with that id"}
