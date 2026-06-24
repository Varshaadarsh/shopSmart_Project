import ProductCard from "./ProductCard";

function ProductGrid({ products = [], addToCart, addToCompare }) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <ProductCard
            product={product}
            addToCart={addToCart}
            addToCompare={addToCompare}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;