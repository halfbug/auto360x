import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { connect } from "react-redux";
import { Redirect , withRouter } from "react-router-dom";
import { compose } from "redux";

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
}));

export default function Home(props) {
  
  

    //  if (!this.props.auth.isloged) {
    //   return <Redirect to="/signin" />;
    // }
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div>
      <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
      </div>
    )
  }


const mapStateToProps = (state, ownProps) => {
  console.log(state);
  // const accessId =(accId) => {accId};
  // const companies = state.firestore.data.companies;
  // const event = companies ? companies[accessId] : null
  return {
    // companies: companies,
    auth: state.firebase.auth,
   
  };
};

// export default compose(
//   // connect(
//   //   mapStateToProps,
//   //   {}
//   // ),
//   withRouter
// ) (Home)