import React, { Component } from "react";
// import PoliticianCard from "./PoliticianCard";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export class PoliticianList extends Component {
  constructor() {
    super();
    this.state = {
      selectedSenateState: "AL",
      selectedHouseState: "AL",
      senateList: [],
      houseRepList: []
    };
    this.handleSenateChange = this.handleSenateChange.bind(this);
    this.handleHouseChange = this.handleHouseChange.bind(this);
    this.handleSenateSubmit = this.handleSenateSubmit.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
  }

  handleSenateChange(e) {
    this.setState({ selectedSenateState: e.target.value });
  }
  handleHouseChange(e) {
    this.setState({ selectedHouseState: e.target.value });
  }

  handleSenateSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `https://api.propublica.org/congress/v1/members/senate/${
          this.state.selectedSenateState
        }/current.json`,
        {
          headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
        }
      )
      .then(res => {
        const senateList = res.data.results;

        this.setState({ senateList: senateList }, () =>
          console.log(senateList)
        );
      });
  }
  handleHouseSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `https://api.propublica.org/congress/v1/members/house/${
          this.state.selectedHouseState
        }/current.json
    `,
        {
          headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
        }
      )
      .then(res => {
        const houseRepList = res.data.results;

        this.setState({ houseRepList: houseRepList });
        console.log(houseRepList);
      });
  }

  render() {
    const senateListDisplay =
      this.state.senateList &&
      this.state.senateList.map((g, k) => {
        const id = g.id;
        return (
          <div key={k}>
            <Card>
              <div>
                <Typography>
                  {" "}
                  <Button size="large">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "200"
                      }}
                      to={`/politicians/${id}`}
                    >
                      {g.name}
                    </Link>
                  </Button>
                </Typography>
                <Typography variant="caption">Party:</Typography>
                <Typography variant="h6">{g.party}</Typography>
                <Typography variant="h6">{g.role}</Typography>
                <Typography variant="caption">Next Election:</Typography>
                <Typography variant="h6">{g.next_election}</Typography>
              </div>
            </Card>{" "}
            <br />
          </div>
        );
      });
    const houseRepListDisplay =
      this.state.houseRepList &&
      this.state.houseRepList.map((h, l) => {
        const id = h.id;
        return (
          <div key={l}>
            <Card>
              <div>
                <Typography>
                  {" "}
                  <Button size="large">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "200"
                      }}
                      to={`/politicians/${id}`}
                    >
                      {h.name}
                    </Link>
                  </Button>
                </Typography>
                {/* <Typography variant="caption">Party:</Typography> */}
                {/* <Typography variant="h6">{h.party}</Typography>
                <Typography variant="caption">Next Election:</Typography>
                <Typography variant="h6">{h.next_election}</Typography> */}
              </div>
            </Card>{" "}
            <br />
          </div>
        );
      });

    return (
      <div>
        <div>
          <form onSubmit={this.handleSenateSubmit}>
            <label>
              <Typography variant="title">
                Find Senate members by State
              </Typography>
              <select
                value={this.state.value}
                onChange={this.handleSenateChange}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div>
          <form onSubmit={this.handleHouseSubmit}>
            <label>
              <Typography>Find House Representatives by State</Typography>
              <select
                value={this.state.value}
                onChange={this.handleHouseChange}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>{senateListDisplay} </div>
        <div>{houseRepListDisplay}</div>
      </div>
    );
  }
}

export default PoliticianList;
