from fastapi import APIRouter, Depends, HTTPException
from typing import Union, List
from authenticator import authenticator
from queries.comments import (
    CommentIn,
    CommentOut,
    CommentQueries,
    Error,
    CommentOutWithAccount,
)
from queries.blogs import BlogQueries

router = APIRouter()


@router.post("/comments", response_model=Union[CommentOut, Error])
def create_comment(
    info: CommentIn,
    comment: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if not info.response:
            raise HTTPException(
                status_code=400,
                detail="Response is required",
            )
        return comment.create(info, account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not create a comment",
        )


@router.get(
    "/comments", response_model=Union[List[CommentOutWithAccount], Error]
)
def get_comments_for_one_blog(
    blog_id: int,
    comment: CommentQueries = Depends(),
    blog: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        blog.get_one(blog_id)
        try:
            return comment.get_all_for_one_blog(blog_id)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Could not retrieve comments",
            )
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Blog does not exist",
        )


@router.delete("/comments/{comment_id}", response_model=Union[bool, Error])
def delete_comment(
    comment_id: int,
    comment: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return comment.delete(comment_id)
