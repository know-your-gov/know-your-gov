import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth } = props;
  return (
    <div style={{ backgroundColor: "lightgray", width:"100vw"}}>
      {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
    </div>
  );
};

const mapStateToPtops = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToPtops)(Navbar);
