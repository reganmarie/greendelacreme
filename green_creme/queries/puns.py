from pydantic import BaseModel
from typing import List, Union
from .pool import pool


class Error(BaseModel):
    message: str


class PunIn(BaseModel):
    pun: str


class PunOut(BaseModel):
    id: int
    pun: str


class PunQueries:
    def create(self, pun: PunIn) -> Union[PunOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO puns (pun)
                    VALUES (%s)
                    RETURNING id;
                    """,
                    [pun.pun],
                )
                id = db.fetchone()[0]
                return PunOut(id=id, pun=pun.pun)

    def get_all(self) -> Union[List[PunOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM puns;
                    """
                )
                return [
                    PunOut(id=record[0], pun=record[1]) for record in result
                ]
