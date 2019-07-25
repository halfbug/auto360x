import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginFromToken , register} from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import Wizard from './Wizard';
import {addSell} from '../../store/actions/sellActions';
import SimpleReactValidator from 'simple-react-validator';

 

export class StoreTracker extends Component {

    state = {
          msg: null,
          
      };
    
      static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        // loginFromToken: PropTypes.func.isRequired,
        // clearErrors: PropTypes.func.isRequired
      };
    
      componentWillMount() {
        console.log("------------------------------")
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        console.log(this.validator)
      }
      componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
       
        // // If authenticated, close modal
          // if (!isAuthenticated) {
          //   this.store.dispatch(this.props.loginFromToken()).then((res)=>console.log(res)).catch((e)=>{
              
          //   });
          // }
      }
    
      setUser = (e) =>(userdata)=> {
        e.preventDefault();
    
        
        // Attempt to register
        this.props.register(userdata);
      };
      addSell=(rvehicle)=>{
console.log(rvehicle["user_id"])
        if(rvehicle["user_id"] === undefined){
          rvehicle['user_id'] = this.props.user.id;
        }
          this.props.addSell(rvehicle)
      }
    render() {
        return (
            <div>
            {/* <UploadImageButton values={()=>[]} /> */}
                <Wizard 
                isAuthenticated={this.props.isAuthenticated} 
                addSell = {this.addSell}
                register = {this.props.register}
                validator = {this.validator}
                 />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      register: (userdata) => dispatch(register(userdata)),
      clearErros : ()=>dispatch(clearErrors),
      addSell : (selldata)=>dispatch(addSell(selldata)),
      loginFromToken : (data)=>dispatch(loginFromToken(data))
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps // { loginFromToken, clearErrors , addSell, register }
  )(StoreTracker)
