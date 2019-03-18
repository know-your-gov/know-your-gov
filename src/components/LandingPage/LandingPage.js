import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <Link to="/login">
        <Button color="primary">Login/SignUp</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
