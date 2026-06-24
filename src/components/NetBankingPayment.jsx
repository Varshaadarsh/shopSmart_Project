import { useState } from "react";

function NetBankingPayment({ onSuccess }) {
  const [bank, setBank] = useState("SBI");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handlePay = () => {
    if (!userId.trim()) {
      alert("Please enter Customer ID");
      return;
    }

    if (!password.trim()) {
      alert("Please enter Password");
      return;
    }

    if (userId.length < 4) {
      alert("Invalid Customer ID");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
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

    if (!enteredOtp) {
      alert("OTP Verification Failed");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    onSuccess();
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">
        Net Banking
      </h4>

      <select
        className="form-select mb-3"
        value={bank}
        onChange={(e) =>
          setBank(e.target.value)
        }
      >
        <option value="SBI">
          SBI
        </option>
        <option value="HDFC">
          HDFC
        </option>
        <option value="ICICI">
          ICICI
        </option>
        <option value="Axis">
          Axis
        </option>
      </select>

      <input
        className="form-control mb-3"
        placeholder="Customer ID"
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="btn btn-success w-100"
        onClick={handlePay}
      >
        Login & Pay
      </button>
    </div>
  );
}

export default NetBankingPayment;