import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SignUp extends Component {
  render() {
    return (
      <div>
        Sign Up
        <Link to="/dashboard">
          <button>Submit(dashboard)</button>
        </Link>
      </div>
    );
  }
}

export default SignUp;
