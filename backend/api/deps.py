from fastapi import Depends
from sqlalchemy.orm import Session
from core.database import get_db
from repositories.user_repository import UserRepository
from repositories.lottery_repository import LotteryRepository
from services.user_service import UserService
from services.lottery_service import LotteryService
from services.reward_service import RewardService


# Repository dependencies
def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)


def get_lottery_repository(db: Session = Depends(get_db)) -> LotteryRepository:
    return LotteryRepository(db)


# Service dependencies
def get_user_service(
    user_repo: UserRepository = Depends(get_user_repository),
) -> UserService:
    return UserService(user_repo)


def get_lottery_service(
    lottery_repo: LotteryRepository = Depends(get_lottery_repository),
) -> LotteryService:
    return LotteryService(lottery_repo)


def get_reward_service(
    lottery_repo: LotteryRepository = Depends(get_lottery_repository),
) -> RewardService:
    return RewardService(lottery_repo)
