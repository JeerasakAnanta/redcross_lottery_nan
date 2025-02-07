const controller = require("../controllers/reward_controller");
const router = require("express").Router();
// const JWTMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer();

// const jwtMiddleware = JWTMiddleware(process.env.JWT_SECRET);

/**
 * @swagger
 * /api_recross_ocr/reward/upload:
 *   post:
 *     summary: Upload image to check reward
 *     tags: [Reward]
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// router.post('/upload', jwtMiddleware, upload.single('image'), controller.reward)
router.post("/upload", upload.single("image"), controller.reward);
router.post("/check_reward", controller.number_reward);

module.exports = router;
