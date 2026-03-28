from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from api.deps import get_reward_service, get_user_service
from schemas.user import UserLogin
from typing import Optional

router = APIRouter()


@router.post("/check-reward")
async def check_reward_from_image(
    image: UploadFile = File(...),
    reward_service=Depends(get_reward_service),
):
    """
    Check lottery reward from uploaded image using EasyOCR

    Uses EasyOCR for text extraction from lottery images.
    No API key required - works out of the box.
    """
    try:
        # Read uploaded image
        image_data = await image.read()

        # Use reward service to process image and check rewards
        result = await reward_service.check_reward_from_image(image_data)

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing image: {str(e)}",
        )


@router.get("/check-reward")
async def check_reward_by_number(
    lottery_number: str = Query(..., description="Lottery number to check"),
    reward_service=Depends(get_reward_service),
):
    """Check reward for a specific lottery number"""
    try:
        result = reward_service.check_reward_by_number(lottery_number)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error checking reward: {str(e)}",
        )


@router.get("/ocr-engines")
async def get_available_ocr_engines():
    """Get list of available OCR engines"""
    from utils.ocr import ocr_processor

    return {
        "available_engines": ocr_processor.get_available_engines(),
        "preferred_engine": "easyocr",
    }
