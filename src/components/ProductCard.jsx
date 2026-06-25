import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function ProductCard({
  product,
  addToCart,
  addToCompare,
  addToWishlist
}) {
  const [imageLoaded, setImageLoaded] =
    useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 shadow-sm border-0 product-card">

        {/* Shimmer Loader */}
        {!imageLoaded && (
          <div className="image-shimmer"></div>
        )}

        <img
          src={product.thumbnail}
          alt={product.title}
          className={`card-img-top product-image ${imageLoaded ? "d-block" : "d-none"
            }`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="card-body d-flex flex-column">
          <h6 className="card-title fw-semibold">
            {product.title}
          </h6>

          <p className="text-muted mb-1">
            {product.brand}
          </p>

          <div className="mb-2">
            <span className="badge bg-success">
              ⭐ {product.rating}
            </span>
          </div>

          <h5 className="text-success fw-bold">
            ₹{Math.round(product.price * 85)}
          </h5>

          <small className="text-danger mb-3">
            {Math.round(
              product.discountPercentage
            )}
            % OFF
          </small>

          <button
            className="btn btn-primary mt-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add To Cart
          </button>

          <button
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCompare(product);
            }}
          >
            ⚖ Compare
          </button>

          <button
            className="btn btn-danger w-100 mt-2"
            onClick={() => addToWishlist(product)}
          >
            <FaHeart /> Wishlist
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;