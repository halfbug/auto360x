import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { serverURl } from "../../../config/general";
import axios from "axios";
import { FormGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Input from "@material-ui/core/Input";
import { getVehicles, deleteVehicle, updateVehicle } from '../../../store/actions/vehicleActions'

class ViewVehicle extends Component {

    state = {
        isEditing: false,
        i: -1,
        makes: [],
        make: '',
        models: [],
        model: '',
        years: [],
        year: '',
        is_active: true
    }

    static propTypes = {
        vehicle: PropTypes.object.isRequired,
        getVehicles: PropTypes.func.isRequired,
        deleteVehicle: PropTypes.func.isRequired,
        updateVehicle: PropTypes.func.isRequired
    };

    componentDidMount() {
       const vehicles =  this.props.getVehicles();
        this.getAllMakes();
        this.getAllYears();
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
           // console.log(res.data);
    
            this.setState({
              ...this.state,
              models: res.data
            });
            //console.log(res.data);
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
         //   console.log("make : ", this.state.makes)
          })
    
          .catch(err =>
            //dispatch(returnErrors(err.response.data, err.response.status))
            console.log(err)
          );
      };
    
      getAllYears = (event) => {
        // get all make
       // console.log("fired")
      //  console.log("year : ", this.state.years)
        axios.defaults.baseURL = serverURl;
        axios
          .get("/api/detail/allyears")
          .then(res => {
            this.setState({
              ...this.state,
              years: res.data
            });
         //   console.log("years : ", this.state.years)
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
    

    onDeleteClick = id => {
        this.props.deleteVehicle(id);
    };

    onUpdateClick = (index, vehicle) => {
        this.props.history.push({ pathname: '/admin/updateVehicle', state: { index, vehicle } })
    }

    handleChange = name => event => {
        // console.log(this.state.checkedA)
        this.setState({ ...this.state, [name]: event.target.checked });
    
      };
    
    startEditing = (index, vehicle) => {
        this.setState({
            isEditing: true,
            i: index,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            is_active: vehicle.is_active
        })
        //  console.log("active", this.state.is_active)
    }

    stopEditing = (index, id) => {
        this.setState({
            i: index,
            isEditing: false
        })
        const editedVehicle = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            is_active: this.state.is_active,
        };

        // Update item via updateItem action
        this.props.updateVehicle(id, editedVehicle);
      //  console.log("active", this.state.is_active)
        window.location.reload()
    }

    cancelEditing = () => {
        this.setState({
            isEditing: false
        })
    }

    render() {
        const { isEditing, i, make, model, year, is_active, makes, models, years } = this.state
        const { vehicles } = this.props.vehicle
        console.log(vehicles)
        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "30px", fontSize: "25px", paddingTop: "10px", textAlign: "center" }}>
                        Vehicles
                    </Typography>
                    <Button variant="contained" style={{ marginLeft: "80%", marginBottom: "20px" }} onClick={() => { this.props.history.push('/admin/addVehicle') }}>
                        Add Vehicle  <AddIcon />
                    </Button>
                    <hr />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Make</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Is active</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vehicles.map((vehicle, index) => (
                                <TableRow key={vehicle._id}>
                                    <TableCell component="th" scope="row">
                                        {
                                            isEditing && i === index ?
                                                <FormGroup>
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
                                                        { makes.map(name => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormGroup> : vehicle.make
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                <FormGroup>
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
                                                        { models.map(name => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormGroup> : vehicle.model
                                        }
                                    </TableCell>
                                    <TableCell >
                                        {
                                            isEditing && i === index ?
                                                <FormGroup>
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
                                                </FormGroup> : vehicle.year
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={is_active} onChange={this.handleChange('is_active')} value="is_active" />
                                                        }
                                                    />
                                                </FormGroup> : vehicle.is_active.toString()        
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                (<div>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.stopEditing.bind(this, index, vehicle._id)} > check </i>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.cancelEditing.bind(this, index, vehicle._id)}> cancel </i>
                                                </div>) :
                                                <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.startEditing.bind(this, index, vehicle)}>edit</i>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="contained" size="small" onClick={this.onUpdateClick.bind(this, index, vehicle)}>View</Button>
                                    </TableCell>
                                    <TableCell>
                                        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this, vehicle._id)}>delete</i>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    vehicle: state.vehicle
})

export default withRouter(connect(mapStateToProps, { getVehicles, deleteVehicle, updateVehicle })(ViewVehicle));