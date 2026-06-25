import { FaTrash } from "react-icons/fa";

function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
  addToCompare
}) {
  return (
    <div className="container mt-5 pt-5">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h3 className="text-center mt-5">
          No products in wishlist
        </h3>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div
              className="col-md-4 mb-4"
              key={product.id}
            >
              <div className="card h-100">

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h5>{product.title}</h5>

                  <p>
                    ₹{product.price}
                  </p>

                  <p>
                    ⭐ {product.rating}
                  </p>

                  <p>
                    {product.brand}
                  </p>

                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add To Cart
                  </button>

                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() =>
                      addToCompare(product)
                    }
                  >
                    Compare
                  </button>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
                  >
                    <FaTrash /> Remove
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;