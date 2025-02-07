const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// 🔹 Login User & Return JWT
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Register User
const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, username, password });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Fetch all users excluding their passwords
 * @route GET /users
 * @access Public
 */

const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database, excluding their passwords
    const users = await User.find().select("-password");

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get User By Id
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update User
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, username, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, username, password },
      { new: true }
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete User
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndRemove(id);
    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
