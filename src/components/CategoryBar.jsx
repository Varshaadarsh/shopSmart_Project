import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

function CategoryBar() {
  const [open, setOpen] = useState(false);

  const categories = [
    "electronics",
    "fashion",
    "mobiles",
    "beauty",
    "groceries",
    "home",
    "more"
  ];

  return (
    <div className="categories-bar">

      <button
        className="category-toggle"
        onClick={() => setOpen(!open)}
      >
        Categories

        {open ? (
          <FaChevronUp />
        ) : (
          <FaChevronDown />
        )}
      </button>

      {open && (
        <div className="category-menu">

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="category-link"
              onClick={() => setOpen(false)}
            >
              {cat}
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}

export default CategoryBar;