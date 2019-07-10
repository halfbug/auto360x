import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Sell from './../../store/reducers/sellReducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
    display: "inline"
  },
}));

export default function ListingForm(props) {
   const { values, handleChange } = props;
   const classes = useStyles();
  // function handleChange(event) {
  //   event.persist();
  //   setvalues(oldValues => ({
  //     ...oldValues,
  //     [event.target.id]: event.target.value,
  //   }));
  //   props.saveAdvertHof({values})
  //   console.log(state)
  // }

  // React.useEffect(() => {
  //   // props.saveAdvertHof({values})
  // });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Listing Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
        <FormControl component="fieldset" >
        <FormLabel component="legend">Seller Type</FormLabel>
        <RadioGroup
          aria-label="seller_type"
          name="seller_type"
          id="seller_type"
          required
          row
          onChange={handleChange}
        >
          <FormControlLabel value="individual" 
           label="Individual"
           id="seller_type"
          control={<Radio color="primary" />}
          labelPlacement="end"
           />
          <FormControlLabel value="dealer" 
           label="Dealer"
           id="seller_type" 
           control={<Radio color="primary" />}
          labelPlacement="end"
            />
          
          
        </RadioGroup>
      </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="Vin Number" 
          label="Vin Number" fullWidth onChange={handleChange} />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField required id="registration_year" label="Registration Year" fullWidth />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="owner"
            label="Owner"
            helperText="if you are first or sencond owner of the car"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="zipcode" 
          label="Zip Code"
          helperText="Where is this car currently located?"
           fullWidth
           onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="price"
           label="Enter your Car Price ( USD )" fullWidth />
        </Grid>
        
        <Grid item xs={12} md={12}>
          <TextField
            
            id="description"
            label="Description"
            rowsMax="4"
            multiline
            helperText="Describe your car in more detaial"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={12}>
        <FormControl component="fieldset" 
        >
        <FormLabel component="legend">Select Add Package</FormLabel>
        <RadioGroup
          aria-label="package"
          name="package"
          id = "package"
          onChange={handleChange}
        >
          <FormControlLabel
            value="packid"
            control={<Radio color="primary" />}
            label="$99 for 30 days add display"
            labelPlacement="end"
          />
          <FormControlLabel
            value="packid2"
            control={<Radio color="primary" />}
            label="$199 for 90 days add display"
            labelPlacement="end"
          />
          <FormControlLabel
            value="packid3"
            control={<Radio color="primary" />}
            label="$250 Feature 30 days add display with 7 days feature"
            labelPlacement="end"
          />
          <FormControlLabel
            value="packid4"
            control={<Radio color="primary" />}
            label="$400 Feature 60 days add display with 7 days feature"
            labelPlacement="end"
          />
          
        </RadioGroup>
        <FormHelperText> </FormHelperText>
      </FormControl>
      </Grid>
        
      <Grid item xs={12}>
      <FormControl component="fieldset" >
        <FormLabel component="legend">Condition</FormLabel>
        <RadioGroup
          aria-label="Condition"
          name="condition"
          className={classes.group}
          value={values.condition}
          onChange={handleChange}
         
          id= "condition"
        >
          <FormControlLabel value="New" control={<Radio />} label="New" />
          <FormControlLabel value="Used" control={<Radio />} label="Used" />
          
        </RadioGroup>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="tandc" value="yes" />}
            label="Agreed to Terms & Conditions" onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
