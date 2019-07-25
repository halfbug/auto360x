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
const {handleChange, values, errors, validator} = props;
  return (
    <div className={classes.root}>
    <ComplexGrid onEdit={handleEdit} onImageSave={saveDealerLogo} imageButtonLable="Logo" defaultImage={defaultImage}>
        Dealer Information
        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.company_name}
                                required
                                id="company_name"
                                name="fulcompany_namelname"
                                label="Dealer Name"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('company_name', values.user.password, 'required|alpha_num_space ',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.company_email}
                                id="company_email"
                                type="email"
                                name="company_email"
                                label="Official Email"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('company_email', values.user.company_email, 'required|email',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.company_phone}
                                id="company_phone"
                                name="company_phone"
                                label="Phone"
                                type="phone"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('company_phone', values.user.company_phone, 'phone',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.website}
                                id="website"
                                name="website"
                                label="Website"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('website', values.user.website, 'url',{element: false})}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            error={errors.company_address}
                                   id="company_address"
                                name="company_address"
                                label="Address"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('company_address', values.user.company_address, 'alpha_num_space|max:100',{element: false})}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                    <Grid item xs={12} >
                            <TextField
                                error={errors.company_detail}
                                id="company_detail"
                                name="company_detail"
                                label="Detail"
                                onChange={handleChange}
                                fullWidth
                                helperText={validator.message('Detail', values.user.company_detail, 'alpha_num_space|max:300',{element: false})}
                            />
                        </Grid>
                    </Grid>
        </ComplexGrid> 
    </div>
  );
}