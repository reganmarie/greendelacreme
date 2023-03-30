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
