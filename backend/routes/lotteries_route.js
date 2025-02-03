const controller = require("../controllers/lotteries_controller");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Lotteries
 *   description: API for managing lotteries
 */

/**
 * @swagger
 * /lotterie:
 *   post:
 *     summary: Create a new lotterie
 *     tags: [Lotteries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the lotterie
 *               prize:
 *                 type: number
 *                 description: The prize amount
 *     responses:
 *       201:
 *         description: Lotterie created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/lotterie", controller.addLotterie);

/**
 * @swagger
 * /lotteries:
 *   get:
 *     summary: Retrieve all lotteries
 *     tags: [Lotteries]
 *     responses:
 *       200:
 *         description: A list of lotteries
 *       500:
 *         description: Internal server error
 */
router.get("/lotteries", controller.listLotteries);

/**
 * @swagger
 * /lotterie/{id}:
 *   delete:
 *     summary: Delete a lotterie by ID
 *     tags: [Lotteries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the lotterie to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Lotterie deleted successfully
 *       404:
 *         description: Lotterie not found
 */
router.delete("/lotterie/:id", controller.deleteLotterie);

module.exports = router;
