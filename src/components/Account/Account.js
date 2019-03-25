import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../config/fbConfig";
import "firebase/auth";
import { updateAccount } from "../../ducks/authReducer";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
// import Avatar from "@material-ui/core/Avatar";
// import grey from "@material-ui/core/colors/grey";
import "./Account.css";
// import axios from "axios";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 700,
    marginRight: "5%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

// const primary = grey[900];
// const secondary = grey[800];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,

      city: "",
      state: "",
      zip: "",
      address: ""
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateAccount(this.state);
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state);
    // console.log(firebase.auth().currentUser);
    const { user } = this.props;
    // console.log(user);
    return (
      <div className="accountPage">
        {!this.state.edit ? (
          <div className="accountCard">
            <Card className={classes.card}>
              <CardContent>
                <div className="title">
                  <h1>Account Information</h1>
                </div>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Email Address:
                </Typography>
                <Typography variant="h5" component="h2">
                  {firebase.auth().currentUser.email}
                </Typography>
                <br />
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Address:
                </Typography>
                <Typography variant="h5" component="h2">
                  {user && user[0].address}
                </Typography>
                <br />
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  City:
                </Typography>
                <Typography variant="h5" component="h2">
                  {user && user[0].city}
                </Typography>
                <br />
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  State:
                </Typography>
                <Typography variant="h5" component="h2">
                  {user && user[0].state}
                </Typography>
                <br />
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Zip Code:
                </Typography>
                <Typography variant="h5" component="h2">
                  {user && user[0].zip}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.toggleEdit}>
                  Edit Information
                </Button>
              </CardActions>
            </Card>
          </div>
        ) : (
          <div className="accountCard">
            <CssBaseline />
            <Paper className={classes.main}>
              <div className="title">
                <h1>Edit Account Information</h1>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.login}
                onClick={this.toggleEdit}
              >
                Cancel
              </Button>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Address</InputLabel>
                  <Input
                    id="address"
                    name="address"
                    autoComplete="address"
                    defaultValue={user && user[0].address}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">City</InputLabel>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="city"
                    defaultValue={user && user[0].city}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">State</InputLabel>
                  <Input
                    id="state"
                    name="state"
                    autoComplete="state"
                    defaultValue={user && user[0].state}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Zip Code</InputLabel>
                  <Input
                    id="zip"
                    name="zip"
                    autoComplete="zip"
                    defaultValue={user && user[0].zip}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // classes={

                  // }
                  className={classes.submit}
                >
                  Save
                </Button>
              </form>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.firestore);
  return {
    user: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAccount: newInfo => dispatch(updateAccount(newInfo))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(state => {
    console.log(state);
    return [{ collection: "users", doc: state.auth.uid }];
  }),
  withStyles(styles)
)(Account);

/*
const editStyles = theme => ({
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


*/
