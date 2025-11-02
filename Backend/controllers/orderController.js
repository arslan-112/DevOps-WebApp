const { responseSuccess, responseFailure } = require("../common/responses");
const Order = require("../models/orderModel");
const Product=require("../models/productModel")

// Add a new order
exports.addOrder = async (req, res) => {
  try {
    const { fullname, address, city, postalcode, email, products, total, userId } = req.body;

    // Validate required fields
    if (!fullname || !address || !city || !postalcode || !email || !products || !total || !userId) {
      return responseFailure(res, "All fields are required.");
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return responseFailure(res, "Products must be a non-empty array.");
    }

    // Loop through the products array and update product quantities
    for (let product of products) {
      const { productId, quantity } = product;

      // Check if the product exists in the database
      const dbProduct = await Product.findById(productId);
      console.log(dbProduct)
      if (!dbProduct) {
        return responseFailure(res, `Product with ID ${productId} not found.`);
      }

      // Check if there's enough stock
      if (dbProduct.quantity < quantity) {
        return responseFailure(res, `Not enough stock for ${dbProduct.name}.`);
      }

      console.log(`Before update, product stock: ${dbProduct.quantity}`);

      // Update product stock (subtract the ordered quantity)
      dbProduct.quantity -= quantity;

      // Save the updated product
      await dbProduct.save();

      console.log(`After update, product stock: ${dbProduct.quantity}`);
    }

    // Create and save the order after updating the product quantities
    const order = new Order({
      fullname,
      address,
      city,
      postalcode,
      email,
      products,
      total,
      user: userId, // Associate the order with the user
    });

    await order.save();

    return responseSuccess(res, "Order placed successfully.", order);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    console.log(req.body.orderStatus)

    if (!["pending", "shipped", "delivered", "canceled"].includes(orderStatus)) {
      return responseFailure(res,"Invalid status value.");
    }

    const order = await Order.findById(id);
    if (!order) {
      return responseFailure(res, "Order not found." );
    }

    // Update the status
    order.orderStatus = orderStatus;
    await order.save();

    return responseSuccess(res, "Order status updated.", order);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Get all orders (filterable by status)
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) filter.orderStatus = status;

    // Fetching orders and populating related fields
    const orders = await Order.find(filter)
      .populate({
        path: 'user',
        select: 'firstName lastName username email role'  // Select relevant user details
      })
      .populate({
        path: 'products.productId',
        select: 'name price description image'  // Select relevant product details
      });

    // Map the orders and include necessary user and product details
    const orderDetails = orders.map(order => ({
      ...order.toObject(),
      userDetails: {
        firstName: order.user.firstName,
        lastName: order.user.lastName,
        username: order.user.username,
        email: order.user.email,
        role: order.user.role,
      },
      productsDetails: order.products.map(product => ({
        productName: product.productId.name,
        productPrice: product.productId.price,
        productDescription: product.productId.description,
        productImage: product.productId.image,
        quantity: product.quantity,
      }))
    }));

    // Return the response with the modified order data
    return responseSuccess(res, orderDetails);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};


// Get orders by email
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;  // Fetch orders by userId

    const orders = await Order.find({ user: userId }).populate("products.productId");

    if (!orders.length) {
      return responseFailure(res, "No orders found for this user.");
    }

    return responseSuccess(res, orders);
  } catch (error) {
    return responseFailure(res, error.message.toString());
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("products.productId").populate("user");

    if (!order) {
      return responseFailure(res, "Order not found.");
    }

    return responseSuccess(res, order);
  } catch (error) {
    return responseFailure(res, error.message.toString);
  }
};
