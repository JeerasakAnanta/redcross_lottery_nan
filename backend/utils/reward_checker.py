from sqlalchemy.orm import Session
from sqlalchemy import or_
from models.lottery import Lottery
from typing import List, Dict, Any


def check_reward(lottery_number: str, db: Session) -> str:
    """
    Check if lottery number wins any reward
    """
    try:
        # Get last 3 digits
        three_digits = (
            lottery_number[-3:] if len(lottery_number) >= 3 else lottery_number
        )

        # Search for matching lotteries (full number or last 3 digits)
        matching_lotteries = (
            db.query(Lottery)
            .filter(
                or_(
                    Lottery.lottery_number == lottery_number,
                    Lottery.lottery_number == three_digits,
                )
            )
            .all()
        )

        if not matching_lotteries:
            return f"คุณไม่ถูกรางวัล เลข {lottery_number}"

        # Prepare list of lottery info
        lottery_list = [
            {"lottery_number": lot.lottery_number, "reward_number": lot.reward_number}
            for lot in matching_lotteries
        ]

        # Sort by reward number
        lottery_list.sort(key=lambda x: x["reward_number"])

        # Generate message based on results
        if len(lottery_list) == 2:
            message_parts = []
            for element in lottery_list:
                if str(element["reward_number"]) != "7":
                    message_parts.append(
                        f"คุณถูกรางวัลที่ {element['reward_number']} และ รางวัล 3 ตัวท้าย เลข {lottery_number}"
                    )
            return (
                " ".join(message_parts)
                if message_parts
                else f"คุณถูกรางวัล 3 ตัวท้าย เลข {lottery_number}"
            )

        elif len(lottery_list) == 1:
            if str(lottery_list[0]["reward_number"]) == "7":
                return f"คุณถูกรางวัล 3 ตัวท้าย เลข {lottery_number}"
            else:
                return f"คุณถูกรางวัลที่ {lottery_list[0]['reward_number']} เลข {lottery_list[0]['lottery_number']}"

        else:
            return f"คุณไม่ถูกรางวัล เลข {lottery_number}"

    except Exception as e:
        return str(e)
