import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails({
  cartItems,
  setCartItems,
  wishlist = [],
  addToWishlist,
  removeFromWishlist,
  addToCompare,
}) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  const addToCart = () => {
    const exists = cartItems.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      setCartItems([...cartItems, product]);
      alert("Added to Cart");
    }
  };

  const handleWishlist = () => {
    addToWishlist(product);
    alert("Added to Wishlist");
  };

  return (
    <div className="container mt-5">
      <div className="row bg-white p-4 shadow rounded">
        <div className="col-12 col-md-5 mb-4 mb-md-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded"
          />

          <div className="d-flex flex-wrap gap-2 mt-3">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                width="80"
                height="80"
                className="border rounded"
              />
            ))}
          </div>
        </div>

        <div className="col-12 col-md-7">
          <h2>{product.title}</h2>

          <div className="mb-3">
            <span className="badge bg-success fs-6">
              ⭐ {product.rating}
            </span>
          </div>

          <h3 className="text-success">
            ₹{Math.round(product.price * 85)}
          </h3>

          <p className="text-danger">
            {product.discountPercentage}% OFF
          </p>

          <p>{product.description}</p>

          <hr />

          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Weight:</strong> {product.weight} g</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning btn-lg"
              onClick={addToCart}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-danger btn-lg"
              onClick={handleWishlist}
            >
              Wishlist
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;