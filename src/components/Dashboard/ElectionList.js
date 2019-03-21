import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import PollingInfo from './PollingInfo'

class ElectionList extends React.Component{
  constructor(){
    super()
    this.state = {
      elections: []
    }
  }

  componentDidMount(){
    this.getUpcomingElections()
  }

  getUpcomingElections=()=>{
    axios.get(`https://www.googleapis.com/civicinfo/v2/elections`,{
      params:{key: process.env.REACT_APP_GOOGLE_CIVIC}
    }).then((res)=>{
      this.setState({elections: res.data.elections},()=> console.log(this.state.elections))
     })
  }

  electionsList = ()=>{
    const {elections} = this.state
    return(elections.map((election)=>{
      return(
        <ExpansionPanel key = {election.id}>
          <ExpansionPanelSummary>
            <Typography variant = "h5">{election.name}   {election.electionDay}</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <PollingInfo electionID = {election.id}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }))
  }

  render(){
    return(
      <div>
        <Card>
          <CardContent>
            <Typography variant = "h5">Polling Info</Typography>
            {this.electionsList()}
          </CardContent>

          
        </Card>
      </div>

    )
  }
}

export default ElectionList