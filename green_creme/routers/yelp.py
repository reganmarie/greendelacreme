from fastapi import APIRouter, Depends
from queries.yelp import YelpQueries
from authenticator import authenticator


router = APIRouter()


@router.get("/api/yelp")
def get_yelp(
    repo: YelpQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_yelp(account_data["city"], account_data["state"])
    except Exception:
        return None
