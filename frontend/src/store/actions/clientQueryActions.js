import axios from 'axios';
import { returnErrors } from './errorActions';
import swal from 'sweetalert';
export const GET_CLIENTQUERIES = 'GET_CLIENTQUERIES';
export const ADD_CLIENTQUERIES = 'ADD_CLIENTQUERIES';
export const DELETE_CLIENTQUERIES = 'DELETE_CLIENTQUERIES';
export const CLIENTQUERIES_LOADING = 'CLIENTQUERIES_LOADING';
export const ADD_CLIENTQUERIES_FAIL = 'ADD_CLIENTQUERIES_FAIL';
export const GET_CLIENTQUERIES_FAIL = 'GET_CLIENTQUERIES_FAIL';
export const DELETE_CLIENTQUERIES_FAIL = 'DELETE_CLIENTQUERIES_FAIL';

export const getClientQueries = () => dispatch => {
  dispatch(setClientQueriesLoading());
  axios
    .get('http://localhost:5000/api/clientQueries')
    .then(res =>
      dispatch({
        type: GET_CLIENTQUERIES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_CLIENTQUERIES_FAIL'))
      dispatch({
        type: GET_CLIENTQUERIES_FAIL
      })
      swal("Error getting Client queries!")
    });
};

export const addClientQueries = query => (dispatch) => {
  axios
    .post('http://localhost:5000/api/clientQueries', query)
    .then(res => {
      dispatch({
        type: ADD_CLIENTQUERIES,
        payload: res.data
      })
      swal("Thanks you. Your message has been submitted. We'll get back to you soon!")
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CLIENTQUERIES_FAIL'))
      dispatch({
        type: ADD_CLIENTQUERIES_FAIL
      })
      swal("Error submitting message.", err.response.data.msg)
    });
};

export const deleteClientQueries = id => (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/clientQueries/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_CLIENTQUERIES,
          payload: id
        })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CLIENTQUERIES_FAIL'))
        dispatch({
          type: DELETE_CLIENTQUERIES_FAIL
        })
        swal("Error deleting!")
      });
  };

export const setClientQueriesLoading = () => {
  return {
    type: CLIENTQUERIES_LOADING
  };
};
