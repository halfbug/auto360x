import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ComplexGrid from '../../components/ComplexGrid';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import defaultImage from "../../assets/images/unknown-512.png"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function PersonalDetail(props) {
  const classes = useStyles();
const handleEdit = ()=>{}
const saveProfileImage =(imageName)=>{console.log(imageName)}
const {handleChange, values} = props;
  return (
    <div className={classes.root}>
    <ComplexGrid onEdit={handleEdit} onImageSave={saveProfileImage} imageButtonLable="Profile Picture" defaultImage={defaultImage}>
        Personal Information
        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="fullname"
                                name="fullname"
                                label="Full name"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                
                                id="phone_number"
                                name="phone_number"
                                label="Phone number"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                   id="address"
                                name="address"
                                label="Address"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                    <Grid item xs={12} >
                            <TextField
                                
                                id="description"
                                name="description"
                                label="Detail"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
        </ComplexGrid> 
    </div>
  );
}