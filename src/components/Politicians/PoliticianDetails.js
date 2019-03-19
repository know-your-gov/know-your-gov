import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Chart from "../Chart.Js/ReusableChart";

import axios from "axios";

export class PoliticianDetails extends Component {
  constructor() {
    super();
    this.state = {
      politician: {},
      committees: []
    };
  }

  componentDidMount() {
    const memberId = this.props.memberId;
    //pass the memberId down from the politician card for axios, or maybe later through search?
    axios
      // .get(`https://api.propublica.org/congress/v1/members/${memberId}.json`, {
      //   headers: { "X-API-Key": "6mvDJez0i0forqt6pqCgyV1QFLPMbHCx4JbsSJq4" }
      // })
      .get(`https://api.propublica.org/congress/v1/members/K000388.json`, {
        headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
      })
      .then(res => {
        const repInfo = res.data.results[0];
        const committeeInfo = repInfo.roles[0];

        const name = repInfo.first_name + " " + repInfo.last_name;
        const birthDate = repInfo.date_of_birth;

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
        const gender = writeGender(repInfo.gender);
        const party = writeParty(repInfo.current_party);
        const office = committeeInfo.office;
        const phone = committeeInfo.phone;
        const chamber = committeeInfo.chamber;
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
          district
        };

        const committees = committeeInfo.committees;

        this.setState({ politician: politician, committees: committees });
        console.log(this.state.committees);
      });
  }

  render() {
    const committeeDisplay = this.state.committees.map((e, i) => {
      return (
        <Card>
          <div key={i}>
            <div>{e.name}</div>
            <div>{e.title}</div>
            Rank {e.rank_in_party}
            <hr />
          </div>
        </Card>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        <div>
          <Card>
            <Typography>{this.state.politician.id} </Typography>
            <Typography>{this.state.politician.name} </Typography>
            <Typography>{this.state.politician.gender} </Typography>
            <Typography>{this.state.politician.chamber} </Typography>
            <Typography>{this.state.politician.party} </Typography>
          </Card>
        </div>
        <Chart />
        <div>
          <Card>
            <Typography>District: {this.state.politician.district} </Typography>
            <Typography>
              Bills Sponsored: {this.state.politician.billsSponsored}{" "}
            </Typography>
          </Card>
        </div>
        <div>
          <Card>
            <Typography>
              Office Address: {this.state.politician.office}{" "}
            </Typography>

            <Typography>
              {" "}
              Contact number: {this.state.politician.phone}
            </Typography>
            <Typography>
              {" "}
              <Button> {this.state.politician.url}</Button>
            </Typography>
          </Card>
        </div>
        <Typography>
          Committees:
          {committeeDisplay}
        </Typography>
      </div>
    );
  }
}

export default PoliticianDetails;
