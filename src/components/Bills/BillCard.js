import React, { Component } from "react";
import { Link } from "react-router-dom";

export class BillCard extends Component {
  render() {
    let billId = 1;
    return (
      <div>
        <Link to={`/bills/${billId}`}>See bill Details</Link>
      </div>
    );
  }
}

export default BillCard;
