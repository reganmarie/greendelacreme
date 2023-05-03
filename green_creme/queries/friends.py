from pydantic import BaseModel
from typing import List, Union
from .pool import pool


class Error(BaseModel):
    message: str


class FriendIn(BaseModel):
    friend_id: int


class FriendOut(BaseModel):
    id: int
    account_id: int
    friend_id: int
    status: str


class FriendQueries:
    def record_to_friend_out(self, record):
        return FriendOut(
            id=record[0],
            account_id=record[1],
            friend_id=record[2],
            status=record[3],
        )

    def create(self, account_id, friend: FriendIn) -> Union[FriendOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO friends (account_id, friend_id)
                    VALUES (%s, %s)
                    RETURNING id, status;
                    """,
                    [
                        friend.friend_id,
                        account_id,
                    ],
                )
                result = db.fetchone()
                id, status = result[0], result[1]
                return FriendOut(
                    id=id,
                    account_id=friend.friend_id,
                    friend_id=account_id,
                    status=status,
                )

    def get_all_friend_requests(
        self, account_id: int
    ) -> Union[List[FriendOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_id, friend_id, status
                    FROM friends
                    WHERE account_id = %s
                    AND status = 'pending';
                    """,
                    [account_id],
                )
                return [self.record_to_friend_out(record) for record in result]

    def get_one_friend_request(self, id: int) -> Union[FriendOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_id, friend_id, status
                    FROM friends
                    WHERE id = %s;
                    """,
                    [id],
                )
                record = result.fetchone()
                return self.record_to_friend_out(record)

    def accept_friend_request(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE friends
                    SET status = 'accepted'
                    WHERE id = %s;
                    """,
                    [id],
                )
                return True

    def deny_friend_request(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM friends
                    WHERE id = %s;
                    """,
                    [id],
                )
                return True

    def get_all_friends(
        self, account_id: int
    ) -> Union[List[FriendOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, account_id, friend_id, status
                    FROM friends
                    WHERE account_id = %s
                    AND status = 'accepted';
                    """,
                    [account_id],
                )
                return [self.record_to_friend_out(record) for record in result]
