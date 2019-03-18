import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/core/ExpandMore'
 
class RecentBills extends React.Component{
  render(){
    return(
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>

          </ExpansionPanelSummary>
          
          <ExpansionPanelDetails>

          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
  
}

export default RecentBills