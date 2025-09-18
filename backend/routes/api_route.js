const controller = require("../controllers/reward_controller");
const router = require("express").Router();
const multer = require("multer");

const upload = multer();

/**
 * @swagger
 * /api/ocr:
 *   post:
 *     summary: OCR processing for lottery numbers
 *     tags: [OCR]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: OCR processing successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/api/ocr", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Call the reward controller for OCR processing
    const originalJson = res.json;
    let responseData = null;
    
    res.json = function(data) {
      responseData = data;
      return originalJson.call(this, data);
    };
    
    await controller.reward(req, res);
    
    // Extract lottery number from the OCR result
    if (responseData && responseData.result) {
      const message = responseData.result;
      const lotteryMatch = message.match(/เลข\s*(\d+)/);
      const lotteryNumber = lotteryMatch ? lotteryMatch[1] : "ไม่สามารถอ่านเลขสลากได้";
      
      res.json = originalJson; // Restore original function
      res.json({
        lotteryNumber: lotteryNumber,
        confidence: lotteryNumber !== "ไม่สามารถอ่านเลขสลากได้" ? 0.9 : 0.0
      });
    }
  } catch (error) {
    console.error("Error in OCR API:", error);
    res.status(500).json({ error: "OCR processing failed" });
  }
});

/**
 * @swagger
 * /api/check-lottery:
 *   post:
 *     summary: Check lottery number for rewards
 *     tags: [Lottery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lotteryNumber:
 *                 type: string
 *                 description: The lottery number to check
 *     responses:
 *       200:
 *         description: Lottery check successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/api/check-lottery", async (req, res) => {
  try {
    const { lotteryNumber } = req.body;
    
    if (!lotteryNumber) {
      return res.status(400).json({ error: "Lottery number is required" });
    }

    // Call the checkReward function directly
    const checkReward = require("../utils/check_reward");
    const message = await checkReward(lotteryNumber);
    
    const isWinner = !message.includes("ไม่ถูกรางวัล");
    
    res.json({
      isWinner: isWinner,
      message: message,
      prize: isWinner ? "รางวัล" : null
    });
  } catch (error) {
    console.error("Error in check-lottery API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
