import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import { HashRouter as Router } from "react-router-dom";
import routes from "./components/routes";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {window.location.hash && window.location.hash !== "#/" ? (
            <Navbar />
          ) : null}
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;
