import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ComplexGrid from '../../components/ComplexGrid';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import defaultImage from "../../assets/images/default-logo.png"
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

export default function Company(props) {
  const classes = useStyles();
const handleEdit = ()=>{}
const saveDealerLogo =(imageName)=>{console.log(imageName)}
const {handleChange, values} = props;
  return (
    <div className={classes.root}>
    <ComplexGrid onEdit={handleEdit} onImageSave={saveDealerLogo} imageButtonLable="Logo" defaultImage={defaultImage}>
        Dealer Information
        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="company_name"
                                name="fulcompany_namelname"
                                label="Dealer Name"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                
                                id="company_email"
                                type="email"
                                name="company_email"
                                label="Official Email"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                
                                id="company_phone"
                                name="company_phone"
                                label="Phone"
                                type="phone"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                
                                id="website"
                                name="website"
                                label="Website"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                   id="company_address"
                                name="company_address"
                                label="Address"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                    <Grid item xs={12} >
                            <TextField
                                
                                id="company_detail"
                                name="company_detail"
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