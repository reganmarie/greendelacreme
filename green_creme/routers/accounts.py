from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountRepository,
    DuplicateAccountError,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.put(
    "/api/accounts/{account_id}",
    response_model=AccountOutWithPassword | HttpError,
)
def update_account(
    account_id: int,
    account: AccountIn,
    response: Response,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOutWithPassword:
    try:
        if account_id == account_data["id"]:
            hashed_password = authenticator.hash_password(account.password)
            return repo.update(account_id, account, hashed_password)
        else:
            response.status_code = 401
            return {"detail": "You are not authorized to update this account"}
    except Exception as e:
        if DuplicateAccountError:
            if "email" in str(e):
                msg = "That email has already been used by another account"
            if "username" in str(e):
                msg = "That username already exists"
            raise HTTPException(
                status_code=400,
                detail=msg,
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Could not update this account",
            )


@router.patch(
    "/api/accounts/{account_id}",
    response_model=bool | HttpError,
)
def make_admin(
    account_id: int,
    response: Response,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        account = repo.get_one(account_id)
        if account.role == "admin":
            response.status_code = 400
            return {"detail": "This account is already an admin"}
        if account_data["role"] == "admin":
            try:
                return repo.make_admin(account_id)
            except Exception:
                response.status_code = 400
                return {"detail": "Could not make this account an admin"}
        else:
            response.status_code = 401
            return {
                "detail": "You are not authorized to make accounts an admin"
            }
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Account does not exist",
        )


@router.get(
    "/api/accounts/{account_id}",
    response_model=AccountOut | HttpError,
)
def get_one_account(
    account_id: int,
    response: Response,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    try:
        return repo.get_one(account_id)
    except Exception:
        response.status_code = 404
        return {"message": "Account with that ID does not exist"}
