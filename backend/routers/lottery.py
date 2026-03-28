from fastapi import APIRouter, Depends, HTTPException, status
from schemas.lottery import LotteryCreate, LotteryResponse
from api.deps import get_lottery_service
from typing import List

router = APIRouter()


@router.post(
    "/lotteries", response_model=LotteryResponse, status_code=status.HTTP_201_CREATED
)
async def create_lottery(
    lottery_data: LotteryCreate, lottery_service=Depends(get_lottery_service)
):
    try:
        return lottery_service.create(lottery_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/lotteries", response_model=List[LotteryResponse])
async def get_all_lotteries(
    skip: int = 0, limit: int = 100, lottery_service=Depends(get_lottery_service)
):
    return lottery_service.get_all(skip=skip, limit=limit)


@router.get("/lotteries/{lottery_id}", response_model=LotteryResponse)
async def get_lottery_by_id(
    lottery_id: int, lottery_service=Depends(get_lottery_service)
):
    lottery = lottery_service.get_by_id(lottery_id)
    if not lottery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Lottery not found"
        )
    return lottery


@router.delete("/lotteries/{lottery_id}")
async def delete_lottery(lottery_id: int, lottery_service=Depends(get_lottery_service)):
    if not lottery_service.get_by_id(lottery_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Lottery not found"
        )

    success = lottery_service.delete(lottery_id)
    if success:
        return {"message": "Lottery deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete lottery",
        )
