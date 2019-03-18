import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div>
      Landing Page
      <Link to="/login">
        <button>Login/SignUp</button>
      </Link>
    </div>
  );
};

export default LandingPage;
