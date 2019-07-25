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
import {FormatPrice, FormatZipCode} from '../../components/FormatedFields';

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
   const { values, handleChange , validator, errors} = props;
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
// console.log(errors)
// console.log(validator.fields.vin_num)

validator.purgeFields();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Listing Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
        <FormControl component="fieldset" error={errors.seller_type} >
        <FormLabel component="legend">Seller Type</FormLabel>
        <RadioGroup
          aria-label="seller_type"
          name="seller_type"
          id="seller_type"
          required
          row
          value={values.seller_type}
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
        <FormHelperText id="component-error-text" error>
         
           { validator.message('seller_type', values['seller_type'], 'required',{element: false})}
          </FormHelperText>
        
      </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="vin_num" error={errors.vin_num}
          label="Vin Number" fullWidth value={values.vin_num} onChange={handleChange} 
          helperText={validator.message('vin_num', values.vin_num, 'required|max:17',{element: false})}
 
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField required id="registration_year" label="Registration Year" fullWidth />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            
            id="owner"
            label="Owner"
            helperText="if you are first or sencond owner of the car"
            fullWidth
            onChange={handleChange}
            value={values.owner}
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="zipcode" error={(!validator.fieldValid('zipcode') && validator.messagesShown) }
          label="Zip Code"
         // helperText="Where is this car currently located?"
         helperText={validator.message('zipcode', values.zipcode, 'required|max:5|min:5',{element: false})}
           fullWidth
           onChange={handleChange}
           value={values.zipcode}
           InputProps={{
          inputComponent: FormatZipCode,
        }}
            />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="price"
          error={errors.price}
            name="price"
           label="Price ( USD )" fullWidth
           value={values.price}
           onChange={handleChange}
           helperText={validator.message('price', values.price, 'required',{element: false})}
           InputProps={{
          inputComponent: FormatPrice,
          
        }}
            />
        </Grid>
        
        <Grid item xs={12} md={12}>
          <TextField
            error={errors.description}
            id="description"
            label="Description"
            rowsMax="4"
            multiline
            helperText={validator.errorMessages.description === null ? "Describe your car in more detaial" : validator.message('description', values.discription, 'alpha_num_dash_space|max:250',{element: false}) } 
            fullWidth
            onChange={handleChange}
            value={values.description}
            
          />
        </Grid>
        
        <Grid item xs={12} md={12}>
        <FormControl component="fieldset" error={errors.package}
        >
        <FormLabel component="legend">Select Add Package</FormLabel>
        <RadioGroup
          aria-label="package"
          name="package"
          id = "package"
          onChange={handleChange}
          value={values.package}
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
        <FormHelperText id="component-error-text" error>
         
           { validator.message('package', values['package'], 'required',{element: false})}
          </FormHelperText>
      </FormControl>
      </Grid>
        
      <Grid item xs={12}>
      <FormControl component="fieldset" error={errors.condition}>
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
         <FormHelperText id="component-error-text" error>
         
           { validator.message('condition', values['condition'], 'required',{element: false})}
          </FormHelperText>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="terms and conditions" value="yes" />}
            label="Agreed to Terms & Conditions" onChange={handleChange}
          />
          <FormHelperText id="component-error-text" error>
         
         { validator.message('terms and conditions', values['terms and conditions'], 'required',{element: false})}
        </FormHelperText>
        </Grid>
      </Grid> 
    </React.Fragment>
  );
}
