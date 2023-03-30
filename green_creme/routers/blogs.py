from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.blogs import BlogIn, BlogOut, BlogQueries, Error

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
