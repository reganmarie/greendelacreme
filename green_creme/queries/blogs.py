from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from .pool import pool


class Error(BaseModel):
    message: str


class BlogIn(BaseModel):
    title: str
    body: str
    image: Optional[str]
    author_id: int


class BlogOut(BaseModel):
    id: int
    title: str
    image: Optional[str]
    body: str
    created_on: datetime = datetime.now()
    author_id: int


class BlogQueries:
    def create(self, blog: BlogIn) -> Union[BlogOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO blog (title, body, image, author_id)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, created_on;
                    """,
                    [
                        blog.title,
                        blog.body,
                        blog.image,
                        blog.author_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.blog_in_to_out(id, blog)

    def blog_in_to_out(self, id: int, blog: BlogIn) -> BlogOut:
        old_data = blog.dict()
        return BlogOut(id=id, **old_data)
