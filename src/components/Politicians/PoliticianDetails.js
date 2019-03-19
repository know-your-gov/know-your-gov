import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import axios from "axios";

export class PoliticianDetails extends Component {
  constructor() {
    super();
    this.state = {
      politician: [
      ],

      committees: {}
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
        headers: { "X-API-Key": "6mvDJez0i0forqt6pqCgyV1QFLPMbHCx4JbsSJq4" }
      })
      .then(res => {
        const repInfo= res.data.results[0]

        const name = repInfo.first_name + " " + repInfo.last_name
        const birthDate = repInfo.date_of_birth
        const gender = repInfo.gender
        const url = repInfo.url
        const id = repInfo.memeber_id
        const party = repInfo.current_party
        const office = repInfo.roles[0].office
        const phone = repInfo.roles[0].phone
        const chamber = repInfo.roles[0].chamber
        const title = repInfo.roles[0].title

        const politician = [name, birthDate, gender, url, id, party, office, phone, chamber, title]
        const committees = repInfo.roles[0].committees[0]

        for(var comTitle in committees)

        this.setState({ politician: politician, committees: committees });
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        <div>{this.state.politician} </div>
        <div />
        {this.state.committees.name}
      </div>
    );
  }
}

export default PoliticianDetails;
