import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
/*-----component imports-----*/
import PollingInfo from "./PollingInfo";
/*-----redux imports-----*/
import { connect } from "react-redux";
import { compose } from "redux";
import { getUser } from "../../ducks/authReducer";
/*-----material UI imports-----*/
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
/*-----End-----*/

const styles = {
  root: {
    width: "550px",
    height: "35vh",
    margin: "0 auto",
    background: "rgba(198, 198, 208, 0.05)",
    overflowY: "auto",
    marginBottom: "3rem",
    marginTop: "3rem"
  },
  title: {
    color: "white"
  },
  details: {
    background: "rgba(198, 198, 208, 0.3)"
  },
  election: {
    background: "rgba(198, 198, 208, 0.1)",
    "&::after": {
      background: "rgba(198, 198, 208, 0.3)"
    }
  },
  electionExpanded: {
    background: "rgba(198, 198, 208, 0.3)"
  },
  electionTitle: {
    color: "white"
  },
  electionTypography: {
    color: "white"
  }
};

class ElectionList extends React.Component {
  constructor() {
    super();
    this.state = {
      elections: [],
      expanded: false
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.getUpcomingElections();
    console.log(this.props);
  }

  // componentDidUpdate(prevProps){
  //   if(this.props!==prevProps){
  //     // this.props.user && this.props.getUser()
  //     console.log(this.props)
  //   }
  // }

  getUpcomingElections = () => {
    axios
      .get(`https://www.googleapis.com/civicinfo/v2/elections`, {
        params: { key: process.env.REACT_APP_GOOGLE_CIVIC }
      })
      .then(res => {
        this.setState({ elections: res.data.elections });
      });
  };

  handleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  electionsList = () => {
    const { classes } = this.props;
    const { elections, expanded } = this.state;
    let loadingAddress = {
      address: "1600 Pennsylvania Avenue NW",
      city: "Washington",
      zip: "20500",
      state: "DC"
    };
    const { address, city, state, zip } = this.props.user.city
      ? this.props.user
      : loadingAddress;
    return elections.map(election => {
      return (
        <ExpansionPanel
          key={election.id}
          className={classes.election}
          onClick={this.handleExpanded}
        >
          <ExpansionPanelSummary
            className={expanded ? classes.electionExpanded : classes.election}
          >
            <Typography variant="h5" className={classes.electionTypography}>
              {election.name} {election.electionDay}
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.details}>
            <PollingInfo
              electionID={election.id}
              address={`${address},${city},${state} ${zip}`}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.root} id="scrollbar">
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              Polling Info
            </Typography>
            {this.electionsList()}
          </CardContent>
        </Card>
      </div>
    );
  }
}

ElectionList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    auth: state.firebase.auth
  };
}

// function mapDispatchToProps(dispatch){
//   return{
//     getUser: ()=>dispatch(getUser())
//   }
// }

export default compose(
  connect(
    mapStateToProps,
    { getUser }
  ),
  withStyles(styles)
)(ElectionList);
