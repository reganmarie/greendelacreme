from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union

from queries.replies import (
    ReplyIn,
    ReplyRepository,
    ReplyOut,
    ReplyOutUser,
    Error)

router = APIRouter()

@router.post("/replies", response_model=Union[ReplyOut, Error])
def create_reply(
    reply: ReplyIn,
    response:Response,
    repo: ReplyRepository = Depends(),
    account_data : dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(reply, account_data["id"])
    except:
        response.status_code = 400
        return {"message": "Could not create reply"}
