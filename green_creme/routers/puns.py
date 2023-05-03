from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Union, List
from authenticator import authenticator
from queries.puns import PunQueries, PunIn, PunOut, Error

router = APIRouter()


@router.post("/puns", response_model=Union[PunOut, Error])
def create_pun(
    info: PunIn,
    response: Response,
    pun: PunQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["role"] == "admin":
            try:
                return pun.create(info)
            except Exception:
                response.status_code = 400
                return {
                    "message": "Could not create pun. Make sure it's unique!"
                }
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="You are not authorized to make puns",
        )


@router.get("/puns", response_model=Union[List[PunOut], Error])
def get_all_puns(
    puns: PunQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return puns.get_all()
    except Exception:
        raise HTTPException(status_code=400, detail="Could not retrieve puns")
