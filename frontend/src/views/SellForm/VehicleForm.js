import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


export default function VehicleForm() { 
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Vehicle Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="make"
            name="make"
            label="Make"
            fullWidth
            autoComplete="make"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="model"
            name="model"
            label="Model"
            fullWidth
            autoComplete="model"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Year"
            name="Year"
            label="Year"
            fullWidth
            autoComplete="license"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="trim"
            name="trim"
            label="Trim"
            fullWidth
            autoComplete="trim"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="transmission"
            name="transmission"
            label="Transmission"
            fullWidth
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="engine" name="engine" 
          label="Engine Type" 
          fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mileage"
            name="mileage"
            label="Mileage (KM)"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          Upload Photos
          <br/>
          <input
        accept="image/*"
        className={classes.input}
        id="outlined-button-file"
        multiple
        type="file"
      />
      <label htmlFor="outlined-button-file">
        <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button>
      </label>


        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
