import { useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () =>
      clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h1>
        🎉 Order Placed Successfully!
      </h1>

      <p className="mt-3">
        Your order has been confirmed.
      </p>

      <p className="text-muted">
        Redirecting to Home Page in
        5 seconds...
      </p>

      <Link
        to="/"
        className="btn btn-success mt-3"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;