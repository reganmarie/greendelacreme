from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union, List
from authenticator import authenticator
from queries.blogs import (
    BlogIn,
    BlogOut,
    BlogQueries,
    Error,
    BlogOutWithAccount,
    MostLiked,
)

router = APIRouter()


@router.post("/blogs", response_model=Union[BlogOut, Error])
def create_blog(
    info: BlogIn,
    response: Response,
    blog: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if not info.title or not info.body:
            response.status_code = 400
            return {"message": "Could not create a blog :("}
        return blog.create(info, account_data["id"])
    except Exception:
        response.status_code = 400
        return {"message": "Could not create a blog :("}


@router.get("/blogs", response_model=Union[List[BlogOutWithAccount], Error])
def get_all_blogs(
    response: Response,
    blog: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return blog.get_all()
    except Exception:
        response.status_code = 400
        return {"message": "Could not retrieve blogs"}


@router.put("/blogs/{blog_id}", response_model=Union[BlogOut, Error])
def update_blog(
    blog_id: int,
    response: Response,
    blog: BlogIn,
    repo: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_one(blog_id)
        if account_data["id"] == result.author_id:
            try:
                return repo.update(blog_id, blog, result.author_id)
            except Exception:
                response.status_code = 400
                return {
                    "message": "Unfortunate, but could not update the blog"
                }
        else:
            response.status_code = 401
            return {"message": "You are not authorized to update this blog"}
    except Exception:
        response.status_code = 404
        return {"message": f"Blog with id {blog_id} not found"}


@router.get(
    "/blogs/{blog_id}", response_model=Union[BlogOutWithAccount, Error]
)
def get_blog_details(
    blog_id: int,
    response: Response,
    repo: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[BlogOutWithAccount, Error]:
    try:
        return repo.get_one(blog_id)
    except Exception:
        response.status_code = 404
        return {"message": "Blog does not exist"}


@router.delete("/blogs/{blog_id}", response_model=Union[bool, Error])
def delete_blog(
    blog_id: int,
    response: Response,
    repo: BlogQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        result = repo.get_one(blog_id)
        if account_data["id"] == result.author_id:
            return repo.delete(blog_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this blog"}
    except Exception:
        response.status_code = 404
        return {"message": "Could not delete a blog by that ID."}


@router.get("/most_liked_blog", response_model=Union[MostLiked, Error])
def get_most_liked_blog(
    repo: BlogQueries = Depends(),
):
    try:
        return repo.get_most_liked()
    except Exception:
        raise HTTPException(
            status_code=400, detail="Could not get the most liked blog"
        )
