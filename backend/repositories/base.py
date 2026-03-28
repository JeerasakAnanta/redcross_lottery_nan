from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional, Any, Dict
from sqlalchemy.orm import Session

T = TypeVar("T")


class BaseRepository(ABC, Generic[T]):
    def __init__(self, db: Session):
        self.db = db

    @abstractmethod
    def get_by_id(self, id: int) -> Optional[T]:
        pass

    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        pass

    @abstractmethod
    def create(self, obj_in: Dict[str, Any]) -> T:
        pass

    @abstractmethod
    def update(self, id: int, obj_in: Dict[str, Any]) -> Optional[T]:
        pass

    @abstractmethod
    def delete(self, id: int) -> bool:
        pass

    def commit(self):
        self.db.commit()

    def rollback(self):
        self.db.rollback()

    def refresh(self, obj: T):
        self.db.refresh(obj)
