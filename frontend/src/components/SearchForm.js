import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import {serverURl} from '../config/general'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SearchForm(props) {
  const classes = useStyles();
   const [list,setList] = React.useState({makes:[],models:[],trims:[],styles:[], years:[], drivetypes: []})
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [values,setValues] = React.useState({});

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

const getAllMakes=()=>{
  // get all make
  axios.defaults.baseURL = serverURl;
  axios
      .get('/api/detail/allmake')
      .then(res => {
        setList({
          ...list,
          makes: res.data})
      })
      
      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))  
        console.log(err)
      );
  
    }

    React.useEffect(() => {
     //get all make for car
     getAllMakes();
     
      
    },[]); // Pass empty array to only run once on mount.
const handleChange =  e => {
      const field = (!e.target.id)?e.target.name : e.target.id;
if(field == "make")
getModelByMakeYear(e.target.value);

 setValues({ 
    ...values,
    [field] : e.target.value });
};





  
//   const { values, handleChange, list } = props;
  return (
    <form className={classes.root} autoComplete="off">
      
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="make">Make</InputLabel>
        <Select
          value={values.make}
          onChange={handleChange}
          input={<BootstrapInput name="make" id="make" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.makes.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="model">Model</InputLabel>
        <NativeSelect
          value={values.model}
          onChange={handleChange}
          input={<BootstrapInput name="model" id="model" />}
        >
          <option value="" />
          {list.models.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
        <BootstrapInput id="zipcode" />
      </FormControl>
    </form>
  );
}