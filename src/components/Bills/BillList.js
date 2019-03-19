import React, { Component } from "react";
import BillCard from "./BillCard";
import axios from 'axios'


class BillList extends Component {
  constructor(){
    super()
    this.state = {
      bills : []
    }
  }
  componentDidMount(){
    this.getRecentBills()
  }

  getRecentBills=()=>{
    axios.get(`https://api.propublica.org/congress/v1/115/both/bills/active.json`,{
      headers: {'X-API-Key': process.env.REACT_APP_PRO_PUBLICA}
    }).then((res)=>{
      const bills = res.data.results[0].bills
      this.setState({bills})
      console.log(this.state.bills)
    })
  }

  getUpcomingBills = ()=>{

  }

  getLikedBills = ()=>{

  }

  getDislikedBills = ()=>{

  }

  render() {
    return (
      <div>
        <BillCard />
      </div>
    );
  }
}

export default BillList;
