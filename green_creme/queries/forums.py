from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ThreadIn(BaseModel):
    title: str
    body: str
    image: Optional[str]
    author_id: int


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
    def get_all(self) -> Union[Error, List[ThreadAccountOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        Select f.id, f.title, f.body, f.image, f.author_id, f.created_on, a.username, a.avatar
                        from forum f
                        left join accounts a on f.author_id = a.id;
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

    def create(self, thread: ThreadIn) -> ThreadOut:
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
                        thread.author_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.forum_in_to_out(id, thread)

    def forum_in_to_out(self, id: int, thread: ThreadIn):
        old_data = thread.dict()
        return ThreadOut(id=id, **old_data)
