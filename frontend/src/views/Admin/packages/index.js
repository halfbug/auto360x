import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import AddPackage from './addPackage'
import ViewPackage from './viewPackage'

class PacakageManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom>
                    Packages
                </Typography>
                <AddPackage />
                <ViewPackage />
            </Fragment>
        );
    }
}

export default PacakageManagement;