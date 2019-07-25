import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from "@material-ui/core/Input";
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import axios from "axios";
import ButtonBases from './../../../components/ButtonBasses';
import LinearProgress from '@material-ui/core/LinearProgress';
import frontimg from '../../../assets/images/front.png';
import backimg from '../../../assets/images/back.png';
import sideimg from '../../../assets/images/side.png';
import interiorimg from '../../../assets/images/interior.png'
import { serverURl } from "../../../config/general";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addVehicle } from '../../../store/actions/vehicleActions';
import swal from 'sweetalert';

class AddVehicle extends Component {
  state = {
    makes: [],
    make: '',
    seller_type: '',
    license_plate: '',
    transmission: '',
    engine: '',
    milage_km: '',
    owner: '',
    models: [],
    model: '',
    price: 0,
    package: '',
    zip: 0,
    interior_color: '',
    exterior_color: '',
    is_active: true,
    style: '',
    posted_by: '',
    description: '',
    years: [],
    year: '',
    condition: '',
    drivetypes: [],
    drivetype: '',
    frontProgress: 'none',
    backProgress: 'none',
    sideProgress: 'none',
    interiorProgress: 'none',
    front_view: frontimg,
    back_view: backimg,
    side_view: sideimg,
    interior_view: interiorimg,
    target: "",
  }

  static propTypes = {
    vehicle: PropTypes.object.isRequired,
    addVehicle: PropTypes.func.isRequired,
  };

  onButtonClick = (view) => {
    console.log("inside")
    view.click();
  }

  loadImg = (target, imgurl) => {
    console.log("updating uploaded image")
    switch (target) {
      case "front_view":
        this.setState({
          front_view: imgurl
        })
        break;
      case "back_view":
        this.setState({
          back_view: imgurl
        })
        break;
      case "side_view":
        this.setState({
          side_view: imgurl
        })
        break;
      case "interior_view":
        this.setState({
          interior_view: imgurl
        })
        break;
      default:
        break;
    }
  };

  toggleProgress(target, op) {

    switch (target) {
      case "front_view":
        this.setState({
          frontProgress: op
        })
        break;
      case "back_view":
        this.setState({
          backProgress: op
        })
        break;
      case "side_view":
        this.setState({
          sideProgress: op
        })
        break;
      case "interior_view":
        this.setState({
          interiorProgress: op
        })
        break;
      default:
        break;
    }

  }

  handleImageUpload = (e) => {
    console.log(`t=${e.target.id}, val = ${e.target.value}`)
    if (e.target.files && true) {

      const files = Array.from(e.target.files)
      const types = ['image/png', 'image/jpeg', 'image/gif']

      if (files.length > 1) {
        swal('Only 1 images can be uploaded at a time')
      }

      const file = files[0]
      if (types.every(type => file.type !== type)) {
        swal(`'${file.type}' is not a supported format`)
      }

      const formData = new FormData()
      if ([e.target.id] !== "")
        formData.append("delete_previous", [e.target.id])
      else
        formData.append("delete_revious", false)

      formData.append([e.target.id], file)

      console.log(file)


      console.log('initiate progress')
      this.state.target = e.target.id;
      console.log()
      this.toggleProgress(this.state.target, "block")
      axios.defaults.baseURL = serverURl;

      axios.post('/api/storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res, e) => {
        console.log(res)
        console.log("finished Progress : " + res.data[0].url)
        this.loadImg(this.state.target, res.data[0].url)
        console.log("state value of image:", this.state.target)
        this.toggleProgress(this.state.target, "none")

      })
        .catch(err => console.log("err", err))
    }
  };


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("text changed")
    // console.log(this.state.start_date)
  };

  handleChange = name => event => {
    // console.log(this.state.checkedA)
    this.setState({ ...this.state, [name]: event.target.checked });

  };

  componentDidMount() {
    this.getAllMakes();
    this.getAllYears();
    this.getAllDriveTypes();
  }

  getModelByMakeYear = (make, year = 0) => {
   // console.log(make);
    const url =
      year === 0
        ? `/api/detail/model/${make}`
        : `/api/detail/model/${make}/${year}`;
    axios.defaults.baseURL = serverURl;
    axios
      .get(url)
      .then(res => {
      //  console.log(res.data);

        this.setState({
          ...this.state,
          models: res.data
        });
      //  console.log(res.data);
      //  console.log(this.state.makes);
      })
      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  getAllMakes = (event) => {
    // get all make
   // console.log("fired")
   // console.log("make : ", this.state.makes)
    axios.defaults.baseURL = serverURl;
    axios
      .get("/api/detail/allmake")
      .then(res => {
        this.setState({
          ...this.state,
          makes: res.data
        });
      //  console.log("make : ", this.state.makes)
      })

      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  getAllYears = (event) => {
    // get all make
   // console.log("fired")
   // console.log("year : ", this.state.years)
    axios.defaults.baseURL = serverURl;
    axios
      .get("/api/detail/allyears")
      .then(res => {
        this.setState({
          ...this.state,
          years: res.data
        });
      //  console.log("years : ", this.state.years)
      })

      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  getAllDriveTypes = (event) => {
    // get all make
   // console.log("fired")
   // console.log("drivetypes : ", this.state.drivetypes)
    axios.defaults.baseURL = serverURl;
    axios
      .get("/api/detail/drivetypes")
      .then(res => {
        this.setState({
          ...this.state,
          drivetypes: res.data
        });
       // console.log("drivetype : ", this.state.drivetypes)
      })

      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))
        console.log(err)
      );
  };

  handleSelectChange = e => {
    if (e.target.name === "make") this.getModelByMakeYear(e.target.value);
    this.setState(oldValues => ({
      ...oldValues,
      //...this.state.values,
      [e.target.name]: e.target.value,
    }));
    //  console.log('value.make', this.state.values.make)
    console.log(e.target);
  };


  onSubmit = e => {
    e.preventDefault();
    const newVehicle = {
      make: this.state.make,
      seller_type: this.state.seller_type,
      license_plate: this.state.license_plate,
      transmission: this.state.transmission,
      engine: this.state.engine,
      milage_km: this.state.milage_km,
      owner: this.state.owner,
      model: this.state.model,
      price: this.state.price,
      package: this.state.package,
      zip: this.state.zip,
      interior_color: this.state.interior_color,
      exterior_color: this.state.exterior_color,
      is_active: this.state.is_active,
      style: this.state.style,
      posted_by: this.state.posted_by,
      description: this.state.description,
      year: this.state.year,
      front_view: this.state.front_view,
      back_view: this.state.back_view,
      side_view: this.state.side_view,
      interior_view: this.state.interior_view,
      condition: this.state.condition,
      drivetype: this.state.drivetype,
    };

    // Add item via addItem action
    this.props.addVehicle(newVehicle);

  };

  render() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
          Add Vehicle
        </Typography>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <InputLabel htmlFor="make">Make</InputLabel>
                <Select
                  required
                  name="make"
                  id="make"
                  value={this.state.make}
                  onChange={this.handleSelectChange}
                  input={<Input name="make" id="make" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.makes.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="seller_type"
                name="seller_type"
                label="Seller Type"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="license_plate"
                label="License Plate"
                name="license_plate"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="transmission"
                label="Transmission"
                name="transmission"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="engine"
                name="engine"
                label="Engine"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="milage_km"
                name="milage_km"
                label="Mileage (KM)"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="owner"
                name="owner"
                label="Owner"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <InputLabel htmlFor="model">Model</InputLabel>
                <Select
                  required
                  name="model"
                  id="model"
                  value={this.state.model}
                  onChange={this.handleSelectChange}
                  input={<Input name="model" id="model" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.models.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="package"
                name="package"
                label="Package"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="interior_color"
                name="interior_color"
                label="Interior Color"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="exterior_color"
                name="exterior_color"
                label="Exterior Color"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.is_active} onChange={this.handleChange('is_active')} value="is_active" />
                  }
                  label="Is active"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="style"
                name="style"
                label="Style"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="posted_by"
                name="posted_by"
                label="Posted by"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                multiline
                rowsMax="4"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                  required
                  name="year"
                  id="year"
                  value={this.state.year}
                  onChange={this.handleSelectChange}
                  input={<Input name="year" id="year" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.years.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="condition"
                name="condition"
                label="Condition"
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <InputLabel htmlFor="drivetype">Drive type</InputLabel>
                <Select
                  required
                  name="drivetype"
                  id="drivetype"
                  value={this.state.drivetype}
                  onChange={this.handleSelectChange}
                  input={<Input name="drivetype" id="drivetype" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.drivetypes.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
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
                id="front_view"
                name="front_view"
                multiple
                type="file"
                style={{ display: "none" }}
                ref={front => this.front = front}
                onChange={this.handleImageUpload}
              />
              <label htmlFor="front_view">

                <ButtonBases
                  title="Front View"
                  onClick={() => this.onButtonClick(this.front)}
                  img={this.state.front_view}
                />
                <LinearProgress color="secondary" variant="query" id="front_view_progress"
                  style={{
                    display: `${this.state.frontProgress}`,
                  }}
                />
              </label>


            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                id="back_view"
                name="back_view"
                multiple
                type="file"
                style={{ display: "none" }}
                ref={rare => this.rare = rare}
                onChange={this.handleImageUpload}
              />
              <label htmlFor="back_view">
                {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
                <ButtonBases
                  onClick={() => this.onButtonClick(this.rare)}
                  title="Rare View"
                  img={this.state.back_view}
                />
                <LinearProgress color="secondary" variant="query" id="rare_view_progress" style={{
                  display: `${this.state.backProgress}`,
                }}
                />
              </label>


            </Grid>

            {/* side view */}
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                id="side_view"
                name="side_view"
                multiple
                type="file"
                style={{ display: "none" }}
                ref={side => this.side = side}
                onChange={this.handleImageUpload}
              />
              <label htmlFor="side_view">
                {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
                <ButtonBases
                  onClick={() => this.onButtonClick(this.side)}
                  title="Side View"
                  img={this.state.side_view}
                />
                <LinearProgress color="secondary" variant="query" id="side_view_progress"
                  style={{
                    display: `${this.state.sideProgress}`,
                  }}
                />
              </label>


            </Grid>
            {/* interior view */}
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                id="interior_view"
                name="interior_view"
                multiple
                type="file"
                style={{ display: "none" }}
                ref={interior => this.interior = interior}
                onChange={this.handleImageUpload}
              />
              <label htmlFor="interior_view">
                {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
                <ButtonBases
                  onClick={() => this.onButtonClick(this.interior)}
                  title="Interior View"
                  img={this.state.interior_view}
                />
                <LinearProgress color="secondary" variant="query" id="interior_view_progress"
                  style={{
                    display: `${this.state.interiorProgress}`,
                  }}
                />
              </label>
            </Grid>

            <Grid item xs={12} sm={12}>
              <label htmlFor="outlined-button">
                <Button type="submit" variant="outlined" >
                  Add Vehicle <AddIcon />
                </Button>
              </label>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => { this.props.history.push('/admin/viewVehicle') }}>
            Go back
          </Button>
        </Grid>
      </Fragment >
    );
  }

}

const mapStateToProps = (state) => ({
  vehicle: state.vehicle,
})

export default connect(mapStateToProps, { addVehicle })(AddVehicle)