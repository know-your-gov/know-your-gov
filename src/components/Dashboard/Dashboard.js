import React, { Component } from "react";
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Representative from './Representative'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Clear from '@material-ui/icons/Clear'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import axios from 'axios'

const styles = {
  root:{
    width: "250px"
  }
}
class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      senateRep: {
        title: "Senator",
        pic: "https://www.cruz.senate.gov/files/images/OfficialPortrait.jpg",
        name: "Cruz",
        contact: "SomeStuff",
      },
      congressRep: {
        title: "Representative",
        pic: "https://jacksonlee.house.gov/sites/jacksonlee.house.gov/files/wysiwyg_uploaded/Photograph%20of%20Congresswoman.JPG",
        name: "Sheila Jackson Lee",
        contact: "some stuff"
      },
      bills: []
    }
  }

  componentDidMount(){
    axios.get("https://api.propublica.org/congress/v1/115/both/bills/introduced.json",{
      headers: {'X-API-Key': process.env.REACT_APP_PRO_PUBLICA}
    }).then((res)=>{
      const bills = res.data.results[0].bills
      const recents = bills.slice(0,6)
      this.setState({bills: recents})
    })
  }

  panelShow = ()=>{
    const {classes} = this.props
    const bills = this.state.bills
    console.log(bills)
    if(bills.length>0){
      return(
       <div style = {{width: "20vw"}}>
         {bills.map((bill)=>{
          return(
            <ExpansionPanel key = {bill.bill_id} className = {classes.root}>
              <ExpansionPanelSummary>
                <Typography>Bill {bill.bill_id}</Typography>
              </ExpansionPanelSummary>
  
              <ExpansionPanelDetails>
                <Typography>
                  {bill.title}<br/>
                  <FavoriteBorder/>
                  <Clear/>
                  <br/>
                  <Link to = {`/bills/${bill.bill_id}`}><Button>See Details</Button></Link>
                </Typography>
              </ExpansionPanelDetails>
  
            </ExpansionPanel>
          )
        })}
       </div>
      )
    }
  }

  render() {
    return (
        <div style = {{height: "100vh", marginTop: "5vh"}}>
          <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "space-around",height:"70vh",margin:"0 auto"}}>
          {/* welcome card */}
          <div style = {{width: "30vw"}}>
            <Card>
              <CardContent >
                <Typography variant = "h6">Welcome userName</Typography>
              </CardContent>
            </Card>

            <div style = {{width: "20vw", marginTop: "5vh"}}>
              <Typography variant = "h5">Recent Bills</Typography> 
              {this.panelShow()}
             </div>

          </div>

          {/* card showing senate representatitve */}
          <Representative repDets = {this.state.senateRep}/>
          <Representative repDets = {this.state.congressRep}/>
        

        </div>

    

      </div>

     

    );
  }
}

Dashboard.propTypes ={
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);


/*
 bills.map((bill)=>{
          console.log(bill.bill_id)
          return(
            <ExpansionPanel key = {bill.bill_id} className = {classes.root}>
              <ExpansionPanelSummary>
                <Typography>Bill {bill.bill_id}</Typography>
              </ExpansionPanelSummary>
  
              <ExpansionPanelDetails>
                <Typography>{bill.title}</Typography>
              </ExpansionPanelDetails>
  
            </ExpansionPanel>
          )
        })

            <div style = {{width: "20vw", marginTop: "-20vh", marginLeft: "5vw"}}>
          <Typography variant = "h5">Recent Bills</Typography> 
          {this.panelShow()}
        </div>

*/