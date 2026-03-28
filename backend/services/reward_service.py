import re
from typing import List, Dict, Any, Optional
from repositories.lottery_repository import LotteryRepository
from utils.ocr import ocr_processor
from utils.reward_checker import check_reward


class RewardService:
    def __init__(self, lottery_repository: LotteryRepository):
        self.lottery_repository = lottery_repository

    async def check_reward_from_image(self, image_data: bytes) -> Dict[str, Any]:
        """
        Extract lottery numbers from image and check for rewards
        """
        try:
            # Extract text using OCR
            detected_text = await ocr_processor.extract_text(image_data)

            if not detected_text:
                return {
                    "status": "no_reward",
                    "detected_text": "",
                    "message": "No text found in the image",
                    "ocr_engine_used": "easyocr",
                    "available_engines": ocr_processor.get_available_engines(),
                    "results": [],
                }

            # Clean and extract lottery numbers
            cleaned_text = " ".join(detected_text.split())
            lottery_numbers = self._extract_lottery_numbers(cleaned_text)

            if not lottery_numbers:
                return {
                    "status": "no_reward",
                    "detected_text": cleaned_text,
                    "message": "No lottery numbers found in the image",
                    "ocr_engine_used": "easyocr",
                    "available_engines": ocr_processor.get_available_engines(),
                    "results": [],
                }

            # Check each detected number for rewards
            results = []
            for lottery_num in lottery_numbers:
                reward_message = check_reward(lottery_num, self.lottery_repository.db)

                # Get matching lotteries for detailed response
                matching_lotteries = self.lottery_repository.get_by_lottery_number(
                    lottery_num
                )

                if matching_lotteries:
                    # User won
                    for lottery in matching_lotteries:
                        results.append(
                            {
                                "detected_number": lottery_num,
                                "status": "winner",
                                "lottery_number": lottery.lottery_number,
                                "reward_number": lottery.reward_number,
                                "message": reward_message,
                            }
                        )
                else:
                    # User didn't win
                    results.append(
                        {
                            "detected_number": lottery_num,
                            "status": "no_reward",
                            "message": reward_message,
                        }
                    )

            has_winner = any(result["status"] == "winner" for result in results)

            return {
                "status": "winner" if has_winner else "no_reward",
                "detected_text": cleaned_text,
                "message": "พบเลขที่ถูกรางวัล!" if has_winner else "ไม่พบเลขที่ถูกรางวัล",
                "ocr_engine_used": "easyocr",
                "available_engines": ocr_processor.get_available_engines(),
                "results": results,
            }

        except Exception as e:
            return {
                "status": "error",
                "detected_text": "",
                "message": f"Error processing image: {str(e)}",
                "ocr_engine_used": "easyocr",
                "available_engines": ocr_processor.get_available_engines(),
                "results": [],
            }

    def check_reward_by_number(self, lottery_number: str) -> Dict[str, Any]:
        """
        Check reward for a specific lottery number
        """
        try:
            reward_message = check_reward(lottery_number, self.lottery_repository.db)
            matching_lotteries = self.lottery_repository.get_by_lottery_number(
                lottery_number
            )

            if matching_lotteries:
                return {
                    "status": "winner",
                    "lottery_number": lottery_number,
                    "message": reward_message,
                    "matching_lotteries": [
                        {
                            "lottery_number": lot.lottery_number,
                            "reward_number": lot.reward_number,
                        }
                        for lot in matching_lotteries
                    ],
                }
            else:
                return {
                    "status": "no_reward",
                    "lottery_number": lottery_number,
                    "message": reward_message,
                    "matching_lotteries": [],
                }

        except Exception as e:
            return {
                "status": "error",
                "lottery_number": lottery_number,
                "message": f"Error checking reward: {str(e)}",
                "matching_lotteries": [],
            }

    def _extract_lottery_numbers(self, text: str) -> List[str]:
        """
        Extract 6-digit lottery numbers from text
        """
        # Look for 6-digit numbers first
        lottery_numbers = re.findall(r"\b\d{6}\b", text)

        # If no 6-digit numbers found, look for any numbers (for more flexible matching)
        if not lottery_numbers:
            all_numbers = re.findall(r"\b\d+\b", text)
            # Filter numbers that could be lottery numbers (between 3-6 digits)
            lottery_numbers = [num for num in all_numbers if 3 <= len(num) <= 6]

        return list(set(lottery_numbers))  # Remove duplicates
