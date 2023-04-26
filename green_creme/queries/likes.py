from pydantic import BaseModel
from typing import List, Union
from .pool import pool


class Error(BaseModel):
    message: str


class LikeOut(BaseModel):
    id: int
    account_id: int
    blog_id: int


class LikeOutWithAccount(LikeOut):
    username: str


class LikeQueries:
    def record_to_like_out(self, record):
        return LikeOutWithAccount(
            id=record[0],
            account_id=record[1],
            blog_id=record[2],
            username=record[3],
        )

    def create(
        self,
        account_id: int,
        blog_id: int,
    ) -> Union[LikeOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO likes (
                        account_id,
                        blog_id
                    )
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [
                        account_id,
                        blog_id,
                    ],
                )
                id = result.fetchone()[0]
                return LikeOut(
                    id=id,
                    account_id=account_id,
                    blog_id=blog_id,
                )

    def get_all_for_one_blog(
        self,
        blog_id: int,
    ) -> Union[List[LikeOutWithAccount], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT l.id,
                    l.account_id, l.blog_id,
                    a.username
                    FROM likes AS l
                    LEFT JOIN accounts AS a
                    ON l.account_id = a.id
                    WHERE l.blog_id = %s;
                    """,
                    [blog_id],
                )
                return [self.record_to_like_out(record) for record in result]

    def delete(self, like_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM likes
                    WHERE id = %s;
                    """,
                    [like_id],
                )
                return True

    def get_one(self, like_id: int) -> Union[LikeOutWithAccount, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT l.id,
                    l.account_id, l.blog_id,
                    a.username
                    FROM likes AS l
                    LEFT JOIN accounts AS a
                    ON l.account_id = a.id
                    WHERE l.id = %s;
                    """,
                    [like_id],
                )
                record = result.fetchone()
                return self.record_to_like_out(record)
