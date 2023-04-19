from fastapi.testclient import TestClient
from main import app
from queries.forums import ThreadRepository
from authenticator import authenticator

client = TestClient(app)


class EmptyThreadQuery:
    def get_all(self):
        return []


def over():
    return {
        "id": 1,
        "first": "Regan",
        "last": "Tewksbury",
        "username": "regan",
        "email": "regan@email.com",
    }


def test_get_all_threads():
    app.dependency_overrides[authenticator.get_current_account_data] = over
    app.dependency_overrides[ThreadRepository] = EmptyThreadQuery
    response = client.get("/forum")
    assert response.status_code == 200
    assert response.json() == {"message": "No threads exist"}


class CreateThreadQuery:
    def create(self, thread, account_id):
        result = {
            "id": 1,
            "author_id": account_id,
            "created_on": "2023-04-18T19:09:04.973180",
        }
        result.update(thread)
        return result


def test_create_thread():
    app.dependency_overrides[ThreadRepository] = CreateThreadQuery
    app.dependency_overrides[authenticator.get_current_account_data] = over
    json = {"title": "string", "body": "string", "image": "string"}
    expected = {
        "id": 1,
        "title": "string",
        "body": "string",
        "image": "string",
        "author_id": 1,
        "created_on": "2023-04-18T19:09:04.973180",
    }
    response = client.post("/forum", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class GetThreadQuery:
    def get_one(self, forum_id: 4):
        result = {
            "id": 4,
            "title": "plants",
            "body": "I love plants",
            "image": "happyplant",
            "author_id": 1,
            "created_on": "2023-04-18T19:09:04.973180",
            "username": "regan",
            "avatar": "happyplantimg",
        }
        return result


def test_get_thread():
    app.dependency_overrides[ThreadRepository] = GetThreadQuery
    app.dependency_overrides[authenticator.get_current_account_data] = over

    response = client.get("/forum/4")

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == {
        "id": 4,
        "title": "plants",
        "body": "I love plants",
        "image": "happyplant",
        "author_id": 1,
        "created_on": "2023-04-18T19:09:04.973180",
        "username": "regan",
        "avatar": "happyplantimg",
    }
