// const React = require("react");
// const Dashboard = require("./Dashboard");

import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Dashboard from "./Dashboard";

afterEach(cleanup);

describe("officials:", () => {
  it("officials should update to an array of 3.", () => {
    const dashboard = render(<Dashboard />);
    expect(Array.isArray(dashboard.state.officials)).toEqual(true);
    expect(dashboard.state.officials.legnth).toEqual(3);
  });
  it("Total should default to 3", () => {
    expect(dashbaoard.state.officials.total).toEqual(3);
  });
});
