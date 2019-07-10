import React from 'react';
import './assets/css/custom.css';
import Master from "./layouts/Master"
import SignIn from "./views/Auth/SignIn"
import SignUp from "./views/Auth/SignUp"
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import { Redirect , withRouter } from "react-router-dom";
import { compose } from "redux";
// import {createMuiTheme} from '@material-ui/core/styles';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from "react-router-dom";
import Public from "./layouts/Public" 
import AppRoute from "./layouts/AppRoute"
import Plane from "./layouts/Plane"
import Home from "./views/Dashboard/Home"
import OpenHome from "./views/LandingPage/Home"
import Wizard from "./views/SellForm/Wizard"
import Search from "./views/Search/Search";
import Detail from "./views/DetailPage/Main"


function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <AppRoute exact path="/signIn" layout={Plane} component={SignIn} />
        <AppRoute exact path="/signUp" layout={Plane} component={SignUp} />
        <AppRoute exact path="/" layout={Public} component={OpenHome} />
        <AppRoute exact path="/admin" layout={Master} component={Home} />
        <AppRoute exact path="/sell" layout={Public} component={Wizard} />
        <AppRoute exact path="/search/:make?:view?" layout={Public} component={Search} />
        <AppRoute exact path="/vehicle/:id" layout={Public} component={Detail} />
        {/* <AppRoute exact path="/company" layout={Master} component={IndexCompany} /> */}
          
        </Switch>
        
      </div>
      </BrowserRouter>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  
  return {
    // companies: companies,
    // auth: state.firebase.auth,
     };
};

export default compose(
  // connect(
  //   mapStateToProps,
  //   {}
  // )
  
) (App);
