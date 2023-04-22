from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from .pool import pool
import logging
class ReplyIn(BaseModel):
    forum_id: int
    answer: str
    image: Optional[str]
    rating: Optional[int]


class ReplyOut(BaseModel):
    id: int
    author_id: int
    forum_id: int
    answer: str
    image: Optional[str]
    created_on : datetime = datetime.now()
    rating: int


class ReplyOutUser(ReplyOut):
    username: str
    avatar: str
    first: str
    last: str

class Error(BaseModel):
    message:str


class ReplyRepository:
    def reply_in_to_out(
            self,
            id: int,
            reply: ReplyIn,
            account_id: int,
    ) -> ReplyOut:
        old_data = reply.dict()
        return ReplyOut(
            id=id,
            **old_data,
            author_id=account_id
        )

    def create(
          self,
          reply: ReplyIn,
          account_id: int,
          ) -> Union[ReplyOut, Error]:
            with pool.connection() as conn:
              with conn.cursor() as db:
                try:
                  result = db.execute(
                    """
                    insert into reply
                    (forum_id, answer, image, author_id, rating)
                    values
                        (%s,%s,%s,%s, 0)
                    returning id, created_on;
                    """,
                    [
                      reply.forum_id,
                      reply.answer,
                      reply.image,
                      account_id,
                    ],
                  )
                  id = result.fetchone()[0]
                  return self.reply_in_to_out(
                              id,
                              reply,
                              account_id,
                  )
                except Exception as e:
                      logging.error(f"Error creating reply: {e}")
                      return Error(message="Could not create reply")
