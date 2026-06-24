import { useState } from "react";

function CardPayment({ onSuccess }) {
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const validCards = [
    {
      number: "4111111111111111",
      name: "VARSHA",
      expiry: "12/30",
      cvv: "123",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(card.number)) {
      alert("Invalid Card Number");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(card.name)) {
      alert("Invalid Card Holder Name");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      alert("Invalid Expiry Date");
      return;
    }

    if (!/^\d{3}$/.test(card.cvv)) {
      alert("Invalid CVV");
      return;
    }

    const authenticated = validCards.find(
      (c) =>
        c.number === card.number &&
        c.name === card.name.toUpperCase() &&
        c.expiry === card.expiry &&
        c.cvv === card.cvv
    );

    if (!authenticated) {
      alert("Card Authentication Failed");
      return;
    }

    const generatedOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    alert(
      `Demo OTP Sent Successfully\nOTP: ${generatedOtp}`
    );

    const enteredOtp = prompt(
      "Enter the OTP"
    );

    if (enteredOtp !== generatedOtp) {
      alert("OTP Verification Failed");
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card p-4 shadow">
        <input
          className="form-control mb-3"
          placeholder="Card Number"
          value={card.number}
          onChange={(e) =>
            setCard({ ...card, number: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Card Holder Name"
          value={card.name}
          onChange={(e) =>
            setCard({ ...card, name: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="MM/YY"
          value={card.expiry}
          onChange={(e) =>
            setCard({ ...card, expiry: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="CVV"
          value={card.cvv}
          onChange={(e) =>
            setCard({ ...card, cvv: e.target.value })
          }
        />

        <button
          className="btn btn-success w-100"
          type="submit"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}

export default CardPayment;