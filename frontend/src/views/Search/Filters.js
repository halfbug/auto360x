import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FilterList from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
// import InputBase from '@material-ui/core/InputBase';
import axios from "axios";
import { serverURl } from "../../config/general";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Fab from "@material-ui/core/Fab";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    position: "initial !important",
    marginTop: "-5px"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  formControl: {
    width: "100%",
    marginRight: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Filters() {
  const classes = useStyles();

  const [list, setList] = React.useState({
    makes: [],
    models: [],
    trims: [],
    styles: [],
    years: [],
    drivetypes: [],
    priceRange: [
      "17,000 - 20,000",
      "17,000 - 20,000",
      "17,000 - 20,000",
      "17,000 - 20,000"
    ]
  });
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [values, setValues] = React.useState({});

  const getModelByMakeYear = (make, year = 0) => {
    console.log(make);
    const url =
      year === 0
        ? `/api/detail/model/${make}`
        : `/api/detail/model/${make}/${year}`;
    axios.defaults.baseURL = serverURl;
    axios
      .get(url)
      .then(res => {
        // console.log(res.data);

        setList({
          ...list,
          models: res.data
        });
        // console.log(res.data);
        // console.log(lmake);
      })
      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  const getAllMakes = () => {
    // get all make
    axios.defaults.baseURL = serverURl;
    axios
      .get("/api/detail/allmake")
      .then(res => {
        setList({
          ...list,
          makes: res.data
        });
      })

      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  React.useEffect(() => {
    //get all make for car
    getAllMakes();
  }, []); // Pass empty array to only run once on mount.
  const handleChange = e => {
    if (e.target.name === "make") getModelByMakeYear(e.target.value);

    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

    // console.log(field)
    console.log(e.target);
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
        <Typography variant="h6" noWrap>
            Filter Search Results
          </Typography>
        </Box>
      </div>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <TextField
          id="zipcode"
          label="Zip Code"
          helperText="Search your near one"
          fullWidth
        />
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <FormControl className={classes.formControl}>
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
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select the make of your intrest</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
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
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select the model </FormHelperText>
        </FormControl>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <FormControl className={classes.formControl}>
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
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select the trim </FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="style">Body Style</InputLabel>
          <Select
            native
            value={values.style}
            onChange={handleChange}
            inputProps={{
              name: "style",
              id: "style"
            }}
          >
            <option value="" />
            {list.styles.map(name => (
              <option value="{name}">{name}</option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="from_year">From Year</InputLabel>
          <Select
            name="from_year"
            id="from_year"
            value={values.fromYear}
            onChange={handleChange}
            input={<Input name="from_year" id="from_year" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list.years.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="to_year">To Year</InputLabel>
          <Select 
            name="to_year"
            id="to_year"
            value={values.fromYear}
            onChange={handleChange}
            input={<Input name="to_year" id="to_year" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list.years.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="price_range">Price Range</InputLabel>
          <Select
            name="price_range"
            id="price_range"
            value={values.fromYear}
            onChange={handleChange}
            input={<Input name="price_range" id="price_range" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list.priceRange.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Fab variant="extended" aria-label="Delete" className={classes.fab}>
          <FilterList className={classes.extendedIcon} />
          Filter 
        </Fab>
      </Box>

    </React.Fragment>
  );
}
