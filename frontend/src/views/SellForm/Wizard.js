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
import axios from 'axios';
import {serverURl} from '../../config/general'


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

export default function Wizard() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = React.useReducer(Sell);
  const [list,setList] = React.useState({makes:[],models:[],trims:[],styles:[], years:[], drivetypes: []})
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [values,setValues] = React.useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    addSell(values,dispatch);
    console.log(state)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

const getModelByMakeYear=(make,year=0)=>{
  console.log(make)
const url =(year===0)?`/api/detail/model/${make}`:`/api/detail/model/${make}/${year}`
  axios.defaults.baseURL = serverURl
  axios
    .get(url)
    .then(res => {
      // console.log(res.data);
      
      setList({
        ...list,
        models: res.data})
      // console.log(res.data);
      // console.log(lmake);
    })
    .catch(err =>
      //dispatch(returnErrors(err.response.data, err.response.status))  
      console.log(err)
    );    
    }

    const getTrim=(make,year,model)=>{
      console.log(make)
    const url =`/api/detail/trim/${year}/${make}/${model}`
      axios.defaults.baseURL = serverURl
      axios
        .get(url)
        .then(res => {
          // console.log(res.data);
          
          setList({
            ...list,
            trims: res.data})
          // console.log(res.data);
          // console.log(lmake);
        })
        .catch(err =>
          //dispatch(returnErrors(err.response.data, err.response.status))  
          console.log(err)
        );    
        }
        

    const getAllYears=()=>{
      
      axios.defaults.baseURL = serverURl
    axios
        .get(`/api/detail/allyears`)
        .then(res => {
          console.log(res.data);
          list["years"]=res.data
          // setList({
          //   ...list,
          //   years: res.data})
          // // console.log(res.data);
          // console.log(lmake);
  forceUpdate();
        })
        .catch(err =>
          //dispatch(returnErrors(err.response.data, err.response.status))  
          console.log(err)
        );
      

}


const getAllMakes=()=>{
  // get all make
  axios.defaults.baseURL = serverURl;
  axios
      .get('/api/detail/allmake')
      .then(res => {
        // console.log(res.data);
        list["makes"]=res.data
      //   setList({
      //     ...list,
      //     makes: res.data})
      forceUpdate();
      })
      
      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))  
        console.log(err)
      );
  
    }

    const getBodyStyles=()=>{
      // get all make
      axios.defaults.baseURL = serverURl;
      axios
          .get('/api/detail/bodystyle')
          .then(res => {
            // console.log(res.data);
            list["styles"]=res.data
          //   setList({
          //     ...list,
          //     makes: res.data})
          forceUpdate();
          })
          
          .catch(err =>
            //dispatch(returnErrors(err.response.data, err.response.status))  
            console.log(err)
          );
      
        }
    

        const getDriveTypes=()=>{
          // get all make
          axios.defaults.baseURL = serverURl;
          axios
              .get('/api/detail/drivetypes')
              .then(res => {
                // console.log(res.data);
                list["drivetypes"]=res.data
              //   setList({
              //     ...list,
              //     makes: res.data})
              forceUpdate();
              })
              
              .catch(err =>
                //dispatch(returnErrors(err.response.data, err.response.status))  
                console.log(err)
              );
          
            }    
    React.useEffect(() => {
     //get all make for car
     getAllMakes();
     getAllYears(); 
     getBodyStyles();
     getDriveTypes();
      
    },[]); // Pass empty array to only run once on mount.
  




// Handle fields change
const handleChange =  e => {
  console.log(e.target)
  const field = (!e.target.id)?e.target.name : e.target.id;
  setValues({ 
    ...values,
    [field] : e.target.value });
  console.log("wizard state : advert :")
  console.log(values)
  switch(field){
    case "make":
      getModelByMakeYear(e.target.value);
      break;
    case "year":
      if(list.makes.length >1)
      getModelByMakeYear(values.make,e.target.value)
      break; 
    case "model":
        if(values.make&& values.year)
        getTrim(values.make,values.year,e.target.value)
        break;  
    default:
      break;
  }

  
};

React.useEffect(() => {
   
 },[]); // Pass empty array to only run once on mount.


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
        values={values} list={list} />;
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
