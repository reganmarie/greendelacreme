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


class FriendOutWithUser(FriendOut):
    username: str


class FriendQueries:
    def record_to_friend_out(self, record):
        return FriendOutWithUser(
            id=record[0],
            account_id=record[1],
            friend_id=record[2],
            status=record[3],
            username=record[4],
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
    ) -> Union[List[FriendOutWithUser], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT f.id, f.account_id,
                    f.friend_id, f.status,
                    a.username
                    FROM friends AS f
                    LEFT JOIN accounts AS a
                    ON f.friend_id = a.id
                    WHERE f.account_id = %s
                    AND status = 'pending';
                    """,
                    [account_id],
                )
                return [self.record_to_friend_out(record) for record in result]

    def get_one_friend_request(
        self, id: int
    ) -> Union[FriendOutWithUser, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT f.id, f.account_id,
                    f.friend_id, f.status,
                    a.username
                    FROM friends AS f
                    LEFT JOIN accounts AS a
                    ON f.friend_id = a.id
                    WHERE f.id = %s;
                    """,
                    [id],
                )
                record = result.fetchone()
                return self.record_to_friend_out(record)

    def accept_friend_request(self, id: int) -> FriendOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE friends
                    SET status = 'accepted'
                    WHERE id = %s
                    RETURNING *;
                    """,
                    [id],
                )
                record = db.fetchone()
                return FriendOut(
                    id=record[0],
                    account_id=record[1],
                    friend_id=record[2],
                    status=record[3],
                )

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
    ) -> Union[List[FriendOutWithUser], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT f.id, f.account_id,
                    f.friend_id, f.status,
                    a.username
                    FROM friends AS f
                    LEFT JOIN accounts AS a
                    ON f.friend_id = a.id
                    WHERE f.account_id = %s
                    AND status = 'accepted';
                    """,
                    [account_id],
                )
                return [self.record_to_friend_out(record) for record in result]

    def create_reverse(self, account_id, friend_id) -> Union[FriendOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO friends
                    (account_id, friend_id, status)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [friend_id, account_id, "accepted"],
                )
                return True
