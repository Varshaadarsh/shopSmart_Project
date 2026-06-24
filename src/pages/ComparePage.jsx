import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ComparePage({
  compareItems,
  setCompareItems,
}) {
  const navigate = useNavigate();

  const [showResult, setShowResult] =
    useState(false);

  const removeProduct = (id) => {
    setCompareItems(
      compareItems.filter(
        (item) => item.id !== id
      )
    );
  };

  const calculateScore = (product) => {
    return (
      product.rating * 40 +
      (product.discountPercentage || 0) * 2 +
      (product.stock || 0) * 0.2 -
      product.price * 0.01
    );
  };

  const bestProduct =
    compareItems.length > 1
      ? [...compareItems].sort(
        (a, b) =>
          calculateScore(b) -
          calculateScore(a)
      )[0]
      : null;

  if (compareItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-4">
          Compare Products
        </h2>

        <div className="alert alert-info">
          No products added for
          comparison.
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={() =>
            navigate("/products")
          }
        >
          + Add Products
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">
        Compare Products
      </h2>

      {/* Selected Products */}

      <div className="row">
        {compareItems.map((item) => (
          <div
            className="col-12 col-md-6 col-lg-4 mb-4"
            key={item.id}
          >
            <div className="card shadow h-100 position-relative">

              <button
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                onClick={() =>
                  removeProduct(item.id)
                }
              >
                ✖
              </button>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top p-3"
              />

              <div className="card-body">
                <h6>{item.title}</h6>

                <p className="mb-1">
                  ⭐ {item.rating}
                </p>

                <p className="text-success fw-bold">
                  ₹{item.price}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Empty Slot */}

        {compareItems.length < 3 && (
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100 text-center shadow"
              style={{
                cursor: "pointer",
                minHeight: "350px",
              }}
              onClick={() =>
                navigate("/products")
              }
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <h1 className="display-1">
                  +
                </h1>

                <h5>Add Product</h5>

                <p>
                  Select another
                  product
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compare Button */}

      {compareItems.length >= 2 && (
        <button
          className="btn btn-success btn-lg mb-4"
          onClick={() =>
            setShowResult(true)
          }
        >
          Compare Products
        </button>
      )}

      {/* Comparison Table */}

      {showResult &&
        compareItems.length >= 2 && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <tbody>
                  <tr>
                    <th>Name</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {item.title}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Brand</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {item.brand}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Price</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          ₹{item.price}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Rating</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          ⭐ {item.rating}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Discount</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {
                            item.discountPercentage
                          }
                          %
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Stock</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {item.stock ||
                            "N/A"}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Category</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {item.category}
                        </td>
                      )
                    )}
                  </tr>

                  <tr>
                    <th>Description</th>

                    {compareItems.map(
                      (item) => (
                        <td key={item.id}>
                          {
                            item.description
                          }
                        </td>
                      )
                    )}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation */}

            {bestProduct && (
              <div className="card border-success mt-4 shadow">
                <div className="card-body">
                  <h3 className="text-success">
                    🏆 Recommended
                    Product
                  </h3>

                  <h5>
                    {bestProduct.title}
                  </h5>

                  <p>
                    This product
                    offers the best
                    balance of
                    rating,
                    discount,
                    availability,
                    and value for
                    money.
                  </p>

                  <ul>
                    <li>
                      Rating: ⭐{" "}
                      {
                        bestProduct.rating
                      }
                    </li>

                    <li>
                      Price: ₹
                      {
                        bestProduct.price
                      }
                    </li>

                    <li>
                      Discount:{" "}
                      {
                        bestProduct.discountPercentage
                      }
                      %
                    </li>

                    <li>
                      Brand:{" "}
                      {
                        bestProduct.brand
                      }
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

      {/* Add More Button */}

      <div className="mt-4">
        {compareItems.length < 3 ? (
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              navigate("/products")
            }
          >
            + Add More Products
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            disabled
          >
            Maximum 3 Products Added
          </button>
        )}
      </div>
    </div>
  );
}

export default ComparePage;