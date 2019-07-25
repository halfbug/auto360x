import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  componentDidMount(){
    this.props.logout();
    this.props.history.push(`/`)
  }


  render() {
    
    return (
      <Fragment>
        
          Logging out...
        
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);