import React, { Component } from "react";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Representative from './Representative'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import axios from 'axios'


export class Dashboard extends Component {
  constructor(){
    super()
    this.state = {
      senateRep: {
        title: "Senator",
        pic: "http://www4.pictures.zimbio.com/gi/Beto+O+Rourke+Running+Beto+Premiere+2019+SXSW+Ao4bSmRkkL6l.jpg",
        name: "Beto",
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
      headers: {'X-API-Key':"6mvDJez0i0forqt6pqCgyV1QFLPMbHCx4JbsSJq4"}
    }).then((res)=>{
      const bills = res.data.results[0].bills
      const recents = bills.slice(0,6)
      this.setState({bills: recents})
    })
  }

  panelShow = ()=>{
    const bills = this.state.bills
    console.log(bills)
    if(bills.length>0){
      return(
        bills.map((bill)=>{
          console.log(bill.bill_id)
          return(
            <ExpansionPanel key = {bill.bill_id}>
              <ExpansionPanelSummary>
                <Typography>Bill {bill.bill_id}</Typography>
              </ExpansionPanelSummary>
  
              <ExpansionPanelDetails>
                <Typography>{bill.title}</Typography>
              </ExpansionPanelDetails>
  
            </ExpansionPanel>
          )
    
        })
      )
      
   
    }
  }

  render() {
    return (
      <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {/* welcome card */}
        <div style = {{width: "30vw", height: "40vh", backgroundColor: "grey"}}>
          <Card>
            <CardContent>
              <Typography variant = "h4">Welcome userName</Typography>
            </CardContent>
          </Card>
        </div>

        {/* card showing senate representatitve */}
        <Representative repDets = {this.state.senateRep}/>
        <Representative repDets = {this.state.congressRep}/>
        <div styles = {{width: "200px"}}>
          {this.panelShow()}
        </div>

      </div>

    );
  }
}

export default Dashboard;
