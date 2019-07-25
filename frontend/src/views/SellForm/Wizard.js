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
import axios from 'axios';
import {serverURl} from '../../config/general';
import Contact from './Contact'



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

const steps = ['Vehicle details', 'Listing details', 'Preview listing'];

export default function Wizard(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [list,setList] = React.useState({makes:[],models:[],trims:[],styles:[], years:[], drivetypes: []})
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [values,setValues] = React.useState({});
  const isContactStep = (steps[activeStep] === "Contact Details")?true:false;
 const {validator}=props; 
 const [errors,setErrors]=React.useState({})
 
 const stepkey =()=>{
  let vrname = steps[activeStep].split(" ")
  return vrname[0].toLowerCase()
 }
 const saveStepwise=(field,value)=>{
   const vrname= stepkey();
       setValues({
         ...values,
         [vrname]:{...values[vrname], [field]:value}
       })

       setErrors({
        ...errors,
        [vrname]:{...errors[vrname], [field]:false}
      })
  
 }
  const handleNext = () => {
   
  if (validator.allValid()) {
    setActiveStep(activeStep + 1);

   if ((steps.length - 1 ) === activeStep){
     console.log("--------------------------------------final values")
     console.log(values)
//add new user incase of first time vehicle incertion
        if (steps.indexOf("Contact Details") !== -1) 
        props.register(values.user).then((res)=>{
          // console.log("promise resolved!!!!!!!!!!!!!!!!!")
          // console.log(res);
          values['user_id']=res.user.id
          props.addSell(values)})
        else{
          // values['user_id']=res.user.id
          props.addSell(values)
        } 
         
    //.then((nuser => { console.log(nuser)}))
    localStorage.removeItem('sellform');
   }
   else{
    localStorage.setItem('sellform', JSON.stringify(values));
    
   }
  }
  else {

    validator.showMessages();
    const skey = stepkey();
console.log(validator.getErrorMessages())
const emsges = validator.getErrorMessages();
let errlist = {}
for(var fname in emsges){
  console.log(emsges[fname])
  console.log(skey)
      // if ( emsges[fname] != null ) {
      //   console.log("inside if : "+fname)
      console.log(errors)
  errlist[fname]=!(validator.fields[fname])
      // }
      // else{
      //   console.log("inside else : "+fname)
      //   setErrors({
      //     ...errors,
      //     [skey]:{ ...errors[skey], [fname]:false}
      //   })
      // }
    }
console.log(errors)

// if(values.seller_type == null)
// errlist['seller_type'] = true;
// else{
// validator.fields['seller_type'] = true;
// console.log(validator.fields['seller_type'] )
// }
setErrors({
  ...errors,
  ...errlist
})
    forceUpdate();
  }

    // console.log(state)
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

     
console.log(steps)
    },[]); // Pass empty array to only run once on mount.
  

    React.useEffect(() => {
     
 if(localStorage.token == null)
 steps.splice( 2, 0, "Contact Details");
else{
  var index = steps.indexOf("Contact Details");
if (index !== -1) steps.splice(index, 1);
}
 
 
//  console.log(steps)
     },[]); //

     
// Handle fields change
const handleChange =  e => {
  // validator.showMessages();
  console.log(e.target)
  
  const field = (!e.target.id)?e.target.name : e.target.id;

//   setError({
//     ...error,
//     [field] :false
//   })
  console.log(steps[activeStep] === "Contact details")
console.log(isContactStep)
  if(isContactStep){
    console.log("inside contact step")
    setValues({ 
      ...values,
      user:{...values.user, [field] : e.target.value }});
  }else
  setValues({ 
    ...values,
    [field] : e.target.value });
// saveStepwise(field,e.target.value)
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
  console.log("localstorage")
   const preval = JSON.parse(localStorage.getItem('sellform'))
console.log("should execure once in begining ........")
if(preval != null)
setValues(preval)
   console.log (preval)

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

  // const validator = () => new SimpleReactValidator();

// const [validator,setValidator]= React.useState(false)
//   const validatorListener  =(result) =>{
//     setValidator( !result );
// }
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <VehicleForm handleChange={handleChange}
        values={values} list={list} errors={errors} validator={validator} />;
      case 1:
        return <ListingForm handleChange={handleChange}
        values={values} errors={errors} validator={validator} />;
      case 2:
        return (!props.isAuthenticated)?<Contact setUser={props.setUser} 
        values={values} handleChange={handleChange} errors={errors} validator={validator} /> : <Review />;
      case 3:
        return <Review />  
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
