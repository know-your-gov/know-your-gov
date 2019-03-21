import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import "./NavBarStyling.css"

const SignedOutLinks = () => {
  

  return (
    <div>
    <div className="navTitle">
      
        KnowYourGov.com
</div>
<div className="navLinks">
        <Link to="/dashboard">
          <Button color="primary">Dashboard</Button>
        </Link>
        <Link to="/bills">
          <Button color="primary"> Bills </Button>
        </Link>
        <Link to="/politicians">
          <Button color="primary"> Politicians</Button>
        </Link>
        <Link to="/login">
          <Button color="primary">
            Login
          </Button>
        </Link>
        </div>
    </div>
  );
};
export default SignedOutLinks;
