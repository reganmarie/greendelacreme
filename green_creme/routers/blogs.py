from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.blogs import (
    BlogIn,
    BlogOut,
    BlogQueries,
    Error,
    BlogOutWithAccount,
)

router = APIRouter()


@router.post("/blogs", response_model=Union[BlogOut, Error])
def create_blog(
    info: BlogIn,
    response: Response,
    blog: BlogQueries = Depends(),
):
    try:
        if not info.title or not info.body:
            response.status_code = 400
            return {"message": "Could not create a blog :("}
        return blog.create(info)
    except Exception:
        response.status_code = 400
        return {"message": "Could not create a blog :("}


@router.get("/blogs", response_model=Union[List[BlogOutWithAccount], Error])
def get_all_blogs(
    response: Response,
    blog: BlogQueries = Depends(),
):
    try:
        return blog.get_all()
    except:
        response.status_code = 400
        return {"message": "Could not retrieve blogs"}


@router.put("/blogs/{blog_id}", response_model=Union[BlogOut, Error])
def update_blog(
    blog_id: int,
    response: Response,
    blog: BlogIn,
    repo: BlogQueries = Depends(),
):
    try:
        repo.get_one(blog_id)
        try:
            return repo.update(blog_id, blog)
        except Exception:
            response.status_code = 400
            return {"message": "Unfortunate, but could not update the blog"}
    except:
        response.status_code = 404
        return {"message": f"Blog with id {blog_id} not found"}


@router.get(
    "/blogs/{blog_id}", response_model=Union[BlogOutWithAccount, Error]
)
def get_blog_details(
    blog_id: int,
    response: Response,
    repo: BlogQueries = Depends(),
) -> Union[BlogOutWithAccount, Error]:
    try:
        return repo.get_one(blog_id)
    except:
        response.status_code = 404
        return {"message": "Blog does not exist"}
