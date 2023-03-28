from fastapi import APIRouter

router = APIRouter()


@router.post("/forum/")
def create_thread():
    pass
