import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../ducks/authReducer";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import "./NavBarStyling.css";
import { withStyles } from "@material-ui/core";

const styles = {
  button: {
    color: "white"
  }
};

const SignedInLinks = props => {
  const { classes } = props;
  return (
    <div>
      <div className="navLinks">
        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button className={classes.button}>Dashboard</Button>
        </Link> */}

        <Link to={`/account`} style={{ textDecoration: "none" }}>
          <Button className={classes.button}> Account </Button>
        </Link>
        <Link to="/bills" style={{ textDecoration: "none" }}>
          <Button className={classes.button}> Bills </Button>
        </Link>
        <Link to="/politicians" style={{ textDecoration: "none" }}>
          <Button className={classes.button}> Politicians</Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button className={classes.button} onClick={props.signOut}>
            Logout{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

SignedInLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignedInLinks);
