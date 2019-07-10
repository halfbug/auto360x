import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Filters from "./Filters";
import Results from "./Results";
import FilterList from "@material-ui/icons/FilterList";
import Fab from "@material-ui/core/Fab";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Sell from './../../store/reducers/sellReducer';
import {getSells} from './../../store/actions/sellActions';
import axios from 'axios';
import {serverURl} from '../../config/general'
import useApiRequest from '../../hooks/ApiRequest/';
import { FETCHING, SUCCESS, ERROR } from '../../hooks/ApiRequest/actionTypes';


const drawerWidth = 300;



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    position: "initial !important",
    marginTop: "-5px",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    
  },
  extendedIcon: {
    // fontSize : "12px",
  },
  filterButton: {
    // Match [md, ∞[
    //       [960px, ∞[
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const [checked,setChecked]=React.useState(false)
  const initialState = {
    sell: [],
    loading: false
  };
  const [state, dispatch] = React.useReducer(Sell, initialState);
  const [vehicles, setVehicles] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  

  function handleChange() {
    setChecked(prev => !prev);
  }

  const getAll=()=>{
    // get all make
    // axios.defaults.baseURL = serverURl;
    console.log("direct")
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
        .get('/api/vehicles')
        .then(res => {
          console.log(res);
          // list["makes"]=res.data
          setVehicles({
           data:res.data.vehicles
          })
          setIsLoading(false);
        // forceUpdate();
        })
        
        .catch(err =>{
          //dispatch(returnErrors(err.response.data, err.response.status))  
          console.log(err)
          return (err)
        });
    
      }
  
    //   const [{ status, response }, makeRequest] = useApiRequest(
    //     `/api/vehicles`,
    //     {
    //         verb: 'get',
    //     }
    // );
React.useEffect(() => {
     //get all make for car
     getAll();
    //  getSells({type:"new"},dispatch);
    // makeRequest().then((res)=>{setIsLoading(false);})
    // console.log(status)
    // if(status === "useApiRequest/SUCCESS")
    // {
      
    //   console.log(response.data)
    // }
    },[]); // Pass empty array to only run once on mount.
  
  
// // console.log (props)
//     React.useEffect(() => {
//       const fetchData = async () => {
//         setIsLoading(true);
  
//         const result = getSells({type:"new"},dispatch);
//         console.log (result)
//         result.then((res)=>{
//           console.log(res);
//           dispatch(res);
       
//           // setVehicles(result.data);
//           setIsLoading(false);
//         })
       
//       };
//   // if('loading' in state && state.loading)
//       fetchData();
//     }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <main className={classes.content}>
      <div className={classes.toolbar} >
      <Grid container spacing={3}>
      <Grid item xs={10} >
        
        <Typography variant="h6" noWrap>
            Search Results
        </Typography>
       </Grid> 
       <Grid item xs={1} className={classes.filterButton} >
         <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={handleChange} >
            <FilterList className={classes.extendedIcon} /> 
           
          </Fab>
       </Grid>
        </Grid>
        </div>
        <Collapse in={checked} >
          <Paper elevation={4} className={classes.filterButton}>
            <Filters />
          </Paper>
        </Collapse>
        {isLoading ? (
        <div>Loading ...</div>
      ) : (
       <Results vehicles={vehicles} />
      )}
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
      <Filters />    
      </Drawer>
    </div>
  );
}