from fastapi import APIRouter
# from queries.forums import ThreadIn

router = APIRouter()


@router.post("/forum/")
def create_thread(thread: ThreadIn):
    print("thread", thread)
    return thread

@router.get("/forum/")
def get_all_threads()
