from fastapi.testclient import TestClient
from main import app
from queries.status import StatusRepository
from authenticator import authenticator
from queries.users import UserOut

client = TestClient(app)


class EmptyStatusRepository:
    def get_all(self, post_id):
        return []


class CreateStatusRepo:
    def create_status(self, status):

        result = {
            "id": 1,
            "user_id": 1,
            "post_id": 1,
            "condition": 3,
            "foot_traffic": 1,
            "is_open": 2,
            "created_on": "2023-11-01"
        }
        result.update(status)
        return result


def fake_get_current_account_data():
    return UserOut(id=1,
                   username="admin",
                   email="admin@gmail.com",
                   role="admin",
                   joined="2000-12-25")


def test_get_all_status():

    # Arrange

    app.dependency_overrides[StatusRepository] = EmptyStatusRepository

    response = client.get("/api/status/1")

    # Act

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == []


def test_create_status():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    app.dependency_overrides[StatusRepository] = CreateStatusRepo

    json = {
            "user_id": 1,
            "post_id": 1,
            "condition": 3,
            "foot_traffic": 1,
            "is_open": 2,
            "created_on": "2023-11-01"
        }

    expected = {
            "id": 1,
            "user_id": 1,
            "post_id": 1,
            "condition": 3,
            "foot_traffic": 1,
            "is_open": 2,
            "created_on": "2023-11-01"
        }

    # Act
    response = client.post("/api/status", json=json)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
