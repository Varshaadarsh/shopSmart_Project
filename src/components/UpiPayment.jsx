import { useState } from "react";

function UpiPayment({ onSuccess }) {
  const [upiId, setUpiId] = useState("");

  const validUPIs = [
    "varsha@okaxis",
    "demo@oksbi",
  ];

  const handlePay = () => {
    const upiRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;

    if (!upiRegex.test(upiId)) {
      alert("Invalid UPI ID");
      return;
    }

    if (!validUPIs.includes(upiId)) {
      alert("UPI Authentication Failed");
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
    <div className="card p-4 shadow">
      <select className="form-select mb-3">
        <option>Google Pay</option>
        <option>PhonePe</option>
        <option>Paytm</option>
        <option>BHIM</option>
      </select>

      <input
        className="form-control mb-3"
        placeholder="Enter UPI ID"
        value={upiId}
        onChange={(e) =>
          setUpiId(e.target.value)
        }
      />

      <button
        className="btn btn-success"
        onClick={handlePay}
      >
        Verify & Pay
      </button>
    </div>
  );
}

export default UpiPayment;