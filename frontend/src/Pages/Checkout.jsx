import "./Css/Checkout.css";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { UserAuthContext } from "../Context/UserAuth";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// API URL for your server
// const API_URL = "http://localhost:5000/api/orders"; // Adjust this to your backend URL

// // Function to place an order
// export const placeOrder = async (orderData) => {
//   try {
//     // Send POST request to create an order
//     const response = await axios.post(`${API_URL}`, orderData);
//     return response.data;
//   } catch (error) {
//     // Handle errors (log or throw as needed)
//     console.error("Error placing order:", error);
//     throw error; // Rethrow error to handle it in the component
//   }
// };

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotalAmount } = useContext(ShopContext);
  const { auth } = useContext(UserAuthContext); // Access user authentication context
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    postalcode: "",
    email: "",
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from env

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(cartItems).length) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    if (!auth || !auth.user || !auth.user._id) {
      alert("Please log in to place an order.");
      return;
    }

    // Log the user and userId for debugging
    console.log("User object:", auth.user);
    console.log("User ID:", auth.user._id);

    // Format the products correctly
    const products = Object.keys(cartItems).map((itemName) => ({
      productId: cartItems[itemName]._id, // Assuming '_id' exists in the product object
      quantity: cartItems[itemName].quantity,
    }));

    const orderData = {
      fullname: formData.fullname,
      address: formData.address,
      city: formData.city,
      postalcode: formData.postalcode,
      email: formData.email,
      products, // Make sure products are in the correct format
      total: getCartTotalAmount(),
      userId: auth.user._id, // Make sure userId is properly set
    };

    console.log("Order payload being sent:", orderData); // Check the structure of the order data

    try {
      const response = await axios.post(`${apiBaseUrl}/orders`, orderData); // Use dynamic API URL
      if (response.data.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("cartItems");
        navigate("/home");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="CheckoutPage">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            value={formData.postalcode}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};
