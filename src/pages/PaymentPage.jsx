import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CardPayment from "../components/CardPayment";
import UpiPayment from "../components/UpiPayment";
import NetBankingPayment from "../components/NetBankingPayment";
import EmiPayment from "../components/EmiPayment";

function PaymentPage({
  setCartItems,
}) {
  const [method, setMethod] =
    useState("card");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (isLoggedIn !== "true") {
      alert(
        "Please login before placing an order"
      );

      navigate("/");
      return;
    }

    window.scrollTo(0, 0);
  }, [navigate]);

  const handleSuccess = () => {
    console.log(
      "PAYMENT SUCCESS"
    );

    alert(
      "Payment Successful!"
    );

    setCartItems([]);

    localStorage.removeItem(
      "cartItems"
    );

    navigate("/success");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        Payment Gateway
      </h2>

      <div className="btn-group mb-4 w-100">
        <button
          className={`btn ${
            method === "card"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setMethod("card")
          }
        >
          💳 Card
        </button>

        <button
          className={`btn ${
            method === "upi"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setMethod("upi")
          }
        >
          📱 UPI
        </button>

        <button
          className={`btn ${
            method ===
            "netbanking"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setMethod(
              "netbanking"
            )
          }
        >
          🏦 Net Banking
        </button>

        <button
          className={`btn ${
            method === "emi"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setMethod("emi")
          }
        >
          📅 EMI
        </button>
      </div>

      {method === "card" && (
        <CardPayment
          onSuccess={
            handleSuccess
          }
        />
      )}

      {method === "upi" && (
        <UpiPayment
          onSuccess={
            handleSuccess
          }
        />
      )}

      {method ===
        "netbanking" && (
        <NetBankingPayment
          onSuccess={
            handleSuccess
          }
        />
      )}

      {method === "emi" && (
        <EmiPayment
          onSuccess={
            handleSuccess
          }
        />
      )}
    </div>
  );
}

export default PaymentPage;