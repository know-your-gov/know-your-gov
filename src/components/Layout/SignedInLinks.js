import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../ducks/authReducer";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const SignedInLinks = props => {
  let userId = 1;
  var style = {
    float: "left",
    fontSize: 25,
    marginLeft: "5vw",

    color: "black"
  };

  return (
    <div>
      {/* <AppBar> */}
      <Typography style={style} variant="display2" gutterBottom>
        KnowYourGov.com
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/dashboard">
          <Button color="primary">Dashboard</Button>
        </Link>
        <Link to={`/account/${userId}`}>
          <Button color="primary"> Account </Button>
        </Link>
        <Link to="/bills">
          <Button color="primary"> Bills </Button>
        </Link>
        <Link to="/politicians">
          <Button color="primary"> Politicians</Button>
        </Link>
        <Link to="/">
          <Button color="primary" onClick={props.signOut}>
            Logout{" "}
          </Button>
        </Link>
      </div>
      {/* </AppBar> */}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
