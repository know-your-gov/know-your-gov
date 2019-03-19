import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./components/routes";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;
