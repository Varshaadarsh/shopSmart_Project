import { Link } from "react-router-dom";

function OfferBanner() {
  const offers = [
    {
      title: "🔥 Electronics Sale",
      subtitle: "Up to 50% OFF",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      title: "💄 Beauty Deals",
      subtitle: "Flat 30% OFF",
      category: "beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      title: "🥦 Grocery Offers",
      subtitle: "Buy 1 Get 1",
      category: "groceries",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
  ];

  return (
    <div className="container my-4">
      <div className="row g-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-4"
          >
            <Link
              to={`/category/${offer.category}`}
              className="text-decoration-none"
            >
              <div className="card offer-card border-0 shadow-sm">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="offer-image"
                />

                <div className="card-body text-center">
                  <h5>{offer.title}</h5>
                  <p>{offer.subtitle}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferBanner;