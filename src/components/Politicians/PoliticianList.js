import React, { Component } from "react";
// import PoliticianCard from "./PoliticianCard";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { compose } from "redux";
import { getPoliticiansFavored, getPoliticiansOpposed } from "../../ducks/authReducer";

export class PoliticianList extends Component {
  constructor() {
    super();
    this.state = {
      selectedSenateState: "AL",
      selectedHouseState: "AL",
      senateList: [],
      houseRepList: [],
      favoredPoliticians: [],
      showFavored: false,
      showOpposed: false
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

  componentDidMount() {
    this.props.getPoliticiansFavored();
    this.props.getPoliticiansOpposed();
    this.setState({ favoredPoliticians: this.props.politicians });

    console.log(this.props);
  }

  jestTestSuccess() {
    return "test works";
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

  setFavoredList() {
    this.setState({ showFavored: true });
  }

  setOpposedList() {
    this.setState({showOpposed: true})
  }

  listPoliticiansFavored = () => {
    const { politicians } = this.props;
    console.log(politicians);
    if (politicians.length > 0) {
      return politicians.map(politician => {
        let title = politician.title;
        let id = politician.id;
        let name = politician.name;
        let state = politician.state;
        let party = politician.party;

        return (
          <Card key={id}>
            <div>
              <Button>
              <Link
                to={`/politicians/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {id}
              </Link>
              </Button>
            </div>
            <div>{title}</div>
            <div>{name}</div>
            <div>{party}</div>
            <div>{state}</div>
            <hr/>
          </Card>
          
        );
      });
    }
  };

  listPoliticiansOpposed = () => {
    const { politicians } = this.props;
    console.log(this.props);
    if (politicians.length > 0) {
      return politicians.map(politician => {
        let title = politician.title;
        let id = politician.id;
        let name = politician.name;
        let state = politician.state;
        let party = politician.party;

        return (
          <Card key={id}>
            <div>
              <Button>
              <Link
                to={`/politicians/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {id}
              </Link>
              </Button>
            </div>
            <div>{title}</div>
            <div>{name}</div>
            <div>{party}</div>
            <div>{state}</div>
            <hr/>
          </Card>
        );
      });
    }
  };

  render() {
    const senateListDisplay =
      this.state.senateList &&
      this.state.senateList.map((g, k) => {
        const id = g.id;
        return (
          <div key={k} style={{ padding: "10px" }}>
            <Card style={{ width: "30vw", height: "30vh" }}>
              <div>
                <Typography>
                  <Button size="large" style={{ fontSize: "1.5em" }}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "darkblue"
                      }}
                      to={`/politicians/${id}`}
                    >
                      {g.name}
                    </Link>
                  </Button>
                </Typography>
                <Typography variant="caption" style={{ fontSize: "105%" }}>
                  Party:
                </Typography>
                <Typography variant="h6">{g.party}</Typography>
                <Typography variant="h6">{g.role}</Typography>
                <Typography variant="caption" style={{ fontSize: "105%" }}>
                  Next Election:
                </Typography>
                <Typography variant="h6">{g.next_election}</Typography>
              </div>
            </Card>
            <br />
          </div>
        );
      });

    const houseRepListDisplay =
      this.state.houseRepList
        .sort((a, b) => {
          return a.district - b.district;
        })
        .map((h, l) => {
          const id = h.id;
          return (
            <Paper style={{ width: "70vw", margin: "auto", textAlign:"center" }}>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{width: "15vw"}}>Name</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>District</TableCell>
                      <TableCell>Party</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={l}>
                      <TableCell>
                        <Button size="small" style={{ height: "5vh" }}>
                          <Link
                            to={`/politicians/${id}`}
                            style={{
                              textDecoration: "none",
                              color: "darkblue",
                              fontSize: "100%"
                            }}
                          >
                            {h.name}
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>{h.id}</TableCell>
                      <TableCell>{h.district}</TableCell>
                      <TableCell>{h.party}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter />
                </Table>
              </div>
            </Paper>
          );
        });
    return (
      <div>
        <div>
          <div>
            <form onSubmit={this.handleSenateSubmit}>
              <label>
                <Typography variant="title" style={{ color: "white" }}>
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
          <br />
          <div>
            <form onSubmit={this.handleHouseSubmit}>
              <label>
                <Typography variant="title" style={{ color: "white" }}>
                  Find House Representatives by State
                </Typography>
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
          
            <Button
              style={{ color: "white" }}
              onClick={() => this.setFavoredList()}> Favored Politicians </Button>
              <div>
            {this.state.showFavored ? this.listPoliticiansFavored() : null}
          </div>
          </div>
          
            <Button
              style={{ color: "white" }}
              onClick={() => this.setOpposedList()}> Opposed Politicians </Button>
              <div>
            {this.state.showOpposed ? this.listPoliticiansOpposed() : null}
         

        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {senateListDisplay}
        </div>
        <div>{houseRepListDisplay}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    politicians: state.auth.politiciansFavored
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPoliticiansFavored: () => dispatch(getPoliticiansFavored()),
    getPoliticiansOpposed: () => dispatch(getPoliticiansOpposed())
  }; /////////////////////
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PoliticianList);
