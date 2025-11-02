import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Description } from "../Components/Description/Description";

export const ProductDescription = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from env

  useEffect(() => {
    console.log("useEffect triggered for productId:", productId);
    console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
    console.log("API Base URL 2:", import.meta.env.VITE_API_BASE_URL2);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/products/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Description product={product} />
    </div>
  );
};
