import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import OfferBanner from "../components/OfferBanner";

function Home({ products, addToCart, addToCompare }) {
  const categoryGroups = {
    electronics: [
      "laptops",
      "mobile-accessories",
    ],

    fashion: [
      "mens-shirts",
      "mens-shoes",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
    ],

    mobiles: [
      "smartphones",
      "tablets"
    ],

    beauty: [
      "beauty",
      "fragrances",
      "skin-care",
    ],

    home: [
      "furniture",
      "home-decoration",
      "kitchen-accessories",
    ],

    groceries: ["groceries"],

    more: [
      "sports-accessories",
      "sunglasses",
    ]
  };

  return (
    <>
      <Banner />
      <OfferBanner />

      {Object.entries(categoryGroups).map(
        ([groupName, categories]) => {
          const categoryProducts = products.filter(
            (product) =>
              categories.includes(product.category)
          );

          return (
            <div
              key={groupName}
              className="container mb-5"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold text-capitalize">
                  {groupName}
                </h2>

                <Link
                  to={`/category/${groupName}`}
                  className="btn btn-outline-primary"
                >
                  More →
                </Link>
              </div>

              <div className="row g-4">
                {categoryProducts
                  .slice(0, 4)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        addToCompare={addToCompare}
                      />
                    </div>
                  ))}
              </div>
            </div>
          );
        }
      )}
    </>
  );
}

export default Home;