import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    GET_USER_FAIL,
    ADD_USER_FAIL,
    UPDATE_USER_FAIL,
    DELETE_USER_FAIL,
    USER_LOADING,
  } from '../actions/userActions';
  
  const initialState = {
    users: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false
        };
      case GET_USER_FAIL:
      case ADD_USER_FAIL:
      case DELETE_USER_FAIL:
      case UPDATE_USER_FAIL: 
        return {
          ...state,
          loading: false
        }
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload)
        };
      case ADD_USER:
        return {
          ...state,
          users: [ ...state.users, action.payload]
        };
      case UPDATE_USER:
          return {
            ...state,
            users: [ ...state.users, action.payload]
          };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  