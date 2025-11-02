import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

export const CartItems = () => {
  const { getCartTotalAmount, cartItems, removefromcart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL2;

  const handleProceedToCheckout = () => {
    const cartIsEmpty = Object.values(cartItems).every(
      (item) => item.quantity === 0
    );
    if (cartIsEmpty) {
      alert("Your cart is empty. Please add items to proceed.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="CartItems">
      <div className="cartformat">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {Object.keys(cartItems).map((key) => {
        const item = cartItems[key];
        return (
          <div key={item._id}>
            <div className="cartitems-format cartformat">
              <img
                src={`${apiBaseUrl}/uploads/${item.image}`} // Dynamically use API URL here
                alt={item.name}
                className="carticon-product"
              />
              <p>{item.name}</p>
              <p>Rs. {item.price}</p>
              <p>{item.quantity}</p>
              <p>Rs. {item.quantity * item.price}</p>
              <p
                onClick={() => removefromcart(item.name)}
                className="remove-icon"
              >
                &#x274c;
              </p>
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="Cartitems-totalitems">
              <p>Sub Total</p>
              <p>Rs.{getCartTotalAmount()}</p>
            </div>
            <div className="Cartitems-totalitems">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="Cartitems-totalitems">
              <p>Total</p>
              <p>Rs.{getCartTotalAmount()}</p>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};
