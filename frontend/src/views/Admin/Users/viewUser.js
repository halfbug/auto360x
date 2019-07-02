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
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'
import { getUsers, deleteUser } from '../../../store/actions/userActions'

class ViewUser extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        getUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getUsers();
    }

    onDeleteClick = id => {
        this.props.deleteUser(id);
    };

    onUpdateClick = (index, user) => {
        this.props.history.push({pathname: '/updateUser', state: {index, user} })
    }
         
    render() {
        const  {users}  = this.props.user
        console.log(users)
        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "30px", fontSize: "25px",  paddingTop: "10px", textAlign: "center" }}>
                         Users
                    </Typography>
                    <Button variant="contained" style={{marginLeft: "80%", marginBottom: "20px"}} onClick={() => {this.props.history.push('/addUser')}}>
                        Add User  <AddIcon />
                    </Button>
                    <hr/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Last login</TableCell>
                                <TableCell>View User</TableCell>
                                <TableCell>Delete User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { users.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row">
                                        { user.fullname }
                                    </TableCell>
                                    <TableCell>{ user.status }</TableCell>
                                    <TableCell>{ user.roles }</TableCell>
                                    <TableCell >{ moment(user.last_login).format( )}</TableCell>
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

export default withRouter(connect(mapStateToProps, { getUsers, deleteUser })(ViewUser));