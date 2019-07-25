import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';



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
      color: red
  }
}));

export default function ErrorBox(props) {
      //  if (!this.props.auth.isloged) {
    //   return <Redirect to="/signin" />;
    // }
    const classes = useStyles();
    
    
    return (
        <div className={classes.root}>
      
      <Box className={classes.gray}>
      <Typography variant="body2" >
     {props.message}
      </Typography>
      </Box>
       
       </div>
    )
  }


