import React from "react";
import "./Subscription.css";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "₹299 / month",
      features: ["1 Device", "720p Quality", "Limited Content"],
    },
    {
      id: 2,
      name: "Standard",
      price: "₹499 / month",
      features: ["2 Devices", "1080p Full HD", "All Movies & Shows"],
    },
    {
      id: 3,
      name: "Premium",
      price: "₹799 / month",
      features: ["4 Devices", "4K Ultra HD + HDR", "Ad-Free Experience"],
    },
  ];

  return (
    <div className="subscription-container">
      <h1 className="sub-title">Choose Your Plan</h1>
      <p className="sub-subtitle">
        Subscribe now and enjoy unlimited movies & TV shows 🎬
      </p>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
            <button
              className="subscribe-btn"
              onClick={() => navigate("/payment")}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
