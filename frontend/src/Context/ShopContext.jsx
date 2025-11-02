import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const getDefaultCart = () => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};  
  };

  const [cartItems, setCartItems] = useState(() => getDefaultCart());
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  const addToCart = (product, quantity) => {
    if (!product || !product.name) {
      console.error("Invalid product passed to addToCart");
      return;
    }

    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.name]) {
        updatedCart[product.name].quantity += quantity;
      } else {
        updatedCart[product.name] = { ...product, quantity };
      }
      
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removefromcart = (itemName) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemName]) {
        if (updatedCart[itemName].quantity > 1) {
          updatedCart[itemName].quantity -= 1;
        } else {
          delete updatedCart[itemName]; 
        }
      } else {
        console.error(`Item with name ${itemName} not found in cart.`);
      }

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const getCartTotalAmount = () => {
    const total = Object.values(cartItems).reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Item Total: ${itemTotal}`);
      return total + itemTotal;
    }, 0);

    console.log(`Cart Total Amount: ${total}`);
    return total;
  };

  const totalCartItems = () => {
    const totalItems = Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    console.log("Total items in cart:", totalItems);
    return totalItems;
  };

  useEffect(() => {
    console.log("Updated cart items:", cartItems);
  }, [cartItems]);  

  const contextValue = { cartItems, addToCart, removefromcart, getCartTotalAmount, totalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
