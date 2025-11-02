const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  createUserCustomer,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Optional, if you want role-based access

const router = express.Router();

// Create a new user
router.post("/", createUser);

router.post("/Customer", createUserCustomer);

// Get all users (protected, requires authentication)
router.get("/", getAllUsers);

// Get user by ID (protected, requires authentication)
router.get("/:id", getUserById);

// Update user by ID (protected, requires authentication)
router.put("/:id", updateUser);

// Delete user by ID (protected, requires authentication)
router.delete("/:id", deleteUser);

// Authenticate user (login)
// router.post("/authenticate", authenticateUser);

module.exports = router;
