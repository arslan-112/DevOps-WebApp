const { responseSuccess, responseFailure } = require("../common/responses");
const Product = require("../models/productModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body; // Changed 'stock' to 'quantity'

    // If a file is uploaded, set the image path
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      description,
      price,
      quantity, // Using 'quantity' instead of 'stock'
      image,
    });

    await product.save();
    return responseSuccess(res, product, "Product created successfully");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return responseSuccess(res, products);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return responseFailure(res, "Product not found");
    }

    return responseSuccess(res, product);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body; // Changed 'stock' to 'quantity'

    const updatedFields = {
      name,
      description,
      price,
      quantity, // Using 'quantity' instead of 'stock'
    };

    // If a file is uploaded, update the image
    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!product) {
      return responseFailure(res, "Product not found");
    }

    return responseSuccess(res, product, "Product updated successfully");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return responseFailure(res, "Product not found");
    }

    return responseSuccess(res, null, "Product deleted successfully");
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};
