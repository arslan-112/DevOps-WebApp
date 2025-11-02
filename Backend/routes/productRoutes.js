const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware"); // For handling file uploads

const router = express.Router();

// Create product (with image upload)
router.post("/", authMiddleware, upload.single("image"), createProduct);

// Get all products
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// Update product (with optional image upload)
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);

// Delete product
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
