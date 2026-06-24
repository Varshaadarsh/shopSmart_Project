import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-5">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-logo">
              🛍️ ShopSmart
            </h3>

            <p className="footer-description">
              ShopSmart is your trusted online shopping destination
              for electronics, fashion, beauty, groceries and much more.
              Enjoy secure shopping and fast delivery.
            </p>

            <div className="footer-social">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">
              Quick Links
            </h5>

            <ul className="list-unstyled footer-menu">
              <li>
                <Link
                  to="/"
                  className="footer-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="footer-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="footer-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/compare"
                  className="footer-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">
              Categories
            </h5>

            <ul className="list-unstyled footer-menu">
              <li>
                <Link to="/category/electronics">
                  Electronics
                </Link>
              </li>

              <li>
                <Link to="/category/fashion">
                  Fashion
                </Link>
              </li>

              <li>
                <Link to="/category/beauty">
                  Beauty
                </Link>
              </li>

              <li>
                <Link to="/category/groceries">
                  Groceries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">
              Contact Us
            </h5>

            <div className="footer-contact">
              <p>
                <FaEnvelope className="me-2" />
                support@shopsmart.com
              </p>

              <p>
                <FaPhoneAlt className="me-2" />
                +91 98765 43210
              </p>

              <p>
                <FaMapMarkerAlt className="me-2" />
                Kochi, Kerala, India
              </p>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © 2026 ShopSmart. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;