import React, { Component } from "react";
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
import {
  getPoliticiansFavored,
  getPoliticiansOpposed
} from "../../ducks/authReducer";
import StateSelector from "./StateSelect";
import "./PoliticianList.css";

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
      showOpposed: false,
      showHouseReps: false,
      showSenate: false
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
    // console.log(this.props);
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

        this.setState(
          {
            senateList: senateList,
            showFavored: false,
            showHouseReps: false,
            showOpposed: false,
            showSenate: true
          },
          () => console.log(senateList)
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

        this.setState({
          houseRepList: houseRepList,
          showHouseReps: true,
          showSenate: false,
          showOpposed: false,
          showFavored: false
        });
        // console.log(houseRepList);
      });
  }

  setFavoredList() {
    this.setState({
      showFavored: true,
      showOpposed: false,
      showSenate: false,
      showHouseReps: false
    });
  }

  setOpposedList() {
    this.setState({
      showOpposed: true,
      showFavored: false,
      showSenate: false,
      showHouseReps: false
    });
  }

  listPoliticiansFavored = () => {
    const { politiciansFavored } = this.props;
    // console.log(politiciansFavored);

    if (politiciansFavored.length > 0) {
      return politiciansFavored.map(politician => {
        let title = politician.title;
        let id = politician.id;
        let name = politician.name;
        let state = politician.state;
        let party = politician.party;

        return (
          <div>
            <Card key={id} style={{ width: "20vw", margin: "auto" }}>
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
              <hr />
            </Card>
          </div>
        );
      });
    }
  };

  listPoliticiansOpposed = () => {
    const { politiciansOpposed } = this.props;
    // console.log(this.props);
    if (politiciansOpposed.length > 0) {
      return politiciansOpposed.map(politician => {
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
            <hr />
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

    const houseRepListDisplay = this.state.houseRepList
      .sort((a, b) => {
        return a.district - b.district;
      })
      .map((h, l) => {
        const id = h.id;
        return (
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
                  <StateSelector />
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
                  <StateSelector />
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

          <Button
            style={{ color: "white" }}
            onClick={() => this.setFavoredList()}
          >
            {" "}
            Favored Politicians{" "}
          </Button>
          <Button
            style={{ color: "white" }}
            onClick={() => this.setOpposedList()}
          >
            {" "}
            Opposed Politicians{" "}
          </Button>
          <div>
            <div>
              {this.state.showFavored ? this.listPoliticiansFavored() : null}
            </div>
          </div>

          {this.state.showOpposed ? this.listPoliticiansOpposed() : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {senateListDisplay}
        </div>

        {this.state.showHouseReps === false ? (
          <div> </div>
        ) : (
          <Paper style={{ width: "70vw", margin: "auto", textAlign: "center" }}>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "15vw" }}>Name</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Party</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> {houseRepListDisplay} </TableBody>
                <TableFooter />
              </Table>
            </div>
          </Paper>
        )}
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    politiciansFavored: state.auth.politiciansFavored,
    politiciansOpposed: state.auth.politiciansOpposed
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
