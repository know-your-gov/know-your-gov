import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
// import axios from "axios";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }

  componentDidMount() {
    const { politicianVotes } = this.props; 
       const poliVoteArr = politicianVotes && politicianVotes.length;

    const { billVotes } = this.props;
    
    const billVoteArr = billVotes && billVotes.length;

    this.setState({
      Data: {
        labels: [
          "Dummy Data Favored",
          "Dummy Data Against",
          "Dummy Data Neutral"
        ],
        datasets: [
          {
            label: "ease my suffering",
            data: [billVoteArr, 2],
            backgroundColor: [
              "rgba(50,200,95,0.5)",
              "rgba(240,10,10,0.5)",
              "rgba(90, 90, 90, 0.4)"
            ],
            borderColor: [
              "rgba(40,130,40,1)",
              "rgba(170, 40, 40, 1)",
              "rgba(50, 50, 50, 1)"
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { politicianVotes } = this.props
      const poliVoteArr = politicianVotes && politicianVotes.length

      const { billVotes } = this.props;
      const billVoteArr = billVotes && billVotes.length;
      this.setState({
        Data: {
          labels: ["Votes Favored", "Votes Against"],
          datasets: [
            {
              label: "ease my suffering",
              data: [billVoteArr, 2], //another mapped arr here for data
              backgroundColor: [
                "rgba(50,200,95,0.5)",
                "rgba(240,10,10,0.5)",
                "rgba(90, 90, 90, 0.4)"
              ],
              borderColor: [
                "rgba(40,130,40,1)",
                "rgba(170, 40, 40, 1)",
                "rgba(50, 50, 50, 1)"
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
  }
  // )
  // }
  render() {
    // console.log(this.props);
    // const { billVotes } = this.props;
    // const test = billVotes.length;
    // console.log(test);
    return (
      <div>
        <Pie
          data={this.state.Data}
          options={{ maintainAspectRatio: false }}
          height={140}
        />
      </div>
    );
  }
}
