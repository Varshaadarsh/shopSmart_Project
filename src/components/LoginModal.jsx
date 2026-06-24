import { useState } from "react";

function LoginModal({ show, onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  if (!show) return null;

  const sendOtp = () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);

    alert(`Demo OTP: ${newOtp}`);

    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    onLogin();
    onClose();
  };
  return (
    <div
      className="modal d-block"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)"
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "450px" }}
      >
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >
          <div
            className="text-center p-4"
            style={{
              background:
                "linear-gradient(135deg,#0d6efd,#4f46e5)",
              color: "white"
            }}
          >
            <h2>🛍️ ShopSmart</h2>

            <p className="mb-0">
              Secure OTP Login
            </p>
          </div>

          <div className="p-4">

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              className="btn btn-primary w-100"
              onClick={sendOtp}
            >
              Send OTP
            </button>

            {otpSent && (
              <>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                />

                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

            <button
              className="btn btn-link mt-3 w-100"
              onClick={onClose}
            >
              Continue as Guest
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;