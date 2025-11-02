import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import "./Newarrivals.css";
import { Item } from "../Item/Item";

export const Newarrivals = () => {
  const [products, setProducts] = useState([]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/products`); // Use dynamic API URL
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [apiBaseUrl]);

  return (
    <div className="NewArrivals">
      <h2>New Arrivals</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products
            .slice(0, 3)
            .map((product) => <Item key={product._id} product={product} />)
        )}
      </div>
    </div>
  );
};
