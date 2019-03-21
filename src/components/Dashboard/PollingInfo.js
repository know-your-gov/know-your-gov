import React from 'react'
import axios from 'axios'


class PollingInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      location: {}
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
      electionId:+id,
      address: "500 South Ervay Street"
    }
    }
    ).then((res)=>res.data)
    // console.log(info)
    this.setState({location: info.state[0]})
    return info
  }
  render(){
    let{location} = this.state
    // let elecAdmin = location.electionAdministrationBody
    // console.log(elecAdmin)
 
    return(
      <div>
        <p>{location.name}</p>
        {/* <p>{line1}, {city}, {state}, {zip}</p> */}
      </div>
    )
  }
}


export default PollingInfo