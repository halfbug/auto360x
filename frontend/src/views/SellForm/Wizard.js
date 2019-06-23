import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VehicleForm from './VehicleForm';
import ListingForm from './ListingForm';
import Review from './Review';
import Sell from './../../store/reducers/sellReducer';
import {addSell} from './../../store/actions/sellActions';
import useThunkReducer from 'react-hook-thunk-reducer';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Vehicle details', 'Listing details', 'Contact detail', 'Preview listing'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <VehicleForm saveAdvert={saveAdvert} />;
//     case 1:
//       return <ListingForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function Wizard() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = React.useReducer(Sell);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    addSell(values,dispatch);
    console.log(state)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [advert,setadvert]=React.useState({});

  const saveAdvert = (nadvert) => {
    console.log(advert)
    setadvert({
      ...advert,
      nadvert
    })
        console.log("wizard state : advert :")
    console.log(advert)
    // dispatch({
    //   type: 'GET_SELL',
    //   payload:advert
    // })

    // getSells(advert,dispatch);//.then(console.log(state));
// console.log ("state")
    console.log(state)
    
  };



const [values,setValues] = React.useState({});

// Handle fields change
const handleChange =  e => {
  
  setValues({ 
    ...values,
    [(e.target.id=="")?e.target.name : e.target.id] : e.target.value });
  console.log("wizard state : advert :")
  console.log(values)
};

React.useEffect(() => {
    if (values.count > 1) {
      console.log("wizard effect : values :")
  console.log(values)
    } else {
      // storeSell(values,dispatch);
      console.log("wizard effect : values :")
  console.log(values)
    }
  }, [values]);


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <VehicleForm handleChange={handleChange}
        values={values} />;
      case 1:
        return <ListingForm handleChange={handleChange}
        values={values} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  };



  return (
    <React.Fragment>
      
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Listing
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for placing your add.
                </Typography>
                <Typography variant="subtitle1">
                  Your add will be displayed 30 days with 7 days as
                  feature add display over home page freature box.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Publish' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
       
      
    </React.Fragment>
  );
}
