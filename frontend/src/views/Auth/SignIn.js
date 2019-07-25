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
    msg : null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // // If authenticated, close modal
   
      if (isAuthenticated) {
        this.props.history.push(`/`)
      }
    
  }
  
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
      
      const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user).then((res)=>{
      console.log("logedin");
    this.props.history.push(`/`)
  });
    
      }


  render() {
    
    return (
      <div>

       <LoginBox handleChange={this.handleChange} handleClick={this.handleClick} errormsg={this.state.msg}/> 
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
