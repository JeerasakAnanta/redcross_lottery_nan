from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional, Dict, Any

T = TypeVar("T")


class BaseService(ABC, Generic[T]):
    def __init__(self, repository):
        self.repository = repository

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

    def handle_exception(self, error: Exception, message: str = "An error occurred"):
        raise Exception(f"{message}: {str(error)}")
