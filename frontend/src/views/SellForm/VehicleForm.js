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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ButtonBases from './../../components/ButtonBasses';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import frontimg from '../../assets/images/front.png';
import backimg from '../../assets/images/back.png';
import sideimg from '../../assets/images/side.png';
import interiorimg from '../../assets/images/interior.png'
import Sell from './../../store/reducers/sellReducer';
import {storeSell} from './../../store/actions/sellActions';
import { serverURl } from "../../config/general"




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
   chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    width : "100%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const featurez = [
  'Rearview Camera Sys',
  'Power Driver Seat',
  'Power Liftgate',
  'Navigation System',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function VehicleForm(props) { 
  const classes = useStyles();
  // const [values,setvalues] = React.useState({});
  const [lfeatures,setlfeatures] = React.useState([]);
  const errs = [] ;
  let target = "";
  // const notify= React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg] = React.useState("Some thing went wrong!");
  const [frontProgress,setFrontProgress] =  React.useState("none");
  const [backProgress,setBackProgress] = React.useState("none");
  const [sideProgress,setSideProgress] = React.useState("none");
  const [interiorProgress,setInteriorProgress] = React.useState("none");
  const [frontImg,setFrontImg] =  React.useState(frontimg);
  const [backImg,setBackImg] = React.useState(backimg);
  const [sideImg,setSideImg] = React.useState(sideimg);
  const [interiorImg,setInteriorImg] = React.useState(interiorimg);
  const [lmake, setLmake] = React.useState([]);




  // const notification = this.FieldEditor1.current;
  function display(message) {
    setOpen(true);
    setMsg(message);
  }

  const rare = React.useRef(null);
  const front = React.useRef(null);
   const side = React.useRef(null);
  const interior = React.useRef(null);
  const onButtonClick = (ref) => {
    console.log("inside")
    // `current` points to the mounted text input element
    ref.current.click();
  };
  const loadImg = (target,imgurl) => {
    console.log("updating uploaded image")
    switch(target){
      case "front_view":
          setFrontImg(imgurl);
        break;
      case "back_view":
          setBackImg(imgurl);
        break;
      case "side_view":
          setSideImg(imgurl);
            break;    
      case "interior_view":
          setInteriorImg(imgurl);
             break;
      default:
          break;
    }
  };

  function toggleProgress(target,op)
  {
    
    switch(target){
      case "front_view":
          
        setFrontProgress(op);
        break;
      case "back_view":
        setBackProgress(op);
        break;
      case "side_view":
            setSideProgress(op);
            break;    
      case "interior_view":
             setInteriorProgress(op);
             break;
      default:
          break;
    }
    
  }

  const handleImageUpload = (e) => {
    // console.log(e.target);
    console.log(`t=${e.target.id}, val = ${e.target.value}`)
    if (e.target.files && true){
      // console.log(e.target.files)
      // const image = e.target.files[0]
      // console.log(image)
      
      const files = Array.from(e.target.files)
      const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    if (files.length > 1) {
      const msg = 'Only 1 images can be uploaded at a time'
      // console.log(notify.current);
      return display(msg)
    }
    const file=files[0]
    if (types.every(type => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`)
    }

    if (file.size > 150000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`)
    }

    if(values[e.target.id] !== "")
    formData.append("delete_previous", values[e.target.id])
    else
    formData.append("delete_revious", false)

    formData.append([e.target.id], file)

    if (errs.length) {
      return errs.forEach(err => display(msg))
    }
    console.log(file)


    console.log('initiate progress')
    target=e.target.id;
      
    toggleProgress(target, "block")

      axios.post('http://localhost:5000/api/storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res,e) => {
           console.log(res) 
           console.log("finished Progress : "+res.data[0].url)
    
      
           loadImg(target, res.data[0].url)
      toggleProgress(target, "none")
      values[target] = res.data[0].public_id;
       // props.handleChange()
    })
    .catch(err => console.log(err))
  }
    
    
  };

  const handleFeatures = e => {
   
      setlfeatures(e.target.value);
      values[e.target.name]= e.target.value;
      
      
  }
 
  // React.useEffect(() => {
  //   if (values.length > 1) {
  //     console.log(values);
  //   } else {
  //     storeSell(values,dispatch);
  //     console.log(state);
  //   }
  // }, [state]);
 
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
 

  const { values, handleChange, list } = props;
  console.log( list)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Vehicle Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          
          <FormControl className={classes.formControl} >
        <InputLabel htmlFor="make">Make</InputLabel>
        <Select 
        name="make"
        id="make"
          value={values.make}
          onChange={handleChange}
          input={<Input name="make" id="make" />}
          
         required
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
        <FormHelperText>Select the make of your vehicle</FormHelperText>
      </FormControl>


        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="year">year</InputLabel>
        <Select 
        name="year"
        id="year"
          value={values.year}
          onChange={handleChange}
          input={<Input name="year" id="year" />}
          
         required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.years.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
          
        </Select>
        <FormHelperText>Select the year </FormHelperText>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="model">Model</InputLabel>
        <Select 
        name="model"
        id="model"
          value={values.model}
          onChange={handleChange}
          input={<Input name="model" id="model" />}
          
         
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
        <FormHelperText>Select the model </FormHelperText>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl} >
        <InputLabel htmlFor="trim">Trim</InputLabel>
        <Select 
        name="trim"
        id="trim"
          value={values.trim}
          onChange={handleChange}
          input={<Input name="trim" id="trim" />}
          
         
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.trims.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
          
        </Select>
        <FormHelperText>Select the trim </FormHelperText>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl}  fullWidth>
        <InputLabel htmlFor="transmission">transmission</InputLabel>
        <Select
          native
          value={values.transmission}
          onChange={handleChange}
          inputProps={{
            name: 'transmission',
            id: 'transmission',
          }}
         
        >
          <option value="" />
         
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>  
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChange}  id="engine" name="engine" 
          label="Engine Type" 
          fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChange} 
            required
            id="mileage"
            name="mileage"
            label="Mileage (KM)"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <FormControl className={classes.formControl}  fullWidth>
        <InputLabel htmlFor="style">Body Style</InputLabel>
        <Select
          native
          value={values.style}
          onChange={handleChange}
          inputProps={{
            name: 'style',
            id: 'style',
          }}
         
        >
          <option value="" />
          {list.styles.map(name => (
            <option value="{name}">{name}</option>
           
          ))}
          {/* <option value="car">Car</option> 
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="coupe">Coupe</option>
          <option value="convertible">Convertible</option>
          <option value="hatchback">Hatchback</option>
          <option value="wagon">Wagon</option>  */}
        </Select>
      </FormControl>  


        </Grid>
        <Grid item xs={12} sm={6}>
          
          <FormControl className={classes.formControl}  fullWidth>
        <InputLabel htmlFor="drivetype">Drive Type</InputLabel>
        <Select
          native
          value={values.drivetype}
          onChange={handleChange}
          inputProps={{
            name: 'drivetype',
            id: 'drivetype',
          }}
         
        >
          <option value="" />
          {list.drivetypes.map(name => (
            <option value="{name}">{name}</option>
           
          ))}
         
        </Select>
      </FormControl>


        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChange} 
            required
            id="exterior_color"
            name="exterior_color"
            label="Exterior Color"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChange} 
            required
            id="interior_color"
            name="interior_color"
            label="Interior Color"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="features">More Features</InputLabel>
        <Select
          multiple
          name="features"
          id="features"
          value={lfeatures}
          onChange={handleFeatures}
          input={<Input id="features" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {featurez.map(name => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
           <Typography
              component="h4"
              variant="subtitle1"
              color="inherit"
             
            >
              Upload Photos
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
       
          <input
        accept="image/*"
        className={classes.input}
        id="front_view"
        multiple
        type="file"
        ref={front}
        onChange={handleImageUpload}
      />
      <label htmlFor="fornt_view">
       
        <ButtonBases 
        title ="Front View"
        onClick={()=>onButtonClick(front)}
        img= {frontImg}
        />
        <LinearProgress color="secondary" variant="query" id="front_view_progress" 
        style={{
              display: `${frontProgress}`,
            }}
         />
      </label>


        </Grid>
        <Grid item xs={12} sm={6}>
         <input
        accept="image/*"
        className={classes.input}
        id="back_view"
        multiple
        type="file"
        ref={rare}
        onChange={handleChange}
      />
      <label htmlFor="back_view">
        {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
        <ButtonBases
        onClick={()=>onButtonClick(rare)}
        title ="Rare View"
        img={backImg}
        />
        <LinearProgress color="secondary" variant="query" id="rare_view_progress" style={{
              display: `${backProgress}`,
            }}
 />
      </label>


        </Grid>

      {/* side view */}
      <Grid item xs={12} sm={6}>
         <input
        accept="image/*"
        className={classes.input}
        id="side_view"
        multiple
        type="file"
        ref={side}
        onChange={handleChange}
      />
      <label htmlFor="side_view">
        {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
        <ButtonBases
        onClick={()=>onButtonClick(side)}
        title ="Side View"
        img = {sideImg}
        />
        <LinearProgress color="secondary" variant="query" id="side_view_progress" 
        style={{
              display: `${sideProgress}`,
            }}
 />
      </label>


        </Grid>
        {/* interior view */}
        <Grid item xs={12} sm={6}>
         <input
        accept="image/*"
        className={classes.input}
        id="interior_view"
        multiple
        type="file"
        ref={interior}
        onChange={handleChange}
      />
      <label htmlFor="interior_view">
        {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
        <ButtonBases
        onClick={()=>onButtonClick(interior)}
        title ="Interior View"
        img ={interiorImg}
        />
        <LinearProgress color="secondary" variant="query" id="interior_view_progress" 
        style={{
              display: `${interiorProgress}`,
            }}
 />
      </label>


        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={msg}
        action={[
          
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

    </React.Fragment>
  );
}
