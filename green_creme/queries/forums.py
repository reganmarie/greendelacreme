from pydantic import BaseModel
from datetime import datetime
from typing import Optional
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


class ThreadRepository:
    def get_all(self) -> List[ThreadOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

        except Exception:
            return {"message": "Could not retrieve "}



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
