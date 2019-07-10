import axios from 'axios';
import { returnErrors } from './errorActions';
import swal from 'sweetalert';
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_LOADING = 'USER_LOADING';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL'
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL'

export const getUsers = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('http://localhost:5000/api/users')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_USER_FAIL'))
      dispatch({
        type: GET_USER_FAIL
      })
      swal("Error fetching Users!")
    });
};

export const addUser = (user) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/users', user)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data,
      })
      swal("User has been added successfully!")
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_USER_FAIL'))
      dispatch({
        type: ADD_USER_FAIL
      })
      swal("Error adding User", err.response.data.msg)
    });
};

export const deleteUser = id => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_USER_FAIL'))
      dispatch({
        type: DELETE_USER_FAIL
      })
      swal("Error deleting User!")
    });
};

export const updateUser = (id, user) => (dispatch) => {
    axios
      .put(`http://localhost:5000/api/users/${id}`, user)
      .then(res => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        })
        swal("User updated successfully!")
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_USER_FAIL'))
        dispatch({
          type: UPDATE_USER_FAIL
        })
        swal("Error updating User!", err.response.data.msg)
      });
  };

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
