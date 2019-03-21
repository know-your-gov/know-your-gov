import React from "react";

import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import Account from "./Account/Account";
import BillDetails from "./Bills/BillDetails";
import BillList from "./Bills/BillList";
import PoliticianList from "./Politicians/PoliticianList";
import PoliticianDetails from "./Politicians/PoliticianDetails";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/account/" component={Account} />
    <Route path="/bills/:billId" component={BillDetails} />
    <Route exact path="/bills" component={BillList} />
    <Route exact path="/politicians" component={PoliticianList} />
    <Route path="/politicians/:id" component={PoliticianDetails} />
  </Switch>
);
