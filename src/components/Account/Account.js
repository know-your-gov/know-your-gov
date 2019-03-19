import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../config/fbConfig";
import "firebase/auth";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Account.css";
import axios from "axios";

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

function editHandler() {
  //firebase stuff here?!
  // axios.put()
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ""
    };
  }

  componentDidMount() {
    this.setState({ uid: firebase.auth().currentUser.uid });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    console.log(firebase.auth().currentUser);
    return (
      <div className="accountCard">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Account information:
            </Typography>
            <Typography variant="h5" component="h2">
              {/* {this.props.user.username} */} Username
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
              {/* {this.props.user.city} */} City Here
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
              {/* {this.props.user.state} */} State Here
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
              {/* {this.props.user.zipCode} */} Zip Code Here
            </Typography>
            <br />
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Account information:
            </Typography>
            <Typography variant="h5" component="h2">
              {/* {this.props.user.address} */} Address Here
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                editHandler();
              }}
            >
              Edit Information
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.firestore);
  return {
    user: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }]),
  withStyles(styles)
)(Account);
