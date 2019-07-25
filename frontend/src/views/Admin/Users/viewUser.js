import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'
import { getUsers, deleteUser, updateUser } from '../../../store/actions/userActions'

class ViewUser extends Component {

    state = {
        isEditing: false,
        i: -1,
        status: ''
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        getUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getUsers();
    }

    onDeleteClick = id => {
        this.props.deleteUser(id);
    };

    onUpdateClick = (index, user) => {
        this.props.history.push({ pathname: '/admin/updateUser', state: { index, user } })
    }

    handleChange = (event) => {
        this.setState(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log("status is ", this.state.status)
    }

    startEditing = (index, user) => {
        this.setState({
            isEditing: true,
            i: index,
            status: user.status
        })
        //  console.log("active", this.state.is_active)
    }

    stopEditing = (index, id) => {
        this.setState({
            i: index,
            isEditing: false
        })
        const editedUser = {
            status: this.state.status,
        };

        // Update item via updateItem action
        this.props.updateUser(id, editedUser);
        console.log("active", this.state.is_active)
          window.location.reload()
    }

    cancelEditing = () => {
        this.setState({
            isEditing: false
        })
    }

    render() {
        const { isEditing, i, status } = this.state
        const { users } = this.props.user
        console.log(users)
        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "30px", fontSize: "25px", paddingTop: "10px", textAlign: "center" }}>
                        Users
                    </Typography>
                    <Button variant="contained" style={{ marginLeft: "80%", marginBottom: "20px" }} onClick={() => { this.props.history.push('/admin/addUser') }}>
                        Add User  <AddIcon />
                    </Button>
                    <hr />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Edit Status</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Last login</TableCell>
                                <TableCell>View User</TableCell>
                                <TableCell>Delete User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row">
                                        {user.fullname}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                <FormGroup>
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
                                                </FormGroup> : user.status
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isEditing && i === index ?
                                                (<div>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.stopEditing.bind(this, index, user._id)} > check </i>
                                                    <i className="material-icons" style={{ cursor: 'pointer', }} onClick={this.cancelEditing.bind(this, index, user._id)}> cancel </i>
                                                </div>) :
                                                <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.startEditing.bind(this, index, user)}>edit</i>
                                        }
                                    </TableCell>
                                    <TableCell>{user.roles}</TableCell>
                                    <TableCell >{moment(user.last_login).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="contained" size="small" onClick={this.onUpdateClick.bind(this, index, user)}>View</Button>
                                    </TableCell>
                                    <TableCell>
                                        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this, user._id)}>delete</i>
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
    user: state.user
})

export default withRouter(connect(mapStateToProps, { getUsers, deleteUser, updateUser })(ViewUser));