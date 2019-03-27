import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";
import { getUser } from "../../ducks/authReducer";
// import firebase from "../../config/fbConfig";
import "firebase/auth";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Representative from "./Representative";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ElectionList from "./ElectionList";
import axios from "axios";
import "./Dashboard.css";

const styles = {
  card: {
    background: "rgba(198, 198, 208, 0.05)"

    // margin: "0 auto"
  },
  cardTitle: {
    color: "white",
    fontSize: "2.5rem",
    fontFamily: "Lato, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  cardImg: {
    marginLeft: "1.5rem"
  },
  cardTypography: {
    color: "white"
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officials: [],
      bills: []
    };
  }

  componentDidMount() {
    this.props.getUser();
    // console.log(this.props.user);
    // this.props.user && this.getRepresentatives();
    // console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // console.log(prevProps);
      console.log(this.props);

      this.props.user && this.getRepresentatives();
    }
  }

  getRepresentatives = () => {
    const { user } = this.props;
    axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/representatives?address=${user &&
          user.address}&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${
          process.env.REACT_APP_GOOGLE_CIVIC
        }`,
        {
          header: {
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState(
          {
            officials: res.data.officials
          } /*, () =>
          console.log(this.state.officials)*/
        );
      });
  };

  showReps = () => {
    const { officials } = this.state;
    if (officials.length > 0) {
      return officials.map((official, i) => {
        return (
          <li key={i}>
            <Representative repDets={official} key={i} />
          </li>
        );
      });
    }
  };

  handleBillFavor = () => {};

  render() {
    const { classes } = this.props;
    console.log(this.props.user);
    return (
      <div style={{ height: "100%", marginTop: "5vh" }}>
        <div>
          {/* welcome card */}
          <div className="card">
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.cardTitle}>
                  Welcome {this.props.user && this.props.user.username}!{" "}
                  <img
                    src="united-states.png"
                    alt="flag"
                    className={classes.cardImg}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="typography">
            <Typography variant="h4" className={classes.cardTypography}>
              Your U.S. Legislators
            </Typography>
            <span className="undertext">(Based on your physical address)</span>
          </div>
          {/* card showing senate representatitve */}
          {/* <Representative repDets = {this.state.senateRep}/>
          <Representative repDets = {this.state.congressRep}/> */}
          <div className="reps">
            <ul>{this.showReps()}</ul>
          </div>
          <div className="elections">
            <ElectionList />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    auth: state.firebase.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Dashboard);
