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
      // axios.get(`request here`)
      //   .then(res => {
      //     const graph = res.data;
    //    create variables that equal arrays here that have values drilled through props for reusability
    // let arr1 = [this.props]
    // let arr2= [this.props]
    //       graph.forEach loop here 
    this.setState({
      Data: {
        labels: ["Dummy Data Favored", "Dummy Data Against", "Dummy Data Neutral"],
        datasets: [
          {
            label: "ease my suffering",
            data: [1,2,3], //another mapped arr here for data
            backgroundColor: [
              "rgba(50,200,95,0.5)",
              "rgba(240,10,10,0.5)",
              "rgba(90, 90, 90, 0.4)",
            ],
            borderColor: [
              "rgba(40,130,40,1)",
              "rgba(170, 40, 40, 1)",
              "rgba(50, 50, 50, 1)",
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
    }
    // )
  // }
  render() {
    return (
      <div>
        <Pie data={this.state.Data} options={{ maintainAspectRatio: false }}
        height={180}
        />
      </div>
    );
  }
}
