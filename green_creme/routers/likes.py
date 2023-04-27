from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Union, List
from authenticator import authenticator
from queries.likes import (
    LikeOut,
    LikeQueries,
    Error,
    LikeOutWithAccount,
)
from queries.blogs import BlogQueries

router = APIRouter()


@router.post("/likes", response_model=Union[LikeOut, Error])
def create_like(
    blog_id: int,
    like: LikeQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return like.create(account_data["id"], blog_id)
    except Exception as e:
        if "duplicate" in str(e):
            raise HTTPException(
                status_code=400,
                detail="You already liked that blog",
            )
        elif "not present" in str(e):
            raise HTTPException(
                status_code=404,
                detail="Blog does not exist",
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Could not create a like for that blog",
            )


@router.get("/likes", response_model=Union[List[LikeOutWithAccount], Error])
def get_likes_for_one_blog(
    blog_id: int,
    like: LikeQueries = Depends(),
    blog: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        blog.get_one(blog_id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Blog does not exist",
        )
    try:
        return like.get_all_for_one_blog(blog_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not retrieve likes for that blog",
        )


@router.delete("/likes/{like_id}", response_model=Union[bool, Error])
def delete_like(
    like_id: int,
    response: Response,
    like: LikeQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        result = like.get_one(like_id)
        if account_data["id"] == result.account_id:
            return like.delete(like_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this like"}
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Like does not exist",
        )
