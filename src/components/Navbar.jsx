import {
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
  FaBalanceScale,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function Navbar({
  openLogin,
  cartCount,
  compareCount,
  products = [],
}) {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") ===
    "true";

  const userName =
    localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((product) =>
        product.title
          ?.toLowerCase()
          .includes(
            value.toLowerCase()
          )
      )
      .slice(0, 6);

    setSuggestions(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/products?search=${encodeURIComponent(
        search
      )}`
    );

    setSuggestions([]);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow shopsmart-navbar">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
        >
          🛍️ ShopSmart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <form
            className="d-flex flex-grow-1 mx-lg-4 my-3 my-lg-0"
            onSubmit={handleSubmit}
          >
            <div className="input-group position-relative">
              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={search}
                onChange={
                  handleSearchChange
                }
              />

              <button
                className="btn btn-warning"
                type="submit"
              >
                <FaSearch />
              </button>

              {suggestions.length >
                0 && (
                <div
                  className="list-group position-absolute w-100"
                  style={{
                    top: "100%",
                    zIndex: 9999,
                  }}
                >
                  {suggestions.map(
                    (product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          setSearch(
                            product.title
                          );
                          setSuggestions(
                            []
                          );
                        }}
                      >
                        {
                          product.title
                        }
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </form>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mb-2 mb-lg-0 me-lg-2">
              {!isLoggedIn ? (
                <button
                  className="btn btn-light w-100"
                  onClick={
                    openLogin
                  }
                >
                  <FaUserCircle className="me-2" />
                  Login
                </button>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-white">
                    Hi, {userName}
                  </span>

                  <button
                    className="btn btn-light"
                    onClick={
                      handleLogout
                    }
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>

            <li className="nav-item mb-2 mb-lg-0 me-lg-2">
              <Link
                to="/compare"
                className="btn btn-outline-light w-100"
              >
                <FaBalanceScale className="me-2" />
                Compare (
                {compareCount})
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/cart"
                className="btn btn-outline-light w-100"
              >
                <FaShoppingCart className="me-2" />
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;