from typing import Optional, List
import io
from PIL import Image
import numpy as np
from fastapi import HTTPException, status


class OCRProcessor:
    """
    OCR processor using EasyOCR for text extraction from images
    """

    def __init__(self, languages: str = "en,th", min_confidence: float = 0.5):
        self.languages = [lang.strip() for lang in languages.split(",")]
        self.min_confidence = min_confidence
        self.easyocr_reader = None
        self._initialized = False
        self._init_easyocr()

    def _init_easyocr(self):
        """Initialize EasyOCR reader"""
        try:
            import easyocr
            self.easyocr_reader = easyocr.Reader(self.languages)
            self._initialized = True
            print(f"EasyOCR initialized with languages: {self.languages}")
        except Exception as e:
            print(f"Failed to initialize EasyOCR: {e}")
            self.easyocr_reader = None
            self._initialized = True

    async def extract_text(self, image_data: bytes) -> str:
        """
        Extract text from image data using EasyOCR

        Args:
            image_data: Raw image bytes

        Returns:
            Extracted text as string
        """
        if self.easyocr_reader is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="EasyOCR is not available. Please check installation.",
            )

        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))

            # Convert PIL Image to numpy array
            image_array = np.array(image)

            # Extract text using EasyOCR
            results = self.easyocr_reader.readtext(image_array)

            # Filter by confidence and combine text
            filtered_results = [
                result[1] for result in results if result[2] >= self.min_confidence
            ]

            extracted_text = " ".join(filtered_results)

            return extracted_text.strip()

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"EasyOCR processing failed: {str(e)}",
            )

    def get_available_engines(self) -> List[str]:
        """Get list of available OCR engines"""
        if self.easyocr_reader is not None:
            return ["easyocr"]
        return []


# Global OCR processor instance - lazy loaded
_ocr_processor: Optional[OCRProcessor] = None


def get_ocr_processor() -> OCRProcessor:
    """
    Get the global OCR processor instance.
    Initializes it on first call (lazy loading).
    """
    global _ocr_processor
    if _ocr_processor is None:
        from core.config import settings
        _ocr_processor = OCRProcessor(
            languages=settings.OCR_EASYOCR_LANGUAGES,
            min_confidence=settings.OCR_MIN_CONFIDENCE
        )
    return _ocr_processor


# For backward compatibility, create a property-like access
class _OCRProcessorProxy:
    """Proxy to lazily access the OCR processor"""
    def __getattr__(self, name: str):
        return getattr(get_ocr_processor(), name)


ocr_processor = _OCRProcessorProxy()
