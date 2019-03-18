import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./Account.css"

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 700,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Account(props) {
  const { classes } = props;
    return (
      <div className="accountCard">
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Account information:
          </Typography>
          <Typography variant="h5" component="h2">
           {/* {this.props.user.username} */} Username
          </Typography>
          <br/>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            City:
          </Typography>
          <Typography variant="h5" component="h2">
           {/* {this.props.user.city} */} City Here
          </Typography>
          <br/>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            State:
          </Typography>
          <Typography variant="h5" component="h2">
           {/* {this.props.user.state} */} State Here
          </Typography>
          <br/>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Zip Code:
          </Typography>
          <Typography variant="h5" component="h2">
           {/* {this.props.user.zipCode} */} Zip Code Here
          </Typography>
          <br/>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Account information:
          </Typography>
          <Typography variant="h5" component="h2">
           {/* {this.props.user.address} */} Address Here
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {this.editHandler()}}>Edit Information</Button>
        </CardActions>
      </Card>
      </div>
    );
  }


Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
