import {
    GET_CLIENTQUERIES,
    ADD_CLIENTQUERIES,
    DELETE_CLIENTQUERIES,
    CLIENTQUERIES_LOADING,
    GET_CLIENTQUERIES_FAIL,
    ADD_CLIENTQUERIES_FAIL,
    DELETE_CLIENTQUERIES_FAIL,
  } from '../actions/clientQueryActions';
  
  const initialState = {
    queries: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CLIENTQUERIES:
        return {
          ...state,
          queries: action.payload,
          loading: false
        };
      case GET_CLIENTQUERIES_FAIL:
      case ADD_CLIENTQUERIES_FAIL:
      case DELETE_CLIENTQUERIES_FAIL:
        return {
          ...state,
          loading: false
        }
      case DELETE_CLIENTQUERIES:
        return {
          ...state,
          queries: state.queries.filter(query => query._id !== action.payload)
        };
      case ADD_CLIENTQUERIES:
        return {
          ...state,
          queries: [ ...state.queries, action.payload]
        };
      case CLIENTQUERIES_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  