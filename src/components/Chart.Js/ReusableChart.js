import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }

  componentDidMount() {
      axios.get(`request here`)
        .then(res => {
          const graph = res.data;
    //    create variables that equal arrays here
    // let arr1 = []
    // let arr2= []
    //       graph.forEach loop here 
    this.setState({
      Data: {
        labels: "arr",
        datasets: [
          {
            label: "ease my suffering",
            data: [1,2,3], //another mapped arr here for data
            backgroundColor: [
              "rgba(255,105,145,0.6)",
              "rgba(155,100,210,0.6)",
              "rgba(90,178,255,0.6)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(170, 130, 225, 1)",
              "rgba(85, 176, 200, 1)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    })
  }
  render() {
    return (
      <div>
        {/* <Pie data={this.state.Data} options={{ maintainAspectRatio: false }}
        /> */}
      </div>
    );
  }
}
