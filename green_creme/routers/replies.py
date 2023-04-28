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
    reply_repo: ReplyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return reply_repo.create(reply, account_data["id"])
    except Exception:
        response.status_code = 400
        return {"message": "Could not create reply"}


@router.get("/replies/{reply_id}", response_model=Union[ReplyOutUser, Error])
def get_a_reply(
    reply_id: int,
    response: Response,
    reply_repo: ReplyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return reply_repo.get_one(reply_id)
    except Exception:
        response.status_code = 404
        return {"message": "Could not retrieve reply by that id"}


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


@router.put("/replies/{reply_id}", response_model=Union[ReplyOut, Error])
def update_reply(
    reply_id: int,
    reply: ReplyIn,
    response: Response,
    reply_repo: ReplyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = reply_repo.get_one(reply_id)
        if account_data["id"] == result.author_id:
            try:
                return reply_repo.update(reply_id, reply, result.author_id)
            except Exception:
                return {"message": "Could not update reply"}
        else:
            response.status_code = 401
            return {"message": "Your are not authorized to update this reply"}
    except Exception:
        response.status_code = 404
        return {"message": f"Reply with that id {reply_id} not found"}


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
