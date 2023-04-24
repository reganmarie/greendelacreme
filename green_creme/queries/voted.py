# from pydantic import BaseModel
# from typing import Optional, List, Union
# from datetime import datetime
# from .pool import pool


# class VotedIn(BaseModel):
#     reply_id: int
#     vote_type: int


# class VotedOut(BaseModel):
#     id: int
#     vote_type: int
#     ballot: bool
#     reply_id: int
#     author_id: int


# class VoteRepository():

#     def upvote( self, VotedIn, reply_id: int) -> VotedOut:
#         with pool.connection() as conn:
#           with conn.cursor() as db:
#               result = db.execute(
#                   """
#                   update reply set rating = rating + 1;
#                   """
#               )
