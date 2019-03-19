import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  media:{
    width: "100%",
  },
  root: {
    width: "20vw"
  }
}


const Representative =(props)=>{
  const {classes} = props
  const dets = props.repDets
  return(
    <div>
      <Card className = {classes.root}>
        {/* representative picture */}
        <CardActionArea>
          <CardMedia className = {classes.media} component = "img" src = {dets.pic} title = "beto"/>
        </CardActionArea>

        {/* representative contact details */}
        <CardContent>
          <Typography variant = "h5">{dets.title} {dets.name}</Typography>
          <p>Contact Details: {dets.contact}</p> 
        </CardContent>

        <CardActions>
          <Button>See more</Button>
        </CardActions>
      </Card>

    </div>
  )
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Representative)