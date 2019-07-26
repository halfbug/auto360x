import React from 'react'
import ImageGrid from '../../components/ImageGrid'
import Sell from './../../store/reducers/sellReducer';
import {getSells} from './../../store/actions/sellActions';
import axios from 'axios';
import {serverURl} from '../../config/general'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    minHeight: "100vh",
    // maxWidth: 500,
  },
  image: {
    width: "100%",
    // height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    width: 150,
  },
}));


export default function Main(props) {
    const classes = useStyles();
    const [vehicle, setVehicle] = React.useState({});
    // const [state, dispatch] = React.useReducer(Sell);
    const [isLoading, setIsLoading] = React.useState(true);
    // console.log(props)
    // const id =props.match.params.id;
    const getById=(id=props.match.params.id)=>{
        // get all make
        axios.defaults.baseURL = serverURl;
        console.log("id")
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios
            .get(`/api/vehicles/${id}`)
            .then(res => {
              console.log(res.data[0]);
              // list["makes"]=res.data
              setVehicle(res.data[0])
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
         getById();
        //  getSells({type:"new"},dispatch);
        // makeRequest().then((res)=>{setIsLoading(false);})
        // console.log(status)
        // if(status === "useApiRequest/SUCCESS")
        // {
          
        //   console.log(response.data)
        // }
        },[]); // Pass empty array to only run once on mount.
      
    return (
       <div className={classes.root}>
      <Paper className={classes.paper}>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        
        <Grid container spacing={2} >
        <Grid item xs={12} >
        <Typography variant="h5" gutterBottom>
        
        {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}  {vehicle.style}  {vehicle.drivetype}
        
      </Typography>
          </Grid>
          <Grid item xs={12} lg={6} >
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={vehicle.make} 
              src={vehicle.front_view} />
            </ButtonBase>
          </Grid>
         
          <Grid item xs={12} lg={6} container>
            <Grid item xs={9} lg={9} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                 Listing Detail
                </Typography>
                <Grid item xs={12}  container>
                <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Estimate Price 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="body2" color="textSecondary">{vehicle.price} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Make 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="body2" color="textSecondary">{vehicle.make} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Model 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography color="textSecondary" variant="body2">{vehicle.model} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Trim 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography color="textSecondary" variant="body2">{vehicle.trim} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Year 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography color="textSecondary" variant="body2">{vehicle.year} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Body Style 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography color="textSecondary" variant="body2">{vehicle.style} </Typography>
            </Grid>
            <Grid item xs={6} lg={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                 Condition 
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography color="textSecondary" variant="body2">{vehicle.condition} </Typography>
            </Grid>
            
          </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
            <Button variant="outlined" color="primary" className={classes.button} >
            <MailIcon className={classes.extendedIcon} /> Message
      </Button>
      <Button variant="outlined" color="primary" className={classes.button} >
      <FavoriteIcon className={classes.extendedIcon} /> Save
      </Button>

      <Button variant="outlined" color="primary" className={classes.button} >
      <ShareIcon className={classes.extendedIcon} /> Share
      </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      </Paper>
    </div>
  );
}
