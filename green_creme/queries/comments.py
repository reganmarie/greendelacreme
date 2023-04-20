from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from .pool import pool


class Error(BaseModel):
    message: str


class CommentIn(BaseModel):
    blog_id: int
    response: str
    image: Optional[str]


class CommentOut(BaseModel):
    id: int
    author_id: int
    blog_id: int
    response: str
    image: Optional[str]
    created_on: datetime = datetime.now()


class CommentOutWithAccount(CommentOut):
    username: str
    avatar: str
    first: str
    last: str


class CommentQueries:
    def comment_in_to_out(
        self,
        id: int,
        comment: CommentIn,
        account_id: int,
    ) -> CommentOut:
        old_data = comment.dict()
        return CommentOut(
            id=id,
            **old_data,
            author_id=account_id,
        )

    def record_to_comment_out(self, record):
        return CommentOutWithAccount(
            id=record[0],
            author_id=record[1],
            blog_id=record[2],
            response=record[3],
            image=record[4],
            created_on=record[5],
            username=record[6],
            avatar=record[7],
            first=record[8],
            last=record[9],
        )

    def create(
        self,
        comment: CommentIn,
        account_id: int,
    ) -> Union[CommentOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO comment (
                        author_id,
                        blog_id,
                        response,
                        image
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, created_on;
                    """,
                    [
                        account_id,
                        comment.blog_id,
                        comment.response,
                        comment.image,
                    ],
                )
                id = result.fetchone()[0]
                return self.comment_in_to_out(
                    id,
                    comment,
                    account_id,
                )

    def get_all_for_one_blog(
        self, blog_id: int
    ) -> Union[List[CommentOutWithAccount], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT c.id, c.author_id,
                    c.blog_id, c.response,
                    c.image,
                    c.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific',
                    a.username, a.avatar,
                    a.first, a.last
                    FROM comment AS c
                    LEFT JOIN accounts AS a
                    ON a.id = c.author_id
                    WHERE c.blog_id = %s;
                    """,
                    [blog_id],
                )
                return [
                    self.record_to_comment_out(record) for record in result
                ]
