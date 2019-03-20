import React, { Component } from "react";
import axios from 'axios'
// import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Clear from '@material-ui/icons/Clear'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import {Link} from 'react-router-dom'


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
      console.log(this.state.billDetails)
    })
  }
  render() {
   const {billDetails} = this.state
    return ( 
      <div style = {{width: "65%", margin: "0 auto", marginTop:"5vh"}}>
        <Card>
          <CardContent>
            <Typography variant = "h6">{billDetails.title}</Typography>
            <p>{billDetails.committees}</p>
            <p>Sponsored by: <Link to = {`/politicians/${billDetails.sponsor_id}`}>{billDetails.sponsor_title} {billDetails.sponsor} ({billDetails.sponsor_party}, {billDetails.sponsor_state})</Link></p>
            <p>Introduced(yyyy/mm/dd): {billDetails.introduced_date}</p>
            <p> <a href ={billDetails.gpo_pdf_uri} >See more information here</a></p>
            <div>
              <CardActionArea>
                <CardActions>
                  <FavoriteBorder/>
                  <Clear/>
                </CardActions>
              </CardActionArea>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default BillDetails;
