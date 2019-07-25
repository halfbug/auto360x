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

export default function Terms(props) {
      //  if (!this.props.auth.isloged) {
    //   return <Redirect to="/signin" />;
    // }
    const classes = useStyles();
    
    
    return (
        <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
        <Typography variant="h4" component="h1" gutterBottom>
        TERMS OF SERVICE AGREEMENT
      </Typography>
      <Box className={classes.gray}>
      <Typography variant="body2" gutterBottom>
      PLEASE READ THE FOLLOWING TERMS OF SERVICE AGREEMENT CAREFULLY. BY
ACCESSING OR USING OUR SITES AND OUR SERVICES, YOU HEREBY AGREE TO BE
BOUND BY THE TERMS AND ALL TERMS INCORPORATED HEREIN BY REFERENCE. IT
IS THE RESPONSIBILITY OF YOU, THE USER, CUSTOMER, OR PROSPECTIVE
CUSTOMER TO READ THE TERMS AND CONDITIONS BEFORE PROCEEDING TO USE
THIS SITE. IF YOU DO NOT EXPRESSLY AGREE TO ALL OF THE TERMS AND
CONDITIONS, THEN PLEASE DO NOT ACCESS OR USE OUR SITES OR OUR SERVICES.
THIS TERMS OF SERVICE AGREEMENT IS EFFECTIVE AS OF 06/10/2019.
      </Typography>
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
      ACCEPTANCE OF TERMS
      </Typography> 
      <Typography variant="body1" gutterBottom>
      The following Terms of Service Agreement (the "TOS") is a legally binding agreement that shall
govern the relationship with our users and others which may interact or interface with
Auto360X.LLC, also known as Auto360X, located at, Cocoa, Florida 32926 and our subsidiaries
and affiliates, in association with the use of the Auto360X website, which includes
Auto360X.com, (the "Site") and its Services, which shall be defined below. 
</Typography>
      
<Typography variant="h6" component="h3" gutterBottom>
DESCRIPTION OF PLATFORM SERVICES OFFERED
      </Typography> 
      <Typography variant="body1" gutterBottom>
     <p> The Site is an e-commerce platform which has the following description:
     </p>
<p>
Auto360x.com is a platform where people can sell their new or used vehicles. Auto360X.com
will connect buyers and sellers to sell their vehicles also dealerships can sell their vehicles on our
platform. Auto360x is not responsible for any damage or vehicles with issues since sellers are
responsible for their vehicles. Auto360x allows sellers to list their vehicles on our platform and
our system will match them on their search and price in their local areas.
Any and all visitors to our site, despite whether they are registered or not, shall be deemed as
"users" of the herein contained Services provided for the purpose of this TOS. Once an
individual register's for our Services, through the process of creating an account, the user shall
then be considered a "member."</p>
<p>
The user and/or member acknowledges and agrees that the Services provided and made available
through our platform and applications, which may include some mobile applications and that
those applications may be made available on various social media networking sites and
numerous other platforms and downloadable programs, are the sole property of Auto360X.LLC.
At its discretion, Auto360X.LLC may offer additional website Services and/or products, or
update, modify or revise any current content and Services, and this Agreement shall apply to any
and all additional Services and/or products and any and all updated, modified or revised Services
unless otherwise stipulated. Auto360X.LLC does hereby reserve the right to cancel and cease
offering any of the aforementioned Services and/or products. You, as the end user and/or
member, acknowledge, accept and agree that Auto360X.LLC shall not be held liable for any
such updates, modifications, revisions, suspensions or discontinuance of any of our Services 
and/or products. Your continued use of the Services provided, after such posting of any updates,
changes, and/or modifications shall constitute your acceptance of such updates, changes and/or
modifications, and as such, frequent review of this Agreement and any and all applicable terms
and policies should be made by you to ensure you are aware of all terms and policies currently in
effect. Should you not agree to the updated, revised or modified terms, you must stop using the
provided Services forthwith.
</p>
<p>
Furthermore, the user and/or member understands, acknowledges and agrees that the Services
offered shall be provided "AS IS" and as such Auto360X.LLC shall not assume any
responsibility or obligation for the timeliness, missed a delivery, deletion and/or any failure to
store user content, communication or personalization settings.
</p> 
</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          
        </Grid>
       </Grid> 
       </div>
    )
  }


