import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
      zip: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    // this.props.
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);
    console.log(styles);

    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Link to="/login">
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
          <form className={classes.form}>
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
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Address Line 1</InputLabel>
              <Input
                type="address"
                id="address"
                placeholder="Address line 1"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="city">City</InputLabel>
              <Input
                type="city"
                id="city"
                placeholder="City"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="zip">Zip Code</InputLabel>
              <Input
                type="number"
                id="zip"
                placeholder="Zip Code"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
