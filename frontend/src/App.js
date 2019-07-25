import React from 'react';
import './assets/css/custom.css';
import Master from "./layouts/Master"
import SignIn from "./views/Auth/SignIn"
import SignUp from "./views/Auth/SignUp"
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import { Redirect , withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from 'prop-types';
import { loadUser } from './store/actions/authActions';


// import {createMuiTheme} from '@material-ui/core/styles';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from "react-router-dom";
import Public from "./layouts/Public" 
import AppRoute from "./layouts/AppRoute"
import Plane from "./layouts/Plane"
import Home from "./views/Dashboard/Home"
import OpenHome from "./views/LandingPage/Home"
import Wizard from "./views/SellForm"
import Search from "./views/Search/Search";
import Detail from "./views/DetailPage/Main"
import PacakageManagement from './views/Admin/packages/index'
import AddPackage from "./views/Admin/packages/addPackage"
import ViewPackage from "./views/Admin/packages/viewPackage"
import UpdatePackage from "./views/Admin/packages/updatePackage"
import AddNews from "./views/Admin/News/addNews"
import ViewNews from './views/Admin/News/viewNews'
import NewsDetails from './views/Admin/News/newsDetails'
import UpdateNews from './views/Admin/News/updateNews'
import AddUser from './views/Admin/Users/addUser'
import ViewUser from './views/Admin/Users/viewUser'
import UpdateUser from './views/Admin/Users/updateUser'
import {theme} from './config/themeCnfg'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import About from './views/LandingPage/About'
import Terms from './views/LandingPage/Terms'
import Logout from './views/Auth/SignOut'


export class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
       <BrowserRouter>
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Switch>
        <AppRoute exact path="/signIn" layout={Plane} component={SignIn} />
        <AppRoute exact path="/signUp" layout={Plane} component={SignUp} />
        <AppRoute exact path="/" layout={Public} component={OpenHome} />
        <AppRoute exact path="/admin" layout={Master} component={Home} />
        <AppRoute exact path="/sell" layout={Public} component={Wizard} />
        <AppRoute exact path="/search/:make?:view?" layout={Public} component={Search} />
        <AppRoute exact path="/vehicle/:id" layout={Public} component={Detail} />
        <AppRoute exact path="/about" layout={Public} component={About} />
        <AppRoute exact path="/terms" layout={Public} component={Terms} />
        <AppRoute exact path="/logout" layout={Public} component={Logout} />

        <AppRoute exact path="/package" layout={Master} component={PacakageManagement} />
        <AppRoute exact path="/updatePackage" layout={Master} component={UpdatePackage} />
        <AppRoute exact path="/addNews" layout={Master} component={AddNews} />
        <AppRoute exact path="/viewNews" layout={Master} component={ViewNews} />
        <AppRoute exact path="/newsDetails" layout={Master} component={NewsDetails} />
        <AppRoute exact path="/updateNews" layout={Master} component={UpdateNews} />
        <AppRoute exact path="/addUser" layout={Master} component={AddUser} />
        <AppRoute exact path="/viewUser" layout={Master} component={ViewUser} />
        <AppRoute exact path="/updateUser" layout={Master} component={UpdateUser} />
        {/* <AppRoute exact path="/company" layout={Master} component={IndexCompany} /> */}
          
        </Switch>
      </MuiThemeProvider>
      </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (userdata) => dispatch(loadUser())
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // { loginFromToken, clearErrors , addSell, register }
)(App)



