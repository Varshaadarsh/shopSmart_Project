import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

function Products({
  products,
  addToCart,
  addToCompare,
}) {
  const location = useLocation();

  const searchParams =
    new URLSearchParams(
      location.search
    );

  const searchQuery =
    searchParams.get("search") || "";

  if (!products.length) {
    return (
      <div className="container mt-4">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  const filteredProducts =
    searchQuery.trim() === ""
      ? products
      : products.filter((product) => {
        const search =
          searchQuery.toLowerCase();

        return (
          product.title
            ?.toLowerCase()
            .includes(search) ||
          product.brand
            ?.toLowerCase()
            .includes(search) ||
          product.category
            ?.toLowerCase()
            .includes(search) ||
          product.description
            ?.toLowerCase()
            .includes(search)
        );
      });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "All Products"}
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-5">
          <h3>
            No products found for "
            {searchQuery}"
          </h3>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map(
            (product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  addToCompare={
                    addToCompare
                  }
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Products;