import "./App.css";
import { Navbar } from "./Components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AboutUs } from "./Pages/AboutUs";
import { ContactUs } from "./Pages/ContactUs";
import { Products } from "./Pages/Products";
import { Shop } from "./Pages/Shop";
import { Cart } from "./Pages/Cart";
import { LoginPage } from "./Pages/LoginPage";
import { Footer } from "./Components/Footer/Footer";
import { ProductDescription } from "./Pages/ProductDescription";
import { CheckoutPage } from "./Pages/Checkout";
import Myorders from "./Pages/Myorders";
import { TopBar } from "./Components/TopBar/TopBar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {}
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/*"
            element={
              <div>
                <TopBar />
                <Navbar />
                <Routes>
                  <Route path="/home" element={<Shop />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/ContactUs" element={<ContactUs />} />
                  <Route path="/Shop" element={<Products />} />
                  <Route
                    path="/Shop/:productId"
                    element={<ProductDescription />}
                  />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/MyOrders" element={<Myorders />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
