import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';
import Axios from 'axios';
import { updateUser } from '../../../store/actions/userActions'

class UpdateUser extends Component {
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
        isEditing: false,
        is_avatar_uploaded: false,
        is_logo_uploaded: false
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        updateUser: PropTypes.func.isRequired
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

    componentWillMount() {
        const { user } = this.props.history.location.state
        this.setState({
            fullname: user.fullname,
            email: user.email,
            status: user.status,
            roles: user.roles,
            last_login: moment(user.last_login).format("YYYY-MM-DD"),
            password: user.password,
            avatar: user.avatar,
            phone_number: user.phone_number,
            address: user.address,
            geo_location: user.geo_location,
            website: user.website,
            description: user.description,
            company_name: user.company_name,
            company_logo: user.company_logo
        })
        //  console.log("pre update", this.state.i)
    }

    avatarSelectedHandler = e => {
        this.setState({
            avatarImage: e.target.files[0],
            avatarSize: e.target.files[0].size,
            avatarType: e.target.files[0].type,
            is_avatar_uploaded: true
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
            is_logo_uploaded: true
        })
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
        //  console.log(e.target.id)
    }

    onSubmit = e => {
        e.preventDefault();
        const { password, avatarSize, avatarType, logoSize, logoType, is_avatar_uploaded, is_logo_uploaded } = this.state
        const id = this.props.history.location.state.user._id

        if (is_avatar_uploaded && !is_logo_uploaded) {

            if (password.length < 6) {
                swal("Password must be atleast 6 characters long")
            }

            else if (avatarType !== ('image/jpeg' || 'image/jpg' || 'image/png')) {
                swal("This is not a supported image format!")
            }
            else if (avatarSize > 1000000) {
                swal("File size is too large, please pick a smaller file!")
            }

            else {
                const fdAvatar = new FormData()
                fdAvatar.append('avatar', this.state.avatarImage, this.state.avatarImage.name)
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

                    const updatedUser = {
                        fullname: this.state.fullname,
                        status: this.state.status,
                        roles: this.state.roles,
                        password: this.state.password,
                        avatar: this.state.avatar,
                        last_login: moment(this.state.last_login).format("YYYY-MM-DD"),
                        phone_number: this.state.phone_number,
                        address: this.state.address,
                        geo_location: this.state.geo_location,
                        website: this.state.website,
                        description: this.state.description,
                        company_name: this.state.company_name,
                        company_logo: this.state.company_logo
                    };

                    // Update user via updateUser action    
                    this.props.updateUser(id, updatedUser);
                    console.log("user added", this.state)

                })
                    .catch(err => {
                        swal("Error adding user!")
                        console.log(err)
                    })

            }
        }
        else if(is_logo_uploaded && !is_avatar_uploaded) {

            if (password.length < 6) {
                swal("Password must be atleast 6 characters long")
            }

            else if (logoType !== ('image/jpeg' || 'image/jpg' || 'image/png')) {
                swal("This is not a supported image format!")
            }
            else if (logoSize > 1000000) {
                swal("File size is too large, please pick a smaller file!")
            }

            else {
                const fdLogo = new FormData()
                fdLogo.append('company_logo', this.state.company_logoImage, this.state.company_logoImage.name)
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

                    const updatedUser = {
                        fullname: this.state.fullname,
                        status: this.state.status,
                        roles: this.state.roles,
                        password: this.state.password,
                        avatar: this.state.avatar,
                        last_login: moment(this.state.last_login).format("YYYY-MM-DD"),
                        phone_number: this.state.phone_number,
                        address: this.state.address,
                        geo_location: this.state.geo_location,
                        website: this.state.website,
                        description: this.state.description,
                        company_name: this.state.company_name,
                        company_logo: this.state.company_logo
                    };

                    // Update user via updateUser action    
                    this.props.updateUser(id, updatedUser);
                    console.log("user added", this.state)
                })
                    .catch(err => {
                        swal("Error adding user!")
                        console.log(err)
                    })

            }
        }
        else if(is_avatar_uploaded && is_logo_uploaded) {

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

                    const fdLogo = new FormData()
                    fdLogo.append('company_logo', this.state.company_logoImage, this.state.company_logoImage.name)
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

                        const updatedUser = {
                            fullname: this.state.fullname,
                            status: this.state.status,
                            roles: this.state.roles,
                            password: this.state.password,
                            avatar: this.state.avatar,
                            last_login: moment(this.state.last_login).format("YYYY-MM-DD"),
                            phone_number: this.state.phone_number,
                            address: this.state.address,
                            geo_location: this.state.geo_location,
                            website: this.state.website,
                            description: this.state.description,
                            company_name: this.state.company_name,
                            company_logo: this.state.company_logo
                        };

                        // Update user via updateUser action    
                        this.props.updateUser(id, updatedUser);
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
        }
        else {
            const updatedUser = {
                fullname: this.state.fullname,
                status: this.state.status,
                roles: this.state.roles,
                password: this.state.password,
                avatar: this.state.avatar,
                last_login: moment(this.state.last_login).format("YYYY-MM-DD"),
                phone_number: this.state.phone_number,
                address: this.state.address,
                geo_location: this.state.geo_location,
                website: this.state.website,
                description: this.state.description,
                company_name: this.state.company_name,
                company_logo: this.state.company_logo
            };

            // Update user via updateUser action
            this.props.updateUser(id, updatedUser);
        }
    }

    render() {
        console.log(this.props.history.location.state)
        // const pkg = this.props.history.location.state.pkg
        const {
            fullname,
            email,
            password,
            avatar,
            status,
            last_login,
            roles,
            phone_number,
            address,
            geo_location,
            website,
            description,
            company_logo,
            company_name,
            isEditing } = this.state
        //  console.log(this.state)
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                    User
                </Typography>

                <Button color="primary" variant="contained" style={{ marginTop: "20px", marginBottom: "30px" }} onClick={() => { this.setState({ isEditing: true }) }}>
                    Edit User
                    </Button>

                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="fullname"
                                    name="fullname"
                                    label="Full name"
                                    defaultValue={fullname}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Full name : <i><u>{fullname}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {(<p style={{ fontSize: "17px" }}>Email : <i><u>{email}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    defaultValue={password}
                                    type="password"
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Password : <i><u>{password}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="last_login"
                                    label="Last login"
                                    type="date"
                                    name="last_login"
                                    value={last_login}
                                    onChange={this.onChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /> : (<p style={{ fontSize: "17px" }}>Last login : <i><u>{last_login}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {isEditing ?
                                (
                                    <div>
                                        <Typography
                                            component="h4"
                                            variant="subtitle1"
                                            color="inherit"
                                        >
                                            Update Avatar
                                        </Typography>
                                        <input
                                            //style={{  }}
                                            type="file"
                                            name="avatarImage"
                                            onChange={this.avatarSelectedHandler}
                                        //ref={fileInput => this.fileInput = fileInput}
                                        />
                                    </div>) :
                                (<div>
                                    <Typography
                                        component="h4"
                                        variant="subtitle1"
                                        color="inherit"

                                    >
                                        Avatar
                                    </Typography>
                                    <div style={{ width: "200px", height: "200px", marginBottom: "10px" }}>
                                        <img src={avatar} style={{ width: "100%", height: "100%" }} />
                                    </div>
                                </div>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <FormGroup>
                                    <InputLabel htmlFor="status-simple">Status</InputLabel>
                                    <Select
                                        required
                                        value={status}
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
                                </FormGroup> : (<p style={{ fontSize: "17px" }}>Status : <i><u>{status}</u></i></p>)

                            }

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                                isEditing ?
                                    <FormGroup>
                                        <InputLabel htmlFor="status-simple">Role</InputLabel>
                                        <Select
                                            required
                                            value={roles}
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
                                    </FormGroup> : (<p style={{ fontSize: "17px" }}>Role : <i><u>{roles}</u></i></p>)
                            }

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                                isEditing ?
                                    <TextField
                                        required
                                        id="phone_number"
                                        name="phone_number"
                                        label="Phone number"
                                        defaultValue={phone_number}
                                        onChange={this.onChange}
                                        fullWidth
                                    /> : (<p style={{ fontSize: "17px" }}>Phone number : <i><u>{phone_number}</u></i></p>)
                            }

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                                isEditing ?
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        defaultValue={address}
                                        onChange={this.onChange}
                                        fullWidth
                                    /> : (<p style={{ fontSize: "17px" }}>Address : <i><u>{address}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="geo_location"
                                    name="geo_location"
                                    label="Geo location"
                                    defaultValue={geo_location}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Geo location : <i><u>{geo_location}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="website"
                                    name="website"
                                    label="Website"
                                    defaultValue={website}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Website : <i><u>{website}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    label="Description"
                                    defaultValue={description}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Description : <i><u>{description}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isEditing ?
                                <TextField
                                    required
                                    id="company_name"
                                    name="company_name"
                                    label="Company name"
                                    defaultValue={company_name}
                                    onChange={this.onChange}
                                    fullWidth
                                /> : (<p style={{ fontSize: "17px" }}>Company name : <i><u>{company_name}</u></i></p>)}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                isEditing ? (
                                    <div>
                                        <Typography
                                            component="h4"
                                            variant="subtitle1"
                                            color="inherit"
                                        >
                                            Update Logo
                                        </Typography>
                                        <input
                                            //style={{  }}
                                            type="file"
                                            name="company_logoImage"
                                            onChange={this.logoSelectedHandler}
                                        //ref={fileInput => this.fileInput = fileInput}
                                        />
                                    </div>
                                ) : (
                                        <div>
                                            <Typography
                                                component="h4"
                                                variant="subtitle1"
                                                color="inherit"

                                            >
                                                Company logo
                                            </Typography>
                                            <div style={{ width: "200px", height: "200px", marginBottom: "10px" }}>
                                                <img src={company_logo} style={{ width: "100%", height: "100%" }} />
                                            </div>
                                        </div>
                                    )
                            }

                        </Grid>
                        {
                            isEditing ?
                                <Grid item xs={12} sm={12}>
                                    <label htmlFor="outlined-button">
                                        <Button type="submit" variant="outlined" style={{ marginRight: "10px" }} >
                                            Update Package
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
                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => { this.props.history.push('/viewUser') }}>
                        Go back
                    </Button>
                    <Button variant="contained" color="primary" style={{ marginTop: "10px", marginLeft: "10px" }} >
                        Send Message
                    </Button>
                </Grid>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { updateUser })(UpdateUser)