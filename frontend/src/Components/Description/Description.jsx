/* eslint-disable react/prop-types */
import "./Description.css";
import { ShopContext } from "../../Context/ShopContext";
import { useContext, useState } from "react";
import addtocarT from "../Asset/shop_icon2.png";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
export const Description = memo(({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL2;

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-display">
      <div className="product-content">
        <div className="product-display-left">
          <div className="product-image">
            <img
              src={`${apiBaseUrl}/uploads/${product.image}`}
              alt={product.name}
            />
          </div>
        </div>
        <div className="product-display-right">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">
            <span className="price">Rs.{product.price}</span>
          </div>
          <div className="quantity-container">
            <label htmlFor="quantity" className="quantity-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            <img src={addtocarT} alt="Add to Cart" />
          </button>
        </div>
      </div>
      <div className="product-description">
        <h1>Description</h1>
        <p>{product.description}</p>
      </div>
    </div>
  );
});

Description.displayName = "Description";
