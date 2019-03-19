import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
    return (
      <div style={{ padding: 10, backgroundColor:"lightgray",}}>
        <SignedInLinks/>
      </div>
    );
};

export default Navbar;
