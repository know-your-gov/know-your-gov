import React, { Component } from "react";
import axios from 'axios'
// import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// import CardActions from '@material-ui/core/CardActions'
// import CardActionArea from '@material-ui/core/CardActionArea'


class BillDetails extends Component {
  constructor(){
    super()
    this.state = {
      billDetails: {}
    }
  }
  componentDidMount = ()=>{
    this.getBillDetails()
  }
  getBillDetails = ()=>{
    const {billId} = this.props.match.params
    const congSenId = /(?<=-)\d{1,6}/
    const congress = congSenId.exec(billId)[0]
    const billSlug = billId.split(congSenId)[0].split("-")[0]
    axios.get(`https://api.propublica.org/congress/v1/${congress}/bills/${billSlug}.json`,{
      headers: {'X-API-Key':process.env.REACT_APP_PRO_PUBLICA}  
    }).then((res)=>{
      this.setState({billDetails: res.data.results[0]})
    })
  }
  render() {
   const {billDetails} = this.state
    return ( 
      <div style = {{width: "65%", margin: "0 auto", marginTop:"5vh"}}>
        <Card>
          <CardContent>
            <Typography variant = "h6">{billDetails.short_title}</Typography>
            <p>{billDetails.committees}</p>
            <p>Sponsored by: {billDetails.sponsor_title} {billDetails.sponsor} ({billDetails.sponsor_party}, {billDetails.sponsor_state})</p>
            <p>Introduced(yyyy/mm/dd): {billDetails.introduced_date}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default BillDetails;
