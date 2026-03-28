from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from models.user import User
from repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    def get_by_id(self, id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == id).first()

    def get_by_username(self, username: str) -> Optional[User]:
        return self.db.query(User).filter(User.username == username).first()

    def get_all(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self.db.query(User).offset(skip).limit(limit).all()

    def create(self, obj_in: Dict[str, Any]) -> User:
        user_data = obj_in.copy()

        # Hash password if provided
        if "password" in user_data:
            user_data["password"] = User.hash_password(user_data["password"])

        db_user = User(**user_data)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def update(self, id: int, obj_in: Dict[str, Any]) -> Optional[User]:
        db_user = self.get_by_id(id)
        if not db_user:
            return None

        for field, value in obj_in.items():
            if hasattr(db_user, field):
                if field == "password" and value:
                    setattr(db_user, field, User.hash_password(value))
                else:
                    setattr(db_user, field, value)

        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def delete(self, id: int) -> bool:
        db_user = self.get_by_id(id)
        if not db_user:
            return False

        self.db.delete(db_user)
        self.db.commit()
        return True

    def authenticate(self, username: str, password: str) -> Optional[User]:
        user = self.get_by_username(username)
        if not user:
            return None
        if not user.verify_password(password):
            return None
        return user
