import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
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
    this.getRecentBills();
    // console.log(this.props.user);
    // this.props.user && this.getRepresentatives();
    // console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // console.log(prevProps);
      // console.log(this.props);

      this.props.user && this.getRepresentatives();
    }
  }

  getRecentBills = () => {
    axios
      .get(
        "https://api.propublica.org/congress/v1/115/both/bills/introduced.json",
        {
          headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
        }
      )
      .then(res => {
        const bills = res.data.results[0].bills;
        const recents = bills.slice(0, 6);
        this.setState({ bills: recents });
      });
  };

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
        this.setState({ officials: res.data.officials } /*, () =>
          console.log(this.state.officials)*/
        );
      });
  };

  billPanelShow = () => {
    const { classes } = this.props;
    const bills = this.state.bills;
    if (bills.length > 0) {
      return (
        <div style={{ width: "20vw" }}>
          {bills.map(bill => {
            return (
              <ExpansionPanel key={bill.bill_id} className={classes.root}>
                <ExpansionPanelSummary>
                  <Typography>Bill {bill.bill_id}</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <Typography>
                    {bill.title}
                    <br />
                    <FavoriteBorder />
                    <Clear />
                    <br />
                    <Link to={`/bills/${bill.bill_id}`}>
                      <Button>See Details</Button>
                    </Link>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      );
    }
  };

  showReps = () => {
    const { officials } = this.state;
    if (officials.length > 0) {
      return officials.map((official, i) => {
        return <Representative repDets={official} key={i} />;
      });
    }
  };

  handleBillFavor = () => {};

  render() {
    // console.log(this.props);
    return (
      <div style={{ height: "100vh", marginTop: "5vh" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            height: "70vh",
            margin: "0 auto"
          }}
        >
          {/* welcome card */}
          <div style={{ width: "30vw" }}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Welcome {this.props.user && this.props.user.username}
                </Typography>
              </CardContent>
            </Card>

            <div style={{ width: "20vw", marginTop: "5vh" }}>
              <Typography variant="h5">Recent Bills</Typography>
              {this.billPanelShow()}
            </div>
          </div>

          {/* card showing senate representatitve */}
          {/* <Representative repDets = {this.state.senateRep}/>
          <Representative repDets = {this.state.congressRep}/> */}
          {this.showReps()}
          <ElectionList />
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
