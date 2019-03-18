import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Login extends Component {
  render() {
    return (
      <div>
        Login
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <input type="text" />
        <input type="password" />
      </div>
    );
  }
}

export default Login;
