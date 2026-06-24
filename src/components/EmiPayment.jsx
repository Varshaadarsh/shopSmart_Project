import { useState } from "react";

function EmiPayment({ onSuccess }) {
  const amount = 24000;

  const [months, setMonths] =
    useState(12);

  const emi = Math.round(
    amount / months
  );

  return (
    <div className="card p-4 shadow">

      <select className="form-select mb-3">
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>SBI</option>
        <option>Axis Bank</option>
      </select>

      <select
        className="form-select mb-3"
        value={months}
        onChange={(e) =>
          setMonths(Number(e.target.value))
        }
      >
        <option value={3}>3 Months</option>
        <option value={6}>6 Months</option>
        <option value={12}>12 Months</option>
        <option value={24}>24 Months</option>
      </select>

      <h5>
        EMI: ₹{emi}/month
      </h5>

      <button
        className="btn btn-success mt-3"
        onClick={onSuccess}
      >
        Confirm EMI
      </button>

    </div>
  );
}

export default EmiPayment;