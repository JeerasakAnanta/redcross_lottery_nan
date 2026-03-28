from typing import List, Optional, Dict, Any
from models.user import User
from repositories.user_repository import UserRepository
from services.base import BaseService
from utils.auth import create_access_token
from schemas.user import UserCreate, UserResponse, UserLogin


class UserService(BaseService[User]):
    def __init__(self, user_repository: UserRepository):
        super().__init__(user_repository)
        self.user_repository = user_repository

    def get_by_id(self, id: int) -> Optional[UserResponse]:
        user = self.repository.get_by_id(id)
        if not user:
            return None
        return UserResponse.from_orm(user)

    def get_all(self, skip: int = 0, limit: int = 100) -> List[UserResponse]:
        users = self.repository.get_all(skip=skip, limit=limit)
        return [UserResponse.from_orm(user) for user in users]

    def create(self, user_data: UserCreate) -> UserResponse:
        # Check if username already exists
        existing_user = self.user_repository.get_by_username(user_data.username)
        if existing_user:
            raise ValueError("Username already registered")

        # Create new user
        user_dict = user_data.dict()
        created_user = self.repository.create(user_dict)
        return UserResponse.from_orm(created_user)

    def update(self, id: int, user_data: UserCreate) -> Optional[UserResponse]:
        # Check if username exists (and belongs to different user)
        existing_user = self.user_repository.get_by_username(user_data.username)
        if existing_user and existing_user.id != id:
            raise ValueError("Username already taken")

        user_dict = user_data.dict(exclude_unset=True)
        updated_user = self.repository.update(id, user_dict)
        if not updated_user:
            return None
        return UserResponse.from_orm(updated_user)

    def delete(self, id: int) -> bool:
        return self.repository.delete(id)

    def authenticate(self, user_credentials: UserLogin) -> Optional[str]:
        user = self.user_repository.authenticate(
            user_credentials.username, user_credentials.password
        )
        if not user:
            return None
        return create_access_token(data={"id": user.id})

    def get_by_username(self, username: str) -> Optional[UserResponse]:
        user = self.user_repository.get_by_username(username)
        if not user:
            return None
        return UserResponse.from_orm(user)
