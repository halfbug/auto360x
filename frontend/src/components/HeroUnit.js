import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Brand from './Brand';


const styles = theme => ({
    
    icon: {
      marginRight: theme.spacing.unit * 2,
    },
    heroTitle: {
        fontFamily: 'Candal',
        color: theme.primary,
      },
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
      marginTop: theme.spacing.unit * 4,
    },
    
  });
  

const HeroUnint = (props) => {
    const { classes } = props;
  return (
    <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            {props.children}
          </div>
        </div>
        
  )
}

HeroUnint.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(HeroUnint);

