import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import {serverURl} from '../config/general'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
     
    justifyContent: "center",
  },
  sform: {
    display: "flex",
    width: "100%",
   justifyContent: "space-between",
    marginLeft: "0.35rem",
    marginBottom: "0.45rem",
    ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
      display: 'inline-grid',
      width: "auto",
    }
  },
  scontrol : {
    width: "25%",
    ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    }
  },
  input: {
    marginLeft: 8,
    flex: 1,
    // width: 3,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function SearchBar() {
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
      
if(e.target.name === "make")
getModelByMakeYear(e.target.value);

 setValues({ 
    ...values,
    [e.target.name] : e.target.value });

    // console.log(field)
    console.log(e.target)
};
  return (
    <Paper className={classes.root}>
      <form className={classes.sform} autoComplete="off">
      
      <FormControl className={classes.scontrol}>
        <InputLabel htmlFor="make">Make</InputLabel>
        <Select
          value={values.make}
          onChange={handleChange}
          name = "make"
          inputProps={{ 'aria-label': 'Make of Car' }}
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
      <FormControl className={classes.scontrol}>
        <InputLabel htmlFor="model">Model</InputLabel>
        <Select
          value={values.model}
          onChange={handleChange}
          name="model"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.models.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.scontrol}>
        <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
        <Input
        placeholder="00000"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
        name="zipcode"
      />
      </FormControl>
          {/* <Divider className={classes.divider} /> */}
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      </form>
    </Paper>
  );
}