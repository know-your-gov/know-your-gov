import React from "react";
// import {connect} from 'react-redux'
// import {compose} from 'redux'
// import { firestoreConnect } from "react-redux-firebase";
// import firebase from "../../config/fbConfig";
// import "firebase/auth";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Representative.css";

const styles = {
  media: {
    minWidth: "50%"
    // objectFit: "cover"
  },
  root: {
    width: "500px",
    height: "280px",
    margin: "0.5rem",
    display: "flex",
    background: "rgba(198, 198, 208, 0.05)"
  },
  content: {
    fontSize: "1rem"
  },
  h5: {
    fontSize: "1rem"
  },
  repInfo: {
    height: "100%",
    fontSize: "0.9rem",
    paddingTop: ".5rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    padding: "0"
  }
};

const Representative = props => {
  const { classes } = props;
  const dets = props.repDets;
  console.log(dets);
  return (
    <div>
      <Card className={classes.root}>
        {/* representative picture */}
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            src={dets.photoUrl ? dets.photoUrl : "blankuser.png"}
            title={dets.name}
          />
        </CardActionArea>

        {/* representative contact details */}
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            className={
              dets.party === "Republican Party"
                ? "repCardTitle republican"
                : dets.party === "Democratic Party"
                ? "repCardTitle democrat"
                : "repCardTitle"
            }
          >
            {dets.title} {dets.name}
          </Typography>
          <div className={classes.repInfo}>
            <p>Phone: {dets.phones[0]}</p>
            <p>
              Mailing: {dets.address[0].line1} {dets.address[0].city},{" "}
              {dets.address[0].state}, {dets.address[0].zip}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Representative.propTypes = {
  classes: PropTypes.object.isRequired
};

// function mapStateToProps(state){
//   return {
//     user: state.firestore.ordered.users,
//     auth: state.firebase.auth
//   };
// }

export default withStyles(styles)(Representative);

/*
firestoreConnect(state => {
    console.log(state);
    return [{ collection: "users", doc: state.auth.uid }];
  }),

  const mapStateToProps = state => {
  console.log(state.firestore);
  return {
    user: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};
*/
