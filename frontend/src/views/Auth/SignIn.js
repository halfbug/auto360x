import React, { Component } from 'react'
import LoginBox from "../../components/LoginBox"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

export class SignIn extends Component {
  state = {
    email : "",
    password : "",
    msg : ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  handleChange =  e => {
    console.log(e.target)
    const field = (!e.target.id)?e.target.name : e.target.id;
    this.setState({
      [field] : e.target.value 
    });
    
    } 
    
    handleClick =  e => {
      e.preventDefault();
      console.log("inside handle click")
      
      console.log(this.state)
      }
  render() {
    return (
      <div>
       <LoginBox handleChange={this.handleChange} handleClick={this.handleClick} /> 
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(SignIn)
