import { Link } from "react-router-dom";

import {
  FaLaptop,
  FaTshirt,
  FaHome,
  FaMobileAlt,
  FaHeart,
  FaShoppingBasket,
  FaCar,
  FaEllipsisH,
} from "react-icons/fa";

function Categories() {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: <FaLaptop />,
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: <FaTshirt />,
    },
    {
      id: "home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      id: "mobiles",
      name: "Mobiles",
      icon: <FaMobileAlt />,
    },
    {
      id: "beauty",
      name: "Beauty",
      icon: <FaHeart />,
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: <FaShoppingBasket />,
    },
    {
      id: "more",
      name: "More",
      icon: <FaEllipsisH />,
    },
  ];

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="categories-bar shadow-sm py-3">
      <div className="container">
        <div className="row text-center g-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="col-6 col-md category-link"
            >
              <Link
                to={`/category/${category.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="d-flex flex-column align-items-center category-item">
                  <div className="category-icon mb-2">
                    {category.icon}
                  </div>

                  <small className="fw-semibold">
                    {category.name}
                  </small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;