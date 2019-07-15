import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'
import { getPackages, deletePackage } from '../../../store/actions/packageActions'

class ViewPackage extends Component {

    static propTypes = {
        pkg: PropTypes.object.isRequired,
        getPackages: PropTypes.func.isRequired,
        deletePackage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getPackages();
    }

    onDeleteClick = id => {
        this.props.deletePackage(id);
    };

    onUpdateClick = (index, pkg) => {
        this.props.history.push({pathname: '/admin/updatePackage', state: {index, pkg} })
    }
         
    render() {
        const { packages } = this.props.pkg

        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{marginTop: "30px", textAlign: "center"}}> 
                        View and Edit Packages
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
                            { packages.map((pkg, index) => (
                                <TableRow key={pkg._id}>
                                    <TableCell component="th" scope="row">
                                        { pkg.title}
                                    </TableCell>
                                    <TableCell align="right">{ pkg.price}</TableCell>
                                    <TableCell align="right">{ moment(pkg.start_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{ moment(pkg.end_date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell align="right">{ pkg.description}</TableCell>
                                    <TableCell align="right">{ pkg.is_active.toString()}</TableCell>
                                    <TableCell align="right">{ moment(pkg.create_at).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>
                                        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onUpdateClick.bind(this, index, pkg)}>edit</i>
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

export default withRouter(connect(mapStateToProps, { getPackages, deletePackage })(ViewPackage));