import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");

  const handleContinue = () => {
    if (
      !fullName ||
      !mobile ||
      !address1 ||
      !city ||
      !state ||
      !country ||
      !pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    navigate("/payment");
  };

  return (
    <div className="container py-4">
      <div className="checkout-card card shadow-sm p-4">
        <h2 className="mb-4">
          Delivery Address
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Address Line 1"
          value={address1}
          onChange={(e) =>
            setAddress1(e.target.value)
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Address Line 2"
          value={address2}
          onChange={(e) =>
            setAddress2(e.target.value)
          }
        />

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
            />
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value)
              }
            />
          </div>
        </div>

        <div className="card p-3 mb-3">
          <h5>Shipment Details</h5>
          <p>Standard Delivery</p>
          <p>Estimated Delivery: 3-5 Days</p>
        </div>

        <button
          className="btn btn-success"
          onClick={handleContinue}
        >
          Continue To Payment
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;