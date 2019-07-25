import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
     
    },
  },
  gray:{
      marginTop: 24,
      marginBottom: 24,
      marginRight:0,
      marginLeft:0,
      borderRadius: 4,
      backgroundColor: "#f5f5f5",
      padding:"12px 18px",
      width : "70%",
      
  }
}));

export default function About(props) {
      //  if (!this.props.auth.isloged) {
    //   return <Redirect to="/signin" />;
    // }
    const classes = useStyles();
    
    
    return (
        <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
        <Typography variant="h3" component="h1" gutterBottom>
        About 
      </Typography>
      <Typography variant="h5" component="h4" gutterBottom>
        Are you looking to buy a new or preowned vehicle in good condition, 
        or sell one that you already own?
      </Typography>
      <Box className={classes.gray}>
      <Typography variant="body2" >
      Perhaps you’re looking for your dream car, but have so far struggled to find anything anywhere else?
Regardless of your reasons, we can help.<span role="img" aria-label="Love">❤️</span>
      </Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
      Operating in the USA, we are a digital automotive marketplace that connects car shoppers with sellers nationally. This allows you to compare prices and have access to a larger pool of cars, including everything from new cars, classical cars and RV motorhomes, giving you more selection when it comes to making your final choice.
      </Typography>
      <Typography variant="body1" gutterBottom>
      On the casual side of our business, we allow you to sell and purchase cars by talking directly with those who advertise the site through our secure messaging system. This will provide you protection as you shop around to find the dream car; whether it’s something you’ve always dreamed of owning, or something more practical, that you’re purchasing to get from A to B. 


      </Typography>
      <Typography variant="body1" gutterBottom>
      In addition to these services, we also work professionally with dealerships throughout the country to provide you with the best possible deals on your dream car. With options to set your search settings to local or national, you can pick the distance that you are willing to travel, and use this as a starting place to determine the right car for you. 
      </Typography>
      <Typography variant="body1" gutterBottom>
      Our dedication towards providing the best possible service to our customers means that we will provide you with all the data, resources and digital tools you need to make an informed decisions every time. This gives you a sense of protection and allows you to know exactly what you’re getting yourself into when you find the car you’ve fallen in love with.
      </Typography>
      <Typography variant="body1" gutterBottom>
      Now that you’ve read what we’re about, what are you waiting for? Use our navigational menu at the top of this page and start exploring the cars we have on offer today. Alternatively, create your advertisement and let us find an owner for your new or preowned car today!   
       </Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          
        </Grid>
       </Grid> 
       </div>
    )
  }


