import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function CartPage({
  cartItems,
  products,
  addToCart,
  addToCompare
}) {

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">
        My Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your Cart is Empty</h4>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-card card mb-3"
            >
              <div className="row g-0 align-items-center">

                <div className="col-md-2 text-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid p-2"
                  />
                </div>

                <div className="col-md-10">
                  <div className="card-body">
                    <h5>{item.title}</h5>

                    <p className="text-success fw-bold">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

          <div className="card shadow-sm p-4 mb-5">
            <h4>Total: ₹{total}</h4>

            <Link
              to="/checkout"
              className="btn btn-primary mt-3"
            >
              Proceed to Checkout
            </Link>
          </div>

          {/* Frequently Bought Together */}

          <h3 className="mb-4">
            Frequently Bought Together
          </h3>

          <div className="row">
            {products
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="col-md-3 mb-4"
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    addToCompare={addToCompare}
                  />
                </div>
              ))}
          </div>

          {/* Top Rated Products */}

          <h3 className="mb-4 mt-5">
            Top Rated Products
          </h3>

          <div className="row">
            {[...products]
              .sort(
                (a, b) =>
                  (b.rating || 0) -
                  (a.rating || 0)
              )
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="col-md-3 mb-4"
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    addToCompare={addToCompare}
                  />
                </div>
              ))}
          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;