import pytest
from repositories.user_repository import UserRepository
from schemas.user import UserCreate


class TestUserRepository:
    def test_create_user(self, db_session, user_data):
        """Test creating a new user."""
        repo = UserRepository(db_session)

        user = repo.create(user_data)

        assert user.id is not None
        assert user.username == user_data["username"]
        assert user.name == user_data["name"]
        assert user.password != user_data["password"]  # Should be hashed

    def test_get_user_by_id(self, db_session, user_data):
        """Test getting user by ID."""
        repo = UserRepository(db_session)

        created_user = repo.create(user_data)
        retrieved_user = repo.get_by_id(created_user.id)

        assert retrieved_user is not None
        assert retrieved_user.id == created_user.id
        assert retrieved_user.username == created_user.username

    def test_get_user_by_username(self, db_session, user_data):
        """Test getting user by username."""
        repo = UserRepository(db_session)

        created_user = repo.create(user_data)
        retrieved_user = repo.get_by_username(created_user.username)

        assert retrieved_user is not None
        assert retrieved_user.username == created_user.username
        assert retrieved_user.id == created_user.id

    def test_authenticate_user(self, db_session, user_data):
        """Test user authentication."""
        repo = UserRepository(db_session)

        created_user = repo.create(user_data)
        authenticated_user = repo.authenticate(
            user_data["username"], user_data["password"]
        )

        assert authenticated_user is not None
        assert authenticated_user.id == created_user.id

        # Test wrong password
        wrong_auth = repo.authenticate(user_data["username"], "wrongpassword")
        assert wrong_auth is None
