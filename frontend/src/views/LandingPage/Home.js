import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';



import { connect } from "react-redux";
import { Redirect , withRouter } from "react-router-dom";
import { compose } from "redux";

import HeroUnit from "./../../components/HeroUnit"
import SearchBar from "./../../components/SearchBar"
import Carousel from "./../../components/Carousel2"
import car1 from "./../../assets/carousel/1.jpg"


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:  `url(${car1})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
        flexBasis: '100%',
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
}));

export default function Home(props) {
      //  if (!this.props.auth.isloged) {
    //   return <Redirect to="/signin" />;
    // }
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
      <div>
     
     <SearchBar />
     <Carousel /> 
       
      <HeroUnit>
     
      </HeroUnit>
      </div>
    )
  }


