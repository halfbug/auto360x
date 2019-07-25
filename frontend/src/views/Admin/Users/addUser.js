import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import { addUser } from '../../../store/actions/userActions'
import swal from 'sweetalert';
import Axios from 'axios';

class AddUser extends Component {
    state = {
        fullname: '',
        email: '',
        password: '',
        avatar: '',
        status: 'Pending',
        last_login: '2017-05-24',
        roles: 'Anonymous',
        phone_number: 0,
        address: '',
        geo_location: '',
        website: '',
        description: '',
        company_logo: '',
        company_name: '',
        avatarImage: null,
        avatarSize: 0,
        avatarType: '',
        company_logoImage: null,
        logoSize: 0,
        logoType: '',
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        addUser: PropTypes.func.isRequired
    };

    handleChange = (event) => {
        this.setState(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log("status is ", this.state.status)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("text changed")
        // console.log(this.state.start_date)
        // console.log(moment( this.state.start_date).format("YYYY-MM-DD"))
        // console.log(this.state.end_date)
        // console.log(moment( this.state.end_date).format("YYYY-MM-DD"))
    };

    avatarSelectedHandler = e => {
        this.setState({
            avatarImage: e.target.files[0],
            avatarSize: e.target.files[0].size,
            avatarType: e.target.files[0].type,

        })
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
        //  console.log(e.target.id)
    }

    logoSelectedHandler = e => {
        this.setState({
            company_logoImage: e.target.files[0],
            logoSize: e.target.files[0].size,
            logoType: e.target.files[0].type,

        })
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
        //  console.log(e.target.id)
    }

    onSubmit = e => {
        const { password, avatarSize, avatarType, logoSize, logoType } = this.state
        e.preventDefault();
        if (password.length < 6) {
            swal("Password must be atleast 6 characters long")
        }
        else if ((avatarType && logoType) !== ('image/jpeg' || 'image/jpg' || 'image/png')) {
            swal("This is not a supported image format!")
        }
        else if ((avatarSize && logoSize) > 1000000) {
            swal("File size is too large, please pick a smaller file!")
        }

        else {
            const fdAvatar = new FormData()
            fdAvatar.append('avatar', this.state.avatarImage, this.state.avatarImage.name)

            const fdLogo = new FormData()
            fdLogo.append('company_logo', this.state.company_logoImage, this.state.company_logoImage.name)

            Axios.post('http://localhost:5000/api/storage', fdAvatar, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res, e) => {
                console.log(res)
                console.log("pre setState id : " + res.data[0].public_id)
                console.log("finished Progress : " + res.data[0].url)

                this.setState({
                    avatar: res.data[0].url
                })
                console.log("post setState image id : " + this.state.avatar)

                Axios.post('http://localhost:5000/api/storage', fdLogo, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res, e) => {
                    console.log(res)
                    console.log("pre setState id : " + res.data[0].public_id)
                    console.log("finished Progress : " + res.data[0].url)

                    this.setState({
                        company_logo: res.data[0].url
                    })
                    console.log("post setState image id : " + this.state.company_logo)

                    const newUser = {
                        email: this.state.email,
                        fullname: this.state.fullname,
                        password: this.state.password,
                        last_login: this.state.last_login,
                        status: this.state.status,
                        avatar: this.state.avatar,
                        roles: this.state.roles,
                        phone_number: this.state.phone_number,
                        address: this.state.address,
                        geo_location: this.state.geo_location,
                        website: this.state.website,
                        description: this.state.description,
                        company_name: this.state.company_name,
                        company_logo: this.state.company_logo
                    };
                    // Add user via addItem action

                    this.props.addUser(newUser);
                    console.log("user added", this.state)

                }).catch(err => {
                    swal("Error adding user!")
                    console.log(err)
                })
            })
                .catch(err => {
                    swal("Error adding user!")
                    console.log(err)
                })
        }
    };


    render() {
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                    Add User
                </Typography>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="fullname"
                                name="fullname"
                                label="Full name"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                component="h4"
                                variant="subtitle1"
                                color="inherit"

                            >
                                Avatar
                            </Typography>
                            <input
                                 accept="image/*"
                                type="file"
                                name="avatarImage"
                                onChange={this.avatarSelectedHandler}
                            //ref={fileInput => this.fileInput = fileInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <InputLabel htmlFor="status-simple">Status</InputLabel>
                                <Select
                                    required
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'status',
                                        id: 'status-simple',
                                    }}
                                >
                                    <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"Active"}>Active</MenuItem>
                                    <MenuItem value={"Blocked"}>Blocked</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <InputLabel htmlFor="status-simple">Role</InputLabel>
                                <Select
                                    required
                                    value={this.state.roles}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'roles',
                                        id: 'roles-simple',
                                    }}
                                >
                                    <MenuItem value={"Super Admin"}>Super Admin</MenuItem>
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"Individual"}>Individual</MenuItem>
                                    <MenuItem value={"Dealer"}>Dealer</MenuItem>
                                    <MenuItem value={"Anonymous"}>Anonymous</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="phone_number"
                                name="phone_number"
                                label="Phone number"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="address"
                                name="address"
                                label="Address"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="geo_location"
                                name="geo_location"
                                label="Geo location"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="website"
                                name="website"
                                label="Website"
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
                            <TextField
                                required
                                id="company_name"
                                name="company_name"
                                label="Company name"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                component="h4"
                                variant="subtitle1"
                                color="inherit"

                            >
                                Company logo
                            </Typography>
                            <input
                                 accept="image/*"
                                type="file"
                                name="company_logoImage"
                                onChange={this.logoSelectedHandler}
                            //ref={fileInput => this.fileInput = fileInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/* {
                                ((this.state.imageType !== 'image/png') || (this.state.imageType !== 'image/jpeg') || (this.state.imageType !== 'image/jpg')) ? 
                                <UncontrolledAlert color="danger">Please choose correct file type!</UncontrolledAlert> : null
                            } */}
                            <label htmlFor="outlined-button">
                                <Button type="submit" variant="outlined" >
                                    Add User <AddIcon />
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </form>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => { this.props.history.push('/admin/viewUser') }}>
                        Go back
                    </Button>
                </Grid>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, { addUser })(AddUser)