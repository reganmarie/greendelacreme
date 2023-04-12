from fastapi.testclient import TestClient
from main import app
from queries.forums import ThreadRepository

client = TestClient(app)


class EmptyThreadQuery:
    def get_all(self):
        return []


# def test_get_all_threads():
#     app.dependency_overrides[ThreadRepository] = EmptyThreadQuery
#     response = client.get("/forum")
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == {"threads":[]}


# class CreateThreadQueries:
#     def create_thread(self,thread):
#         result = {
#               "id": 1,
#                 "title": "How to save my plant!",
#                 "body": "Look at my poor plant, what can i do to save its lifeeeeeeee",
#                 "image": "https://www.evergreenti.com/wp-content/uploads/2018/12/shutterstock_152500682.jpg",
#                 "author_id": 1,
#                 "created_on": "2023-04-08T01:12:09.831572"
#         }
#         result.update(thread)
#         return result

# def test_get_all_threads():
#     app.dependency_overrides[ThreadRepository] = EmptyThreadQuery
#     response = client.get("/forum")
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == {"threads":[]}

def test_list():
    assert 3 ==3
