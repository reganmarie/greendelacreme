from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Union, List
from authenticator import authenticator
from queries.comments import (
    CommentIn,
    CommentInWithBlog,
    CommentOut,
    CommentQueries,
    Error,
    CommentOutWithAccount,
)
from queries.blogs import BlogQueries

router = APIRouter()


@router.post("/comments", response_model=Union[CommentOut, Error])
def create_comment(
    info: CommentInWithBlog,
    response: Response,
    comment: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if not info.response:
            response.status_code = 400
            return {"message": "Response is required"}
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
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Blog does not exist",
        )
    try:
        return comment.get_all_for_one_blog(blog_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not retrieve comments",
        )


@router.delete("/comments/{comment_id}", response_model=Union[bool, Error])
def delete_comment(
    comment_id: int,
    response: Response,
    comment: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        result = comment.get_one(comment_id)
        if account_data["id"] == result.author_id:
            return comment.delete(comment_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this comment"}
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Comment does not exist",
        )


@router.put("/comments/{comment_id}", response_model=Union[CommentOut, Error])
def update_comment(
    comment_id: int,
    response: Response,
    comment: CommentIn,
    repo: CommentQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_one(comment_id)
        if account_data["id"] == result.author_id:
            try:
                return repo.update(
                    comment_id, comment, result.author_id, result.blog_id
                )
            except Exception:
                response.status_code = 400
                return {"message": "Could not update this comment"}
        else:
            response.status_code = 401
            return {"message": "You are not authorized to update this comment"}
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Comment does not exist",
        )
