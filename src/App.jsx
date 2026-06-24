import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import LoginModal from "./components/LoginModal";
import localProducts from "./data/products.json";
import CategoryPage from "./pages/CategoryPage";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccess from "./pages/OrderSuccess";
import ComparePage from "./pages/ComparePage";
import ChatBot from "./components/ChatBot";
import { askAI } from "./services/groq";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn") === "true"
    );

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Products:", data.products);
        console.log("Local Products:", localProducts);

        const allProducts = [
          ...data.products,
          ...localProducts,
        ];

        console.log("ALL PRODUCTS", allProducts);

        setProducts(allProducts);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      setCartItems([...cartItems, product]);
      alert("Added to Cart");
    }
  };

  const addToCompare = (product) => {
    const exists = compareItems.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Product already added for comparison");
      return;
    }

    if (compareItems.length >= 3) {
      alert("You can compare only 3 products at a time");
      return;
    }

    setCompareItems((prev) => [...prev, product]);

    alert(`${product.title} added for comparison`);
  };

  return (
    <>

      <ScrollToTop />

      <ChatBot
        products={products}
        addToCart={addToCart}
        addToCompare={addToCompare}
        cartItems={cartItems}
      />
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
      />

      <MainLayout
        openLogin={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        cartCount={cartItems.length}
        compareCount={compareItems.length}
        products={products}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
              />
            }
          />

          <Route
            path="/category/:categoryName"
            element={
              <CategoryPage
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
                cartItems={cartItems}
              />
            }
          />

          <Route
            path="/payment"
            element={
              <PaymentPage
                setCartItems={
                  setCartItems
                }
              />
            }
          />

          <Route
            path="/success"
            element={
              <OrderSuccess
                products={products}
                addToCart={addToCart}
                addToCompare={addToCompare}
              />
            }
          />

          <Route
            path="/compare"
            element={
              <ComparePage
                compareItems={compareItems}
                setCompareItems={setCompareItems}
              />
            }
          />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;