import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("✅ Payment Successful! 🎉 Enjoy your subscription.");
    navigate("/"); // redirect back to homepage
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Checkout</h1>
      <p className="payment-subtitle">Complete your payment to start streaming 🚀</p>

      {/* Payment Method Switch */}
      <div className="payment-methods">
        <button
          className={paymentMethod === "card" ? "active" : ""}
          onClick={() => setPaymentMethod("card")}
        >
          💳 Card
        </button>
        <button
          className={paymentMethod === "upi" ? "active" : ""}
          onClick={() => setPaymentMethod("upi")}
        >
          📱 UPI
        </button>
      </div>

      {/* Payment Form */}
      <form className="payment-form" onSubmit={handlePayment}>
        {paymentMethod === "card" && (
          <>
            <input type="text" placeholder="Card Number" required />
            <div className="card-details">
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVV" required />
            </div>
            <input type="text" placeholder="Cardholder Name" required />
          </>
        )}

        {paymentMethod === "upi" && (
          <>
            <input type="text" placeholder="Enter UPI ID (example@upi)" required />
          </>
        )}

        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
