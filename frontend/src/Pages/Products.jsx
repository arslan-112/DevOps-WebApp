import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../Components/Item/Item";
import "./Css/Products.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from env

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/products`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [apiBaseUrl]);

  return (
    <div className="Products-Container">
      <h2>All Products</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <Item key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
