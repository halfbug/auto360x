import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from "@material-ui/core/Input";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';
import axios from 'axios';
import ButtonBases from './../../../components/ButtonBasses';
import LinearProgress from '@material-ui/core/LinearProgress';
import frontimg from '../../../assets/images/front.png';
import backimg from '../../../assets/images/back.png';
import sideimg from '../../../assets/images/side.png';
import interiorimg from '../../../assets/images/interior.png'
import { serverURl } from "../../../config/general";
import { updateVehicle } from '../../../store/actions/vehicleActions'

class UpdateVehicle extends Component {
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
        year: '2019',
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
        isEditing: false
    }

    static propTypes = {
        vehicle: PropTypes.object.isRequired,
        updateVehicle: PropTypes.func.isRequired
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
        console.log(make);
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
        console.log("fired")
      //  console.log("make : ", this.state.makes)
        axios.defaults.baseURL = serverURl;
        axios
            .get("/api/detail/allmake")
            .then(res => {
                this.setState({
                    ...this.state,
                    makes: res.data
                });
                //   console.log("make : ", this.state.makes)
            })

            .catch(err =>
                //dispatch(returnErrors(err.response.data, err.response.status))
                console.log(err)
            );
    };

    getAllYears = (event) => {
        // get all make
     //   console.log("fired")
     //   console.log("year : ", this.state.years)
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
      //  console.log("fired")
      //  console.log("drivetypes : ", this.state.drivetypes)
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


    componentWillMount() {
        const { vehicle } = this.props.history.location.state
        console.log("vehicles", vehicle)
        this.setState({
            make: vehicle.make,
            seller_type: vehicle.seller_type,
            license_plate: vehicle.license_plate,
            transmission: vehicle.transmission,
            engine: vehicle.engine,
            milage_km: vehicle.milage_km,
            owner: vehicle.owner,
            model: vehicle.model,
            price: vehicle.price,
            package: vehicle.package,
            zip: vehicle.zip,
            interior_color: vehicle.interior_color,
            exterior_color: vehicle.exterior_color,
            is_active: vehicle.is_active,
            style: vehicle.style,
            posted_by: vehicle.posted_by,
            description: vehicle.description,
            year: vehicle.year,
            condition: vehicle.condition,
            drivetype: vehicle.drivetype,
            front_view: vehicle.front_view,
            back_view: vehicle.back_view,
            side_view: vehicle.side_view,
            interior_view: vehicle.interior_view,
        })
        //  console.log("pre update", this.state.i)
    }

    onSubmit = e => {
        e.preventDefault();
        const id = this.props.history.location.state.vehicle._id
        const {
            make,
            seller_type,
            license_plate,
            transmission,
            engine,
            milage_km,
            owner,
            model,
            price,
            zip,
            interior_color,
            exterior_color,
            is_active,
            style,
            posted_by,
            description,
            year,
            condition,
            drivetype,
            front_view,
            back_view,
            side_view,
            interior_view,
        } = this.state

        const updatedVehicle = {
            make,
            seller_type,
            license_plate,
            transmission,
            engine,
            milage_km,
            owner,
            model,
            price,
            zip,
            interior_color,
            exterior_color,
            is_active,
            style,
            posted_by,
            description,
            year,
            condition,
            drivetype,
            front_view,
            back_view,
            side_view,
            interior_view,
            package: this.state.package,
        };

        // Update vehicle via updateVehicle action
        this.props.updateVehicle(id, updatedVehicle);
    }

    render() {
        console.log(this.props.history.location.state)
        // const pkg = this.props.history.location.state.pkg
        const {
            isEditing,
            make,
            makes,
            seller_type,
            license_plate,
            transmission,
            engine,
            milage_km,
            owner,
            model,
            models,
            price,
            zip,
            interior_color,
            exterior_color,
            is_active,
            style,
            posted_by,
            description,
            year,
            years,
            condition,
            drivetypes,
            drivetype,
            front_view,
            back_view,
            side_view,
            interior_view,
            frontProgress,
            backProgress,
            sideProgress,
            interiorProgress
        } = this.state
        //  console.log(this.state)
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                    Vehicle
                </Typography>

                <Button color="primary" variant="contained" style={{ marginTop: "20px", marginBottom: "30px" }} onClick={() => { this.setState({ isEditing: true }) }}>
                    Edit 
                    </Button>

                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup>
                                    <InputLabel htmlFor="make">Make</InputLabel>
                                    <Select
                                        required
                                        name="make"
                                        id="make"
                                        value={make}
                                        onChange={this.handleSelectChange}
                                        input={<Input name="make" id="make" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {makes.map(name => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Make : <i><u>{make}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="seller_type"
                                    name="seller_type"
                                    label="Seller Type"
                                    defaultValue={seller_type}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Seller Type : <i><u>{seller_type}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="license_plate"
                                    label="License Plate"
                                    name="license_plate"
                                    defaultValue={license_plate}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>License Plate : <i><u>{license_plate}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="transmission"
                                    label="Transmission"
                                    name="transmission"
                                    defaultValue={transmission}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Transmission : <i><u>{transmission}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="engine"
                                    name="engine"
                                    label="Engine"
                                    defaultValue={engine}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Engine : <i><u>{engine}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="milage_km"
                                    name="milage_km"
                                    label="Mileage (KM)"
                                    defaultValue={milage_km}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Mileage (KM) : <i><u>{milage_km}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="owner"
                                    name="owner"
                                    label="Owner"
                                    defaultValue={owner}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Owner : <i><u>{owner}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup>
                                    <InputLabel htmlFor="model">Model</InputLabel>
                                    <Select
                                        required
                                        name="model"
                                        id="model"
                                        value={model}
                                        onChange={this.handleSelectChange}
                                        input={<Input name="model" id="model" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {models.map(name => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Model : <i><u>{model}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="price"
                                    name="price"
                                    label="Price"
                                    defaultValue={price}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Price : <i><u>{price}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="package"
                                    name="package"
                                    label="Package"
                                    defaultValue={this.state.package}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Package : <i><u>{this.state.package}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Zip"
                                    defaultValue={zip}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Zip : <i><u>{zip}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="interior_color"
                                    name="interior_color"
                                    label="Interior Color"
                                    defaultValue={interior_color}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Interior Color : <i><u>{interior_color}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="exterior_color"
                                    name="exterior_color"
                                    label="Exterior Color"
                                    defaultValue={exterior_color}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Exterior Color : <i><u>{exterior_color}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={is_active} onChange={this.handleChange('is_active')} value="is_active" />
                                        }
                                        label="Is active"
                                    />
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Is Active : <i><u>{is_active.toString()}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="style"
                                    name="style"
                                    label="Style"
                                    defaultValue={style}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Style : <i><u>{style}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="posted_by"
                                    name="posted_by"
                                    label="Posted by"
                                    defaultValue={posted_by}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Posted by : <i><u>{posted_by}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rowsMax="4"
                                    defaultValue={description}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Description : <i>{description}</i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup>
                                    <InputLabel htmlFor="year">Year</InputLabel>
                                    <Select
                                        required
                                        name="year"
                                        id="year"
                                        value={year}
                                        onChange={this.handleSelectChange}
                                        input={<Input name="year" id="year" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {years.map(name => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Year : <i><u>{year}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="condition"
                                    name="condition"
                                    label="Condition"
                                    defaultValue={condition}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Condition : <i><u>{condition}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup>
                                    <InputLabel htmlFor="drivetype">Drive type</InputLabel>
                                    <Select
                                        required
                                        name="drivetype"
                                        id="drivetype"
                                        value={drivetype}
                                        onChange={this.handleSelectChange}
                                        input={<Input name="drivetype" id="drivetype" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {drivetypes.map(name => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Drive type : <i><u>{drivetype}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                component="h4"
                                variant="subtitle1"
                                color="inherit"
                            >
                                Update Photos
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
                                    img={front_view}
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
                                id="back_view"
                                name="back_view"
                                multiple
                                type="file"
                                style={{ display: "none" }}
                                ref={rare => this.rare = rare}
                                onChange={this.handleImageUpload}
                            />
                            <label htmlFor="back_view">
                                <ButtonBases
                                    onClick={() => this.onButtonClick(this.rare)}
                                    title="Rare View"
                                    img={back_view}
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
                                id="side_view"
                                name="side_view"
                                multiple
                                type="file"
                                style={{ display: "none" }}
                                ref={side => this.side = side}
                                onChange={this.handleImageUpload}
                            />
                            <label htmlFor="side_view">
                                <ButtonBases
                                    onClick={() => this.onButtonClick(this.side)}
                                    title="Side View"
                                    img={side_view}
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
                                id="interior_view"
                                name="interior_view"
                                multiple
                                type="file"
                                style={{ display: "none" }}
                                ref={interior => this.interior = interior}
                                onChange={this.handleImageUpload}
                            />
                            <label htmlFor="interior_view">
                                <ButtonBases
                                    onClick={() => this.onButtonClick(this.interior)}
                                    title="Interior View"
                                    img={interior_view}
                                />
                                <LinearProgress color="secondary" variant="query" id="interior_view_progress"
                                    style={{
                                        display: `${interiorProgress}`,
                                    }}
                                />
                            </label>
                        </Grid>
                        {
                            isEditing ?
                                <Grid item xs={12} sm={12}>
                                    <label htmlFor="outlined-button">
                                        <Button type="submit" variant="outlined" style={{ marginRight: "10px" }} >
                                            Update 
                                        </Button>
                                    </label>
                                    <label htmlFor="outlined-button">
                                        <Button type="submit" variant="outlined" onClick={() => { this.setState({ isEditing: false }) }} >
                                            Cancel
                                        </Button>
                                    </label>
                                </Grid>
                                : null
                        }
                    </Grid>
                </form>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => { this.props.history.push('/admin/viewVehicle') }}>
                        Go back
                    </Button>
                </Grid>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    vehicle: state.vehicle
})

export default connect(mapStateToProps, { updateVehicle })(UpdateVehicle)