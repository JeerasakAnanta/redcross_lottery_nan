from typing import List, Optional, Dict, Any
from models.lottery import Lottery
from repositories.lottery_repository import LotteryRepository
from services.base import BaseService
from schemas.lottery import LotteryCreate, LotteryUpdate, LotteryResponse


class LotteryService(BaseService[Lottery]):
    def __init__(self, lottery_repository: LotteryRepository):
        super().__init__(lottery_repository)
        self.lottery_repository = lottery_repository

    def get_by_id(self, id: int) -> Optional[LotteryResponse]:
        lottery = self.repository.get_by_id(id)
        if not lottery:
            return None
        return LotteryResponse.from_orm(lottery)

    def get_all(self, skip: int = 0, limit: int = 100) -> List[LotteryResponse]:
        lotteries = self.repository.get_all(skip=skip, limit=limit)
        return [LotteryResponse.from_orm(lottery) for lottery in lotteries]

    def create(self, lottery_data: LotteryCreate) -> LotteryResponse:
        # Check if lottery number already exists
        if self.lottery_repository.check_lottery_exists(lottery_data.lottery_number):
            raise ValueError(
                f"Lottery number {lottery_data.lottery_number} already exists"
            )

        lottery_dict = lottery_data.dict()
        created_lottery = self.repository.create(lottery_dict)
        return LotteryResponse.from_orm(created_lottery)

    def update(self, id: int, lottery_data: LotteryUpdate) -> Optional[LotteryResponse]:
        # Check if lottery exists
        existing_lottery = self.repository.get_by_id(id)
        if not existing_lottery:
            return None

        # Check if new lottery number already exists (and belongs to different lottery)
        if lottery_data.lottery_number:
            duplicate_lottery = self.lottery_repository.get_by_lottery_number(
                lottery_data.lottery_number
            )
            if duplicate_lottery and any(
                lottery.id != id for lottery in duplicate_lottery
            ):
                raise ValueError(
                    f"Lottery number {lottery_data.lottery_number} already exists"
                )

        lottery_dict = lottery_data.dict(exclude_unset=True)
        updated_lottery = self.repository.update(id, lottery_dict)
        if not updated_lottery:
            return None
        return LotteryResponse.from_orm(updated_lottery)

    def delete(self, id: int) -> bool:
        return self.repository.delete(id)

    def get_by_lottery_number(self, lottery_number: str) -> List[LotteryResponse]:
        lotteries = self.lottery_repository.get_by_lottery_number(lottery_number)
        return [LotteryResponse.from_orm(lottery) for lottery in lotteries]

    def get_by_reward_number(self, reward_number: str) -> List[LotteryResponse]:
        lotteries = self.lottery_repository.get_by_reward_number(reward_number)
        return [LotteryResponse.from_orm(lottery) for lottery in lotteries]
