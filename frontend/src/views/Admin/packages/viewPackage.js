import React, { Component, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'
import { getPackages, deletePackage, updatePackage } from '../../../store/actions/packageActions'
import { TextField } from '@material-ui/core';

class ViewPackage extends Component {
    state = {
        isEditing: false,
        i: -1,
        is_active: false,
        title: '',
        price: '',
        start_date: '2017-05-24',
        end_date: '2018-07-20',
        description: '',
    };

    static propTypes = {
        pkg: PropTypes.object.isRequired,
        getPackages: PropTypes.func.isRequired,
        deletePackage: PropTypes.func.isRequired,
        updatePackage: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getPackages();
    }

    onDeleteClick = id => {
        this.props.deletePackage(id);
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log("text changed", this.state.is_active)
        // console.log(this.state.title)
        // console.log(this.state.price)
        // console.log(this.state.start_date)
        // console.log(this.state.end_date)
        // console.log(this.state.description)
    }

    handleOnChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
       // console.log("r")
    };

    startEditing = (index, pkg) => {
        this.setState({
            isEditing: true,
            i: index,
            is_active: pkg.is_active,
            title: pkg.title,
            price: pkg.price,
            start_date: pkg.start_date,
            end_date: pkg.end_date,
            description: pkg.description,
        })
      //  console.log("active", this.state.is_active)
    }

    stopEditing = (index, id) => {
        this.setState({
            i: index,
            isEditing: false
        })
        const editedPackage = {
            is_active: this.state.is_active,
            title: this.state.title,
            price: this.state.price,
            start_date: moment(this.state.start_date).format("YYYY-MM-DD"),
            end_date: moment(this.state.end_date).format("YYYY-MM-DD"),
            description: this.state.description
        };

        // Update item via updateItem action
        this.props.updatePackage(id, editedPackage);
        console.log("active", this.state.is_active)
        window.location.reload()
    }

    cancelEditing = () => {
        this.setState({
            isEditing: false
        })
    }

    render() {
        const { isEditing, i, is_active } = this.state
        const { packages } = this.props.pkg

        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{marginTop: "30px", textAlign: "center"}}> 
                        View and Edit Package
                </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Is Active</TableCell>
                                <TableCell align="right">Created At</TableCell>
                                <TableCell>Edit Package</TableCell>
                                <TableCell>Delete Package</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages.map((pkg, index) => (
                                <TableRow key={pkg._id}>
                                    <TableCell component="th" scope="row">
                                        {isEditing && i === index ? <TextField id="title" name="title" defaultValue={pkg.title} onChange={this.handleChange} /> : pkg.title}
                                    </TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <TextField id="price" name="price" defaultValue={pkg.price} onChange={(e) => this.handleChange(e)} /> : pkg.price}</TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <TextField id="start_date" name="start_date" type="date" InputLabelProps={{ shrink: true }} defaultValue={moment(pkg.start_date).format("YYYY-MM-DD")} onChange={this.handleChange} /> : moment(pkg.start_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <TextField id="end_date" name="end_date" type="date" InputLabelProps={{ shrink: true }} defaultValue={moment(pkg.end_date).format("YYYY-MM-DD")} onChange={this.handleChange} /> : moment(pkg.end_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <TextField id="description" name="description" defaultValue={pkg.description} onChange={this.handleChange} /> : pkg.description}</TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <Checkbox checked={is_active} onChange={this.handleOnChange('is_active')} value={is_active} /> : pkg.is_active.toString()}</TableCell>
                                    <TableCell align="right">{isEditing && i === index ? <TextField id="create_at" name="create_at" type="date" InputLabelProps={{ shrink: true }} defaultValue={moment(pkg.create_at).format("YYYY-MM-DD")} onChange={this.handleChange} /> : moment(pkg.create_at).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                (<div>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.stopEditing.bind(this, index, pkg._id)} > check </i>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.cancelEditing.bind(this, index, pkg._id)}> cancel </i>
                                                </div>) :
                                                <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.startEditing.bind(this, index, pkg)}>edit</i>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this, pkg._id)}>delete</i>
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
    pkg: state.pkg
})

export default connect(mapStateToProps, { getPackages, deletePackage, updatePackage })(ViewPackage);