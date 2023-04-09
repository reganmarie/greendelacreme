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


class BlogOut(BaseModel):
    id: int
    title: str
    body: str
    image: Optional[str]
    created_on: datetime = datetime.now()
    author_id: int


class BlogOutWithAccount(BlogOut):
    username: str
    avatar: str
    first: str
    last: str


class BlogQueries:
    def get_all(self) -> Union[List[BlogOutWithAccount], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT b.id, b.title,
                    b.body, b.image,
                    b.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific',
                    b.author_id,
                    a.username, a.avatar,
                    a.first, a.last
                    FROM blog AS b
                    LEFT JOIN accounts AS a
                    ON a.id = b.author_id
                    ORDER BY created_on DESC;
                    """
                )
                return [self.record_to_blog_out(record) for record in result]

    def create(
        self,
        blog: BlogIn,
        account_id: int,
    ) -> Union[BlogOut, Error]:
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
                        account_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.blog_in_to_out(
                    id,
                    blog,
                    account_id,
                )

    def blog_in_to_out(
        self,
        id: int,
        blog: BlogIn,
        account_id: int,
    ) -> BlogOut:
        old_data = blog.dict()
        return BlogOut(
            id=id,
            **old_data,
            author_id=account_id,
        )

    def record_to_blog_out(self, record):
        return BlogOutWithAccount(
            id=record[0],
            title=record[1],
            body=record[2],
            image=record[3],
            created_on=record[4],
            author_id=record[5],
            username=record[6],
            avatar=record[7],
            first=record[8],
            last=record[9],
        )

    def update(
        self,
        blog_id: int,
        blog: BlogIn,
        author_id: int,
    ) -> Union[BlogOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE blog
                    SET title = %s
                        , body = %s
                        , image = %s
                    WHERE id = %s;
                    """,
                    [
                        blog.title,
                        blog.body,
                        blog.image,
                        blog_id,
                    ],
                )
                return self.blog_in_to_out(
                    blog_id,
                    blog,
                    author_id,
                )

    def get_one(self, blog_id: int) -> Optional[BlogOutWithAccount]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT b.id, b.title,
                    b.body, b.image,
                    b.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific', b.author_id,
                    a.username, a.avatar,
                    a.first, a.last
                    FROM blog AS b
                    LEFT JOIN accounts AS a
                    ON a.id = b.author_id
                    WHERE b.id = %s;
                    """,
                    [blog_id],
                )
                record = result.fetchone()
                return self.record_to_blog_out(record)

    def delete(self, blog_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM blog
                    WHERE id = %s;
                    """,
                    [blog_id],
                )
                return True
