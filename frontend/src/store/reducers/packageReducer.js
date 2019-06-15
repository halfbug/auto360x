import {
    GET_PACKAGES,
    ADD_PACKAGE,
    DELETE_PACKAGE,
    PACKAGE_LOADING
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
      case DELETE_PACKAGE:
        return {
          ...state,
          packages: state.packages.filter(packag => packag._id !== action.payload)
        };
      case ADD_PACKAGE:
        return {
          ...state,
          packages: [action.payload, ...state.packages]
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
  