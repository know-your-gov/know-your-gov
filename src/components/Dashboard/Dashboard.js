import React, { Component } from "react";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Representative from './Representative'


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
      }
    }
  }

  render() {
    return (
      <div style = {{display: "flex", justifyContent: "space-around"}}>
        {/* welcome card */}
        <div style = {{width: "30vw", height: "40vh", backgroundColor: "grey"}}>
          <Card>
            <CardContent>
              <Typography variant = "h4">Welcome insert userName here</Typography>
            </CardContent>
          </Card>
        </div>

        {/* card showing senate representatitve */}
        <Representative repDets = {this.state.senateRep}/>
        <Representative repDets = {this.state.congressRep}/>

      </div>

    );
  }
}

export default Dashboard;
