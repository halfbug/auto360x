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
const {handleChange, values, errors, validator } = props;
console.log(errors)
  return (
    <div className={classes.root}>
    <ComplexGrid onEdit={handleEdit} onImageSave={saveProfileImage} imageButtonLable="Profile Picture" defaultImage={defaultImage}>
        Personal Information
        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            error={errors.fullname}
                                required
                                id="fullname"
                                name="fullname"
                                label="Full name"
                                onChange={handleChange}
                                fullWidth
                                value = {values.user.fullname}
                                helperText={validator.message('fullname', values.user.fullname, 'required|alpha_space',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            error={errors.email}
                                required
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                fullWidth
                                //value = {values.user.eamil}
                                helperText={validator.message('email', values.user.email, 'required|email',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            error={errors.password}
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('password', values.user.password, 'required|min:6',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                
                                id="phone_number"
                                name="phone_number"
                                label="Phone number"
                                onChange={handleChange}
                                fullWidth
                                value = {values.user.phone_number}
                                helperText={validator.message('phone_number', values.user.phone_number, 'phone',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                   id="address"
                                name="address"
                                label="Address"
                                onChange={handleChange}
                                fullWidth
                                value= {values.user.phone_number}
                                helperText={validator.message('address', values.user.address, 'alpha_num_space',{element: false})}
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
                                helperText={validator.message('description', values.user.description, 'alpha_num_space',{element: false})}
                            />
                        </Grid>
                    </Grid>
        </ComplexGrid> 
    </div>
  );
}