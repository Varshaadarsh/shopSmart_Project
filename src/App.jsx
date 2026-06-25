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
import Wishlist from "./pages/Wishlist";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "wishlist"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });
  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn") === "true"
    );

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
    }
  }, [isLoggedIn]);
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Products:", data.products);
        console.log("Local Products:", localProducts);

        const allProducts = [
          ...data.products,
          ...localProducts,
        ].map((product) => ({
          ...product,
          searchTerms: `
    ${product.title || ""}
    ${product.brand || ""}
    ${product.category || ""}
    ${product.category === "smartphones"
              ? "mobile mobiles phone phones"
              : ""
            }
    ${product.category === "laptops"
              ? "laptop laptops notebook"
              : ""
            }
    ${product.category === "beauty"
              ? "beauty makeup cosmetics skincare mascara lipstick"
              : ""
            }
    ${product.category === "groceries"
              ? "grocery groceries food"
              : ""
            }
    ${product.category === "furniture"
              ? "sofa chair table furniture"
              : ""
            }
  `.toLowerCase(),
        }));

        console.log("ALL PRODUCTS", allProducts);

        setProducts(allProducts);
        setLoading(false);

      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already in wishlist");
      return;
    }

    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
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

  if (loading) {
    return (
      <div className="page-loader">
        <h1 className="loader-logo">
          ShopSmart
        </h1>

        <div className="loader-spinner"></div>

        <p className="loader-text">
          Loading Amazing Deals...
        </p>
      </div>
    );
  }

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
        wishlist={wishlist}
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
                addToWishlist={addToWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                addToCompare={addToCompare}
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
                addToWishlist={addToWishlist}
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
                addToWishlist={addToWishlist}
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
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
                addToCompare={addToCompare}
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
                addToWishlist={addToWishlist}
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
      </MainLayout >
    </>
  );
}

export default App;