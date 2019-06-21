import {
    GET_PACKAGES,
    ADD_PACKAGE,
    DELETE_PACKAGE,
    UPDATE_PACKAGE,
    PACKAGE_LOADING,
    GET_PACKAGE_FAIL,
    ADD_PACKAGE_FAIL,
    UPDATE_PACKAGE_FAIL,
    DELETE_PACKAGE_FAIL,
  } from '../actions/packageActions';
  
  const initialState = {
    packages: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PACKAGES:
        return {
          ...state,
          packages: action.payload,
          loading: false
        };
      case GET_PACKAGE_FAIL:
      case ADD_PACKAGE_FAIL:
      case DELETE_PACKAGE_FAIL:
      case UPDATE_PACKAGE_FAIL: 
        return {
          ...state,
          loading: false
        }
      case DELETE_PACKAGE:
        return {
          ...state,
          packages: state.packages.filter(pkg => pkg._id !== action.payload)
        };
      case ADD_PACKAGE:
        return {
          ...state,
          packages: [ ...state.packages, action.payload]
        };
      case UPDATE_PACKAGE:
          return {
            ...state,
            packages: [action.payload]
          };
      case PACKAGE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  