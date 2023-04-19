from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class ThreadIn(BaseModel):
    title: str
    body: str
    image: Optional[str]


class ThreadOut(BaseModel):
    id: int
    title: str
    body: str
    image: Optional[str]
    author_id: int
    created_on: datetime = datetime.now()


class ThreadAccountOut(ThreadOut):
    username: str
    avatar: str


class ThreadRepository:
    def record_to_thread_out(self, record):
        return ThreadAccountOut(
            id=record[0],
            title=record[1],
            body=record[2],
            image=record[3],
            author_id=record[4],
            created_on=record[5],
            username=record[6],
            avatar=record[7],
        )

    def get_all(self) -> Union[Error, List[ThreadAccountOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    Select f.id, f.title, f.body, f.image, f.author_id, f.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific', a.username, a.avatar
                    from forum f
                    inner join accounts a on f.author_id = a.id
                    order by created_on desc;
                    """
                )
                result = []
                for record in db:
                    thread = ThreadAccountOut(
                        id=record[0],
                        title=record[1],
                        body=record[2],
                        image=record[3],
                        author_id=record[4],
                        created_on=record[5],
                        username=record[6],
                        avatar=record[7],
                    )
                    result.append(thread)
                return result

    def create(
        self,
        thread: ThreadIn,
        account_id: int,
    ) -> ThreadOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into forum
                        (title, body, image, author_id)
                    values
                        (%s,%s,%s,%s)
                    returning id, created_on;
                    """,
                    [
                        thread.title,
                        thread.body,
                        thread.image,
                        account_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.forum_in_to_out(
                    id,
                    thread,
                    account_id,
                )

    def update(
        self,
        forum_id: int,
        forum: ThreadIn,
        author_id: int,
    ) -> ThreadOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE forum
                    SET title = %s
                        , body = %s
                        , image = %s
                    WHERE id = %s;
                    """,
                    [
                        forum.title,
                        forum.body,
                        forum.image,
                        forum_id,
                    ],
                )
        return self.forum_in_to_out(
            forum_id,
            forum,
            author_id,
        )

    def get_one(self, forum_id: int) -> Optional[ThreadAccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    Select f.id, f.title, f.body, f.image, f.author_id, f.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific', a.username, a.avatar
                    from forum f
                    inner join accounts a on f.author_id = a.id
                    where f.id = %s;
                    """,
                    [forum_id],
                )
                record = result.fetchone()
                return self.record_to_thread_out(record)

    def forum_in_to_out(
        self,
        id: int,
        thread: ThreadIn,
        account_id: int,
    ):
        old_data = thread.dict()
        return ThreadOut(
            id=id,
            **old_data,
            author_id=account_id,
        )

    def delete(self, forum_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM forum
                    WHERE id = %s;
                    """,
                    [forum_id],
                )
                return True
