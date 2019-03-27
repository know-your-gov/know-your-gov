import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../ducks/authReducer";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import VisibilityOff from "@material-ui/icons/VisbilityOff";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from "@material-ui/core/colors/grey";

import "./Auth.css";

const primary = grey[900];
const secondary = grey[800];

const styles = theme => ({
  main: {
    width: "auto",
    height: "100vh",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: secondary
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: primary,
    color: "#fff"
  },
  login: {
    width: "30%",
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 30,
    backgroundColor: primary,
    color: "#fff",
    textDecoration: "none",
    [theme.breakpoints.down(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: theme.spacing.unit * 22
    }
  },
  zipInput: {
    marginRight: theme.spacing.unit * 20,
    width: "50%"
  }
});

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      address: "",
      city: "",
      state: "",
      zip: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { classes, authError, auth } = this.props;
    console.log(this.state);
    console.log(styles);
    if (auth.uid) return <Redirect to="/dashboard" />;
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              color={primary}
              className={classes.login}
            >
              Login
            </Button>
          </Link>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <div className="address-div">
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="address">Address Line 1</InputLabel>
                <Input
                  disableUnderline="true"
                  type="address"
                  id="address"
                  placeholder="Address line 1"
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="city">City</InputLabel>
                <Input
                  disableUnderline="true"
                  type="city"
                  id="city"
                  placeholder="City"
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="zip">State</InputLabel>
                <Input
                  // disableUnderline="true"
                  className={classes.zipInput}
                  type="state"
                  id="state"
                  placeholder="State"
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
            <div className="submit-div">
              <FormControl margin="normal">
                <InputLabel htmlFor="zip">Zip Code</InputLabel>
                <Input
                  // disableUnderline="true"
                  className={classes.zipInput}
                  type="number"
                  id="zip"
                  placeholder="Zip Code"
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                disableUnderline="true"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // classes={

                // }
                className={classes.submit}
              >
                Sign Up
              </Button>
            </div>
            <div className="error">{authError ? <p>{authError}</p> : null}</div>
          </form>
        </Paper>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignUp);
