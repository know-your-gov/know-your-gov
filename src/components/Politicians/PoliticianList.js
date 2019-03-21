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
      selectedState: "AL",
      politicianList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSenateSubmit = this.handleSenateSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ selectedState: e.target.value });
  }

  handleSenateSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `https://api.propublica.org/congress/v1/members/senate/${
          this.state.selectedState
        }/current.json`,
        {
          headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
        }
      )
      .then(res => {
        const politicianList = res.data.results;

        this.setState({ politicianList: politicianList }, () =>
          console.log(politicianList)
        );
      });
  }
  handleHouseSubmit(e) {


    // e.preventDefault();
    // axios.get(`https://api.propublica.org/congress/v1/members/house/${this.state.selectedState}/${district}/current.json`, {
    //     headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
    //   })
    //   .then(res => {

    //     const politicianList = res.data.results;

    //     this.setState({politicianList: politicianList})
    //     console.log(politicianList)
    //   }
    //   )
    }

  render() {
    const politicianListDisplay =
      this.state.politicianList &&
      this.state.politicianList.map((g, k) => {
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
    return (
      <div>
        <div>
          <form onSubmit={this.handleSenateSubmit}>
            <label>
              <Typography>Find Senate members by State</Typography>
              <select value={this.state.value} onChange={this.handleChange}>
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
        <div>{politicianListDisplay} </div>
        <div>
          <form onSubmit={this.handleHouseSubmit}>
            <label>
              <Typography>Find House Representatives by State</Typography>
              <select value={this.state.value} onChange={this.handleChange}>
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
      </div>
    );
  }
}

export default PoliticianList;
