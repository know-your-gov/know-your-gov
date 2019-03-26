import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";
import { getUser } from "../../ducks/authReducer";
// import firebase from "../../config/fbConfig";
import "firebase/auth";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Representative from "./Representative";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Clear from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ElectionList from "./ElectionList";
import axios from "axios";
import "./Dashboard.css";

const styles = {
  root: {
    width: "250px"
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
          <li>
            <Representative repDets={official} key={i} />
          </li>
        );
      });
    }
  };

  handleBillFavor = () => {};

  render() {
    console.log(this.props.user);
    return (
      <div style={{ height: "100%", marginTop: "5vh" }}>
        <div className="dashboard-main">
          {/* welcome card */}
          <div className="card">
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Welcome {this.props.user && this.props.user.username}!
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="typography">
            <Typography variant="h4">Your U.S. Legislators</Typography>
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
