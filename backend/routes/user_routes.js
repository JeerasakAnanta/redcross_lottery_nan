const express = require("express");
const {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;