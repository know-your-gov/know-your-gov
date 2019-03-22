import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'


class PollingInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location: {},
      electionAdmin: {},
      localJur: {}
    }
  }
  componentDidMount(){
    this.getPollingInfo()
  }

  getPollingInfo = async()=>{
    let id = this.props.electionID
    let info = await axios.get(`https://www.googleapis.com/civicinfo/v2/voterinfo`,{
    params: {
      key:process.env.REACT_APP_GOOGLE_CIVIC,
      address:"500 South Ervay Street",
      electionId: id
    }
    }
    ).then((res)=>res.data)
    this.setState({electionAdmin: info.state[0].electionAdministrationBody})
    this.setState({localJur: info.state[0].local_jurisdiction})
    return info
  }

  localJurInfo = ()=>{
    let electionAdmin
    let address
    if(this.state.localJur){
      electionAdmin = Object.assign({},this.state.localJur.electionAdministrationBody)
      address = Object.assign({},electionAdmin.physicalAddress)
      return(
        <div>
          <h5>Physical Address</h5>
          <p>{address.line1}, {address.city}, {address.zip}</p>
        </div>
      )
    }
  }

  electionAdmin = ()=>{
    let{ballotInfoUrl,electionInfoUrl,votingLocationFinderUrl,correspondenceAddress} =this.state.electionAdmin
    let address = Object.assign({},correspondenceAddress)
    return(
      <div>
        <a href = {ballotInfoUrl} target="_blank" rel="noopener noreferrer"><Button>Ballot information</Button></a>
        <a href = {electionInfoUrl} target="_blank" rel="noopener noreferrer"><Button>Election Information</Button></a>
        <a href = {votingLocationFinderUrl} target="_blank" rel="noopener noreferrer"><Button>Voting location</Button></a>
        <h5>Address: </h5>
        <p>{address.line1}, {address.city}, {address.state}, {address.zip}</p> 
      </div>
     
    )
  }

  render(){
 
    return(
      <div>
        {this.electionAdmin()}
        {this.localJurInfo()}
      </div>
    )
  }
}

export default PollingInfo

/* 
  api response structure

  {
    election: {id:"", name:"", ocdDivisionId:""},
    kind: "",
    normalizedInput: {city:"",line1:"", state:"", zip:""},

    state: [
      {
        electionAdministrationBody:{
          ballotInfoUrl:"", 
          electionInfoUrl, 
          name: "", 
          votingLocationFinderUrl:"",
          correspondenceAddress: {
            city:"", line1:"", state:"", zip: ""
          }
        },

        local_jurisdiction: {
          electionAdministrationBody: {
            electionInfoUrl: "",
            electionOfficials: [{emailAddress, officePhoneNumber}],
            physicalAddress: {

            }
          },
          name: "",
          sources:[{}]
        },

        name: "",
        sources: [{}]
      }
    ]

  }

  what I need:
  res.data.state[0].electionAdministrationBody
  res.data.state[0].local_jurisdiction

  electionAdministrationBody.ballotInfoUrl
  electionAdministrationBody.electionInfoUrl
  electionAdministrationBody.votingLocationFinderUrl
  electionAdministrationBody.correspondenceAddress.city/line1/state/zip

  local_jurisdiction.electionAdministrationBody.electionInfoUrl
  local_jurisdiction.electionAdministrationBody.physicalAddress.city/line1/state/zip
  local_jurisdiction.electionAdministrationBody.name
  local_jurisdiction.electionAdministrationBody.electionOfficials[0].officePhoneNumber/emailAddress

*/