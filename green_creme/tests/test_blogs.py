from fastapi.testclient import TestClient
from main import app
from queries.blogs import BlogQueries
from authenticator import authenticator

client = TestClient(app)


class EmptyBlogQueries:
    def get_all(self):
        return []


class CreateBlogQueries:
    def create(self, blog, account_id):
        result = {
            "id": 1,
            "author_id": account_id,
            "created_on": "2023-04-18T19:24:20.550473",
        }
        result.update(blog)
        return result


class GetBlogQuery:
    def get_one(self, blog_id: 1):
        result = {
            "id": 1,
            "title": "New Title",
            "body": "New Body",
            "image": "new-image.png",
            "created_on": "2023-04-19T12:50:11.246120",
            "author_id": 1,
            "username": "stringy",
            "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
            "first": "stringy",
            "last": "string",
        }
        return result


def override_auth():
    return {
        "id": 1,
        "first": "Shayne",
        "last": "Buac",
        "username": "sbshayne",
        "email": "asmbuac@gmail.com",
    }


def test_get_all_blogs():
    app.dependency_overrides[BlogQueries] = EmptyBlogQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = override_auth

    response = client.get("/blogs")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create_blog():
    app.dependency_overrides[BlogQueries] = CreateBlogQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = override_auth

    json = {
        "title": "Plants are cool",
        "body": "Plants are so so cool!",
        "image": "plant.png",
    }

    expected = {
        "id": 1,
        "title": "Plants are cool",
        "body": "Plants are so so cool!",
        "image": "plant.png",
        "created_on": "2023-04-18T19:24:20.550473",
        "author_id": 1,
    }

    response = client.post("/blogs", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected


def test_get_one_blog():
    app.dependency_overrides[BlogQueries] = GetBlogQuery
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = override_auth

    response = client.get("/blogs/1")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "title": "New Title",
        "body": "New Body",
        "image": "new-image.png",
        "created_on": "2023-04-19T12:50:11.246120",
        "author_id": 1,
        "username": "stringy",
        "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
        "first": "stringy",
        "last": "string",
    }
