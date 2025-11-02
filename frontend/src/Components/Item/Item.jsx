/* eslint-disable react/prop-types */
import "./Item.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Item = ({ product }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL2;

  return (
    <div className="Item">
      <Link to={`/Shop/${product._id}`}>
        <img
          src={`${apiBaseUrl}/uploads/${product.image}`}
          onClick={window.scrollTo(0, 0)}
          alt={product.name}
          className="item-image"
        />
      </Link>
      <h3 className="item-name">{product.name}</h3>
      <div className="item-info">
        <div className="item-price">Rs.{product.price}</div>
      </div>
    </div>
  );
};
