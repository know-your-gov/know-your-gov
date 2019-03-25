import React from 'react'
import axios from 'axios'

//component imports 
import PollingInfo from './PollingInfo'

//redux imports
import {connect} from 'react-redux'
import {compose} from 'redux'
import {getUser} from '../../ducks/authReducer'

//material UI imports
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
//End

class ElectionList extends React.Component{
  constructor(){
    super()
    this.state = {
      elections: []
    }
  }

  componentDidMount(){
    this.props.getUser()
    this.getUpcomingElections()
    console.log(this.props)
  }

  componentDidUpdate(prevProps){
    if(this.props.address!==prevProps.address){
          return this.props.user && this.props.user
      }
      console.log(this.props)
  }

  getUpcomingElections=()=>{
    axios.get(`https://www.googleapis.com/civicinfo/v2/elections`,{
      params:{key: process.env.REACT_APP_GOOGLE_CIVIC}
    }).then((res)=>{
      this.setState({elections: res.data.elections})
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
            <PollingInfo electionID = {election.id} address = {this.props.user.address}/>
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


function mapStateToProps(state){
  return{
    user: state.auth.user,
    auth: state.firebase.auth,
  }
}

// function mapDispatchToProps(dispatch){
//   return{
//     getUser: ()=>dispatch(getUser())
//   }
// }

export default compose(connect(mapStateToProps, {getUser}))(ElectionList)