import React, { Component } from "react";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Chart from "../Chart/Chart";
import axios from "axios";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  politicianFavor,
  politicianOppose,
  getPoliticianVotes,
  getPoliticianOpposedVotes,
  deletePolitician
} from "../../ducks/politicianReducer";

const styles = {
  card: {
    minWidth: 240,
    maxWidth: 700,
    marginRight: "5%",
    marginTop: "5%",
    textAlign: "left",
    display: "flex"
  }
};

export class PoliticianDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      politician: {},
      committees: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getPoliticianDetails();
    this.props.getPoliticianVotes(id);
    this.props.getPoliticianOpposedVotes(id)
    console.log(this.props);
  }

  getPoliticianDetails() {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.propublica.org/congress/v1/members/${id}.json`, {
        headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
      })
      .then(res => {
        const repInfo = res.data.results[0];
        const committeeInfo = repInfo.roles[0];

        const name = repInfo.first_name + " " + repInfo.last_name;
        const birthDate = repInfo.date_of_birth;
        const state = repInfo.roles[0].state;
        const url = repInfo.url;
        const id = repInfo.member_id;

        function writeParty(param) {
          if (param === "R") {
            return "Republican";
          }
          if (param === "D") {
            return "Democrat";
          } else {
            return "Other";
          }
        }
        function writeGender(param) {
          if (param === "M") {
            return "Male";
          }
          if (param === "F") {
            return "Female";
          } else {
            return "Other";
          }
        }

        function writeChamber(param) {
          if (param === "House") {
            return "House of Representatives";
          }
          return param;
        }

        const gender = writeGender(repInfo.gender);
        const party = writeParty(repInfo.current_party);
        const chamber = writeChamber(committeeInfo.chamber);
        const office = committeeInfo.office;
        const phone = committeeInfo.phone;
        const title = committeeInfo.title;
        const district = committeeInfo.district;
        const billsSponsored = committeeInfo.bills_sponsored;

        const politician = {
          name,
          birthDate,
          gender,
          url,
          id,
          party,
          office,
          phone,
          chamber,
          title,
          billsSponsored,
          district,
          state
        };

        const committees = committeeInfo.committees;

        this.setState({ politician: politician, committees: committees });
      });
  }

  componentDidUpdate() {
    console.log(this.props.politicianVotes);
  }

  render() {
    const { politician } = this.state;

    const committeeDisplay = this.state.committees.map(e => {
      return (
        <div key={e.code}>
          <Card>
            <div>
              <Typography variant="h5">{e.name}</Typography>
              <Typography variant="h6">{e.title}</Typography>
              <Typography variant="h6">Rank {e.rank_in_party}</Typography>
            </div>
          </Card>{" "}
          <br />
        </div>
      );
    });
    return (
      <div style={{}}>
        <Typography variant="h5">
          District: {this.state.politician.district}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          <div className="mainInfo" style={styles.card}>
            <Card>
              <div>
                <div style={{ display: "flex", float: "right" }}>
                  <img
                    style={{ padding: "10px" }}
                    className="favorButton"
                    src="upvote.png"
                    alt="favor"
                    width="28vw"
                    height="25vh"
                    onClick={() => this.props.politicianFavor(politician)}
                  />
                  <img
                    style={{ padding: "10px" }}
                    className="againstButton"
                    src="downvote.png"
                    alt="favor"
                    width="25vw"
                    height="25vh"
                    onClick={() => this.props.politicianOppose(politician)}
                  />
                </div>
                <Typography variant="caption">
                  {" "}
                  Member ID: {this.state.politician.id}{" "}
                </Typography>

                <Typography variant="h4">
                  {this.state.politician.name}
                </Typography>
                <Typography>{this.state.politician.gender} </Typography>

                <Typography variant="caption">Chamber:</Typography>
                {this.state.politician.chamber}
                <Typography variant="caption">Party:</Typography>
                {this.state.politician.party}
                <Typography variant="caption">State:</Typography>
                {this.state.politician.state}
              </div>
            </Card>
          </div>

          <Chart
            politicianVotes={this.props.politicianVotes}
            politicianOpposedVotes={this.props.politicianOpposedVotes}
          />

          <div className="committeeInfo">
            <br />
            <Typography variant="h5">{committeeDisplay}</Typography>
          </div>
        </div>
        <div className="subInfo" style={styles.card}>
          <div className="mainInfo" style={styles.card}>
            <div style={{ marginRight: "5%" }}>
              {/* <Typography variant="caption">Bills Sponsored:</Typography>
                {this.state.politician.billsSponsored} */}
            </div>
          </div>
        </div>
        <div className="contactInfo">
          <Card>
            <Typography variant="caption">Office:</Typography>
            <Typography variant="h5">
              {this.state.politician.office}{" "}
            </Typography>
            <Typography>
              <Typography variant="caption">Contact number:</Typography>
              <Typography variant="h5">
                {this.state.politician.phone}
              </Typography>
            </Typography>
            <Typography>
              <Button style={{ fontSize: "130%" }}>
                <a
                  href={`${this.state.politician.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.politician.url}
                </a>
              </Button>
            </Typography>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    politicians: state.firebase.auth,
    politicianVotes: state.politicians.politicianVotes,
    politicianOpposedVotes: state.politicians.politicianOpposedVotes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    politicianFavor: politician => dispatch(politicianFavor(politician)),
    politicianOppose: politician => dispatch(politicianOppose(politician)),
    getPoliticianVotes: politician => dispatch(getPoliticianVotes(politician)),
    getPoliticianOpposedVotes: politician =>
      dispatch(getPoliticianOpposedVotes(politician)),
      deletePolitician: politician => dispatch(deletePolitician)
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PoliticianDetails);
