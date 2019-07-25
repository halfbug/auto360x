import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import { updatePackage } from '../../../store/actions/packageActions'

class UpdatePackage extends Component {
    state = {
        is_active: false,
        title: '',
        price: 0,
        start_date: '2017-05-24',
        end_date: '2018-07-20',
        description: '',
    }

    static propTypes = {
        pkg: PropTypes.object.isRequired,
        updatePackage: PropTypes.func.isRequired
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log("text changed")
        // console.log(this.state.start_date)
        // console.log(moment( this.state.start_date).format("YYYY-MM-DD"))
        // console.log(this.state.end_date)
        // console.log(moment( this.state.end_date).format("YYYY-MM-DD"))
    };

    handleChange = name => event => {
        // console.log(this.state.checkedA)
        this.setState({ ...this.state, [name]: event.target.checked });

    };

    componentWillMount() {
        const pkg = this.props.history.location.state.pkg
        this.setState({
            is_active: pkg.is_active,
            title: pkg.title,
            price: pkg.price,
            start_date: moment(pkg.start_date).format("YYYY-MM-DD"),
            end_date: moment(pkg.end_date).format("YYYY-MM-DD"),
            description: pkg.description,
        })
        //  console.log("pre update", this.state.i)
    }

    onSubmit = e => {
        e.preventDefault();
        const id = this.props.history.location.state.pkg._id
        const updatedPackage = {
            is_active: this.state.is_active,
            title: this.state.title,
            price: this.state.price,
            start_date: moment(this.state.start_date).format("YYYY-MM-DD"),
            end_date: moment(this.state.end_date).format("YYYY-MM-DD"),
            description: this.state.description
        };

        // Update package via updatePackage action
        this.props.updatePackage(id, updatedPackage);
        // this.props.history.push('/packageManagement')
        //window.location.reload()
        //console.log("package added")
    }

    render() {
        //  console.log(this.props.history.location.state)
        // const pkg = this.props.history.location.state.pkg
        const { is_active, title, price, start_date, end_date, description } = this.state
        //  console.log(this.state)
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center", marginBottom: "20px" }}>
                    Update Package
                </Typography>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Title"
                                defaultValue={title}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="price"
                                name="price"
                                label="Price"
                                defaultValue={price}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="start_date"
                                label="Start date"
                                type="date"
                                name="start_date"
                                value={start_date}
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="end_date"
                                label="End date"
                                type="date"
                                name="end_date"
                                value={end_date}
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                defaultValue={description}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={is_active} onChange={this.handleChange('is_active')} value={is_active} />
                                    }
                                    label="Is active"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label htmlFor="outlined-button">
                                <Button type="submit" variant="outlined" >
                                    Update 
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </form>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => { this.props.history.push('/admin/package') }}>
                        Go back
                    </Button>
                </Grid>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    pkg: state.pkg
})

export default connect(mapStateToProps, { updatePackage })(UpdatePackage)