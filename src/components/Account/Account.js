import React, { Component } from "react";
import AccountInfo from "./AccountInfo";
import EditInfo from "./EditInfo";
//
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    return (
      <div className="accountPage">
        {!this.state.edit ? (
          <AccountInfo toggleEdit={this.toggleEdit} />
        ) : (
          <EditInfo toggleEdit={this.toggleEdit} />
        )}
      </div>
    );
  }
}

export default Account;

/*
const editStyles = theme => ({
  main: {
    width: "auto",
    height: "100vh",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: secondary
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: primary,
    color: "#fff"
  },
  login: {
    width: "30%",
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 30,
    backgroundColor: primary,
    color: "#fff",
    textDecoration: "none",
    [theme.breakpoints.down(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: theme.spacing.unit * 22
    }
  },
  zipInput: {
    marginRight: theme.spacing.unit * 20,
    width: "50%"
  }
});


*/
