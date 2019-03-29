import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import { compose } from "redux";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
import {deleteAccount} from '../../ducks/authReducer'
import {Redirect} from 'react-router-dom'

class DeleteConfirm extends React.Component{
  constructor(){
    super()
    this.state = {
      open: true,
      deleted:false
    }
  }

  pageRedirect=()=>{
    if(this.state.deleted===true){
      return <Redirect to = "/"/>
    }
  }


  render(){
    return(
      <Dialog open = {this.state.open}>
        {this.pageRedirect()}
        <DialogTitle>Delete account?</DialogTitle>

        <DialogContent>
            <DialogContentText>Are you sure you want to delete your account?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick = {()=>{
            this.props.deleteAccount()
            this.setState({deleted: true})
            }}>Yes</Button>
          <Button onClick = {()=>this.props.confirmToggle()}>No</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default compose(connect(mapStateToProps,{deleteAccount}))(DeleteConfirm)


/*
const DeleteConfirm = ()=>{
  return(
  
      <Dialog>
        <DialogTitle>Delete account?</DialogTitle>

        <DialogContent>
            <DialogContentText>Are you sure you want to delete your account?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button>Yes</Button>
          <Button>No</Button>
        </DialogActions>
      </Dialog>

  
  )
}

*/