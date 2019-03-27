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
    // marginRight: "5%",
    background: "transparent"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    color: "white",
    textAlign: "left"
  },
  pos: {
    marginBottom: 12
  },
  content: {
    color: "white",
    textAlign: "left"
  }
};

// const primary = grey[900];
// const secondary = grey[800];

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      state: "",
      zip: "",
      address: ""
    };
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state);
    // console.log(firebase.auth().currentUser);
    const { user } = this.props;
    // console.log(user);
    return (
      <div className="accountPage">
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
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
                {firebase.auth().currentUser.email}
              </Typography>
              <br />
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Username:
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
                {user && user[0].username}
              </Typography>
              <br />
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Address:
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
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
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
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
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
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
              <Typography
                variant="h5"
                component="h2"
                className={classes.content}
              >
                {user && user[0].zip}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={this.props.toggleEdit}
                className={classes.content}
              >
                Edit Information
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

AccountInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.firestore);
  return {
    user: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(state => {
    console.log(state);
    return [{ collection: "users", doc: state.auth.uid }];
  }),
  withStyles(styles)
)(AccountInfo);
