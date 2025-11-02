const express = require("express");
const {
  addOrder,
  updateOrderStatus,
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
} = require("../controllers/orderController");

const router = express.Router();

// Add a new order
router.post("/", addOrder);

// Update order status
router.put("/:id/status", updateOrderStatus);

// Get all orders (optional status filter)
router.get("/", getAllOrders);

// Get orders by email
router.get("/user/:userId", getOrdersByUserId);

// Get order by ID
router.get("/:id", getOrderById);

module.exports = router;
