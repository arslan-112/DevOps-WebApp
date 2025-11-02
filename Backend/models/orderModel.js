const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fullname:{type:String},
  address: { type: String, required: true },
  city:{type:String,required:true},
  postalcode:{type:String,required:true},
  email: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
