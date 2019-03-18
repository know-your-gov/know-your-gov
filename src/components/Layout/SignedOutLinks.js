import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const SignedOutLinks = () => {
  let userId = 1;
  var style = {
    float: "left",
    fontSize: 25,
    marginLeft: "5vw"
  };

  return (
    <div>
      {/* <AppBar> */}
      <Typography style={style} variant="display2" gutterBottom>
        KnowYourGov.com
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        {/* <Link to={`/account/${userId}`}>
        <Button> Account </Button>
      </Link> */}
        <Link to="/bills">
          <Button> Bills </Button>
        </Link>
        <Link to="/politicians">
          <Button>Politicians</Button>
        </Link>
        <Link to="/login">
          <Button>Login </Button>
        </Link>
      </div>
      {/* </AppBar> */}
    </div>
  );
};
export default SignedOutLinks;
