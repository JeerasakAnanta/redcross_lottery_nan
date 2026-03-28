from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import or_
from models.lottery import Lottery
from repositories.base import BaseRepository


class LotteryRepository(BaseRepository[Lottery]):
    def get_by_id(self, id: int) -> Optional[Lottery]:
        return self.db.query(Lottery).filter(Lottery.id == id).first()

    def get_by_lottery_number(self, lottery_number: str) -> List[Lottery]:
        # Search for exact match or last 3 digits
        three_digits = (
            lottery_number[-3:] if len(lottery_number) >= 3 else lottery_number
        )
        return (
            self.db.query(Lottery)
            .filter(
                or_(
                    Lottery.lottery_number == lottery_number,
                    Lottery.lottery_number == three_digits,
                )
            )
            .all()
        )

    def get_by_reward_number(self, reward_number: str) -> List[Lottery]:
        return (
            self.db.query(Lottery).filter(Lottery.reward_number == reward_number).all()
        )

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Lottery]:
        return self.db.query(Lottery).offset(skip).limit(limit).all()

    def create(self, obj_in: Dict[str, Any]) -> Lottery:
        db_lottery = Lottery(**obj_in)
        self.db.add(db_lottery)
        self.db.commit()
        self.db.refresh(db_lottery)
        return db_lottery

    def update(self, id: int, obj_in: Dict[str, Any]) -> Optional[Lottery]:
        db_lottery = self.get_by_id(id)
        if not db_lottery:
            return None

        for field, value in obj_in.items():
            if hasattr(db_lottery, field):
                setattr(db_lottery, field, value)

        self.db.commit()
        self.db.refresh(db_lottery)
        return db_lottery

    def delete(self, id: int) -> bool:
        db_lottery = self.get_by_id(id)
        if not db_lottery:
            return False

        self.db.delete(db_lottery)
        self.db.commit()
        return True

    def check_lottery_exists(self, lottery_number: str) -> bool:
        return (
            self.db.query(Lottery)
            .filter(Lottery.lottery_number == lottery_number)
            .first()
            is not None
        )
