import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import "./NavBarStyling.css";

const Navbar = props => {
  const { auth } = props;
  // console.log(props);
  return (
    <div className="header">
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <h2>KnowYourGov.com</h2>
      </Link>
      <div className="links">
        {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
      </div>
    </div>
  );
};

const mapStateToPtops = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  withRouter,
  connect(mapStateToPtops)
)(Navbar);
