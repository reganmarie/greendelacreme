from pydantic import BaseModel
from .pool import pool
from typing import Union, Optional


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
    city: Optional[str]
    state: Optional[str]
    avatar: Optional[str]
    profile_bg: Optional[str]


class AccountOut(BaseModel):
    id: int
    first: str
    last: str
    username: str
    email: str
    avatar: str
    role: str
    city: Optional[str]
    state: Optional[str]
    profile_bg: Optional[str]


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepository:
    def get(self, email: str) -> Union[AccountOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        select id, username, email,
                        first, last, avatar, role,
                        city, state, profile_bg, password
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
                        avatar=account[5],
                        role=account[6],
                        city=account[7],
                        state=account[8],
                        profile_bg=account[9],
                        hashed_password=account[10],
                    )
        except Exception:
            return

    def create(
        self,
        info: AccountIn,
        hashed_password: str,
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into accounts (first, last, username,
                    email, password, city, state, profile_bg)
                    values (%s, %s, %s, %s, %s, %s, %s, %s)
                    returning id, avatar, role;
                    """,
                    (
                        info.first,
                        info.last,
                        info.username,
                        info.email,
                        hashed_password,
                        info.city,
                        info.state,
                        info.profile_bg,
                    ),
                )
                data = db.fetchone()
                id, avatar, role = data[0], data[1], data[2]
                if id is None:
                    return None
                return AccountOutWithPassword(
                    id=id,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                    first=info.first,
                    last=info.last,
                    avatar=avatar,
                    role=role,
                    city=info.city,
                    state=info.state,
                    profile_bg=info.profile_bg,
                )

    def update(
        self, account_id: int, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET first = %s,
                        last = %s,
                        username = %s,
                        email = %s,
                        password = %s,
                        city = %s,
                        state = %s,
                        avatar = %s,
                        profile_bg = %s
                    WHERE id = %s
                    RETURNING role;
                    """,
                    [
                        info.first,
                        info.last,
                        info.username,
                        info.email,
                        hashed_password,
                        info.city,
                        info.state,
                        info.avatar,
                        info.profile_bg,
                        account_id,
                    ],
                )
                role = db.fetchone()[0]
                return AccountOutWithPassword(
                    id=account_id,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                    first=info.first,
                    last=info.last,
                    avatar=info.avatar,
                    role=role,
                    city=info.city,
                    state=info.state,
                    profile_bg=info.profile_bg,
                )

    def make_admin(self, account_id) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET role = 'admin'
                    WHERE id = %s;
                    """,
                    [account_id],
                )
                return True

    def get_one(self, account_id: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, email,
                    first, last, avatar, role,
                    city, state, profile_bg
                    from accounts
                    WHERE id = %s;
                    """,
                    [account_id],
                )
                account = db.fetchone()
                return AccountOut(
                    id=account[0],
                    username=account[1],
                    email=account[2],
                    first=account[3],
                    last=account[4],
                    avatar=account[5],
                    role=account[6],
                    city=account[7],
                    state=account[8],
                    profile_bg=account[9],
                )
