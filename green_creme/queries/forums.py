from pydantic import BaseModel
from typing import Optional

from queries.pool import pool


class ThreadIn(BaseModel):
    title: str
    body: str
    image: Optional[str]


class ThreadRepository:
    def create(thread: ThreadIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into forum
                        (title, body, image)
                    values
                        (%s,%s,%s)
                    returning id;
                    """,
                    [thread.title, thread.body, thread.image],
                )
                print(result)
