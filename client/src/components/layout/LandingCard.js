import React from "react";
import "../assets/LandingCard.css";
import { Link } from "react-router-dom";

function LandingCard() {
  return (
<div className="card" style="width: 18rem;">
  <div className="card-body">
    <h5 className="card-title">Ready To Meet your People?</h5>
    <Link className="btn btn-primary" to="/Signup">Sign Up!</Link>
  </div>
</div>
  );
}

export default LandingCard;