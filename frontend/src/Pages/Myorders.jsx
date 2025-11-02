import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserAuthContext } from "../Context/UserAuth"; // Assuming you have a context for user authentication
import { useNavigate } from "react-router-dom";
import "./Css/Orders.css";

const Myorders = () => {
  const { auth, logout } = useContext(UserAuthContext); // Assuming auth context holds the logged-in user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from env

  // Function to fetch orders by user email
  const fetchOrders = async () => {
    if (!auth || !auth.user || !auth.user.username) {
      console.log(auth);
      setError("User is not logged in");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${apiBaseUrl}/orders/user/${auth.user._id}`
      );
      setOrders(response.data.data); // Assuming the orders are in response.data.data
      console.log(orders);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth]); // Re-fetch orders when auth changes (i.e., when the user logs in)

  const handleSignOut = async () => {
    logout(); // Clear auth state and localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="MyOrders">
      <h1>My Orders</h1>

      <button onClick={handleSignOut} style={{ marginBottom: "20px" }}>
        Sign Out
      </button>

      {loading && <p>Loading your orders...</p>}
      {error && <p>{error}</p>}
      {orders.length === 0 && !loading && !error && <p>You have no orders.</p>}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Total Price:</strong> Rs.{order.total}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
            </div>
            <div className="order-products">
              <h3>Products:</h3>
              {order.products.map((product, index) => (
                <div key={index} className="product-item">
                  <p>
                    <strong>Product:</strong> {product.productId.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> Rs.{product.productId.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
