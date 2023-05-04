from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Union, List
from authenticator import authenticator
from queries.friends import (
    FriendQueries,
    FriendIn,
    FriendOut,
    FriendOutWithUser,
    Error,
)
from queries.accounts import AccountRepository

router = APIRouter()


@router.post("/friends", response_model=Union[FriendOut, Error])
def create_friend_request(
    friend_id: FriendIn,
    response: Response,
    friend: FriendQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        friends = friend.get_all_friends(account_data["id"])
        friend_ids = [friend.friend_id for friend in friends]
        friend_requests = friend.get_all_friend_requests(account_data["id"])
        friend_request_ids = [request.friend_id for request in friend_requests]
        if friend_id.friend_id in friend_ids:
            response.status_code = 400
            return {"message": "You're already friends with this user"}
        elif friend_id.friend_id in friend_request_ids:
            response.status_code = 400
            return {"message": "This user already sent you a friend request"}
        elif account_data["id"] == friend_id.friend_id:
            response.status_code = 400
            return {"message": "You can't request to be friends with yourself"}
        return friend.create(account_data["id"], friend_id)
    except Exception as e:
        if "duplicate" in str(e):
            raise HTTPException(
                status_code=400,
                detail="You already sent that user a friend request",
            )
        elif "not present" in str(e):
            raise HTTPException(
                status_code=404,
                detail="User does not exist",
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Could not send friend request to that user",
            )


@router.get(
    "/friend_requests", response_model=Union[List[FriendOutWithUser], Error]
)
def get_all_friend_requests(
    account_id: int,
    friend: FriendQueries = Depends(),
    account: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account.get_one(account_id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Account does not exist",
        )
    try:
        return friend.get_all_friend_requests(account_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not retrieve friend requests",
        )


@router.get("/friends/{id}", response_model=Union[FriendOutWithUser, Error])
def get_one_friend_request(
    id: int,
    friend: FriendQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[FriendOut, Error]:
    try:
        return friend.get_one_friend_request(id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Request does not exist",
        )


@router.patch("/friends/{id}", response_model=Union[bool, Error])
def accept_friend_request(
    id: int,
    friend: FriendQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        request = friend.get_one_friend_request(id)
        if account_data["id"] == request.account_id:
            try:
                result = friend.accept_friend_request(id)
                print(result)
                return friend.create_reverse(
                    result.account_id, result.friend_id
                )
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="There's an error! You can't accept this request",
                )
        else:
            raise HTTPException(
                status_code=401,
                detail="You are not authorized to accept this request",
            )
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Request does not exist",
        )


@router.delete("/friends/{id}", response_model=Union[bool, Error])
def deny_friend_request(
    id: int,
    friend: FriendQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        request = friend.get_one_friend_request(id)
        if account_data["id"] == request.account_id:
            try:
                return friend.deny_friend_request(id)
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="There's an error! You can't deny this request",
                )
        else:
            raise HTTPException(
                status_code=401,
                detail="You are not authorized to deny this request",
            )
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Request does not exist",
        )


@router.get("/friends", response_model=Union[List[FriendOutWithUser], Error])
def get_all_friends(
    account_id: int,
    friend: FriendQueries = Depends(),
    account: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account.get_one(account_id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Account does not exist",
        )
    try:
        return friend.get_all_friends(account_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not retrieve friend requests",
        )
