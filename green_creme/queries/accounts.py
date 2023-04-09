from pydantic import BaseModel
from .pool import pool
from typing import Union


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    first: str
    last: str
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    first: str
    last: str
    username: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepository:
    def get(self, email: str) -> Union[AccountOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        select id, username, email, first, last, password
                        from accounts
                        where email = %s
                        or username = %s;
                        """,
                        [email, email],
                    )
                    account = db.fetchone()
                    return AccountOutWithPassword(
                        id=account[0],
                        username=account[1],
                        email=account[2],
                        first=account[3],
                        last=account[4],
                        hashed_password=account[5],
                    )
        except:
            return

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into accounts (first, last, username, email, password)
                    values (%s, %s, %s, %s, %s)
                    returning id;
                    """,
                    (
                        info.first,
                        info.last,
                        info.username,
                        info.email,
                        hashed_password,
                    ),
                )
                id = db.fetchone()[0]
                if id is None:
                    return None
                return AccountOutWithPassword(
                    id=id,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                    first=info.first,
                    last=info.last,
                )
