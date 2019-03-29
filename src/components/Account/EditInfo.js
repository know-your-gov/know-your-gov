import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";

import "firebase/auth";
import { updateAccount } from "../../ducks/authReducer";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import FormControl from "@material-ui/core/FormControl";
// import Avatar from "@material-ui/core/Avatar";
import grey from "@material-ui/core/colors/grey";
import "./Account.css";
import DeleteConfirm from './DeleteConfirm'
// import axios from "axios";

const primary = grey[300];
const secondary = grey[900];

const styles = theme => ({
  main: {
    background: "rgb(38, 38, 43)",
    padding: "0 1rem"
  },
  saveButton: {
    width: "20%",
    margin: "0 auto",
    marginBottom: "2rem",
    marginTop: "2rem",

    backgroundColor: "rgb(59,177,67)",
    color: "white",
    textDecoration: "none",
    [theme.breakpoints.down(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: theme.spacing.unit * 22
    }
  },
  label: {
    color: "white",
    padding: "0.8rem"
  },
  resetButton: {
    width: "20%",
    marginLeft: "5rem",
    backgroundColor: "transparent"
  },
  deleteButton: {
    width: "20%",
    marginLeft: "5rem",
    backgroundColor: "rgb(208,49,45)"
  }
});

// const primary = grey[900];
// const secondary = grey[800];

class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      state: "",
      zip: "",
      address: "",
      deleteProfile: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateAccount(this.state);
    this.props.toggleEdit();
  };

  deleteConfirmShow = ()=>{
    if(this.state.deleteProfile === true){
      return <DeleteConfirm confirmToggle = {this.deleteConfirmToggle}/>
    }
  }
  
  deleteConfirmToggle=()=>{
    if(this.state.deleteProfile){
      this.setState({deleteProfile:false})
      console.log(this.state.deleteProfile)
    }else{
      this.setState({deleteProfile:true})
      console.log(this.state.deleteProfile)
    }
    
  }


  resetPassword = () => {};

  render() {
    const { classes } = this.props;
    // console.log(this.state);
    // console.log(firebase.auth().currentUser);
    const { user } = this.props;
    // console.log(user);
    return (
      <div className="accountCard">
        
        <Paper className={classes.main}>
          <div className="title">
            <h1>Edit Account Information</h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.resetButton}
            onClick={this.props.toggleEdit}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.resetButton}
            onClick={this.props.toggleEdit}
          >
            Reset Password
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.deleteButton}
            onClick={()=>this.deleteConfirmToggle()}
          >
            Delete Account
          </Button>
          <div>{this.deleteConfirmShow()}</div>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" className={classes.label}>
                Username
              </InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                defaultValue={user && user[0].username}
                onChange={this.handleChange}
                className={classes.label}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" className={classes.label}>
                Address
              </InputLabel>
              <Input
                id="address"
                name="address"
                autoComplete="address"
                defaultValue={user && user[0].address}
                onChange={this.handleChange}
                className={classes.label}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" className={classes.label}>
                City
              </InputLabel>
              <Input
                id="city"
                name="city"
                autoComplete="city"
                defaultValue={user && user[0].city}
                onChange={this.handleChange}
                className={classes.label}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" className={classes.label}>
                State
              </InputLabel>
              <Input
                id="state"
                name="state"
                autoComplete="state"
                defaultValue={user && user[0].state}
                onChange={this.handleChange}
                className={classes.label}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" className={classes.label}>
                Zip Code
              </InputLabel>
              <Input
                id="zip"
                name="zip"
                autoComplete="zip"
                defaultValue={user && user[0].zip}
                onChange={this.handleChange}
                className={classes.label}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // classes={

              // }
              className={classes.saveButton}
            >
              Save
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

EditInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.firestore);
  return {
    user: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAccount: newInfo => dispatch(updateAccount(newInfo))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(state => {
    console.log(state);
    return [{ collection: "users", doc: state.auth.uid }];
  }),
  withStyles(styles)
)(EditInfo);
