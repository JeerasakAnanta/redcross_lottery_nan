from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class LotteryBase(BaseModel):
    lottery_number: str = Field(..., min_length=1, max_length=50)
    reward_number: str = Field(..., min_length=1, max_length=50)


class LotteryCreate(LotteryBase):
    pass


class LotteryUpdate(BaseModel):
    lottery_number: Optional[str] = Field(None, min_length=1, max_length=50)
    reward_number: Optional[str] = Field(None, min_length=1, max_length=50)


class LotteryResponse(LotteryBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
