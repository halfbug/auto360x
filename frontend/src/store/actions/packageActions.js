import axios from 'axios';
import { returnErrors } from './errorActions';

export const GET_PACKAGES = 'GET_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const UPDATE_PACKAGE = 'UPDATE_PACKAGE';
export const PACKAGE_LOADING = 'PACKAGE_LOADING';
export const GET_PACKAGE_FAIL = 'GET_PACKAGE_FAIL';
export const ADD_PACKAGE_FAIL = 'ADD_PACKAGE_FAIL';
export const UPDATE_PACKAGE_FAIL = 'UPDATE_PACKAGE_FAIL'
export const DELETE_PACKAGE_FAIL = 'DELETE_PACKAGE_FAIL'

export const getPackages = () => dispatch => {
  dispatch(setPackagesLoading());
  axios
    .get('http://localhost:5000/api/packages')
    .then(res =>
      dispatch({
        type: GET_PACKAGES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_PACKAGE_FAIL'))
      dispatch({
        type: GET_PACKAGE_FAIL
      })
    });
};

export const addPackage = pkg => (dispatch) => {
  axios
    .post('http://localhost:5000/api/packages', pkg)
    .then(res =>
      dispatch({
        type: ADD_PACKAGE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_PACKAGE_FAIL'))
      dispatch({
        type: ADD_PACKAGE_FAIL
      })
    });
};

export const deletePackage = id => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/packages/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PACKAGE,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_PACKAGE_FAIL'))
      dispatch({
        type: DELETE_PACKAGE_FAIL
      })
    });
};

export const updatePackage = (id, pkg) => (dispatch) => {
    axios
      .put(`http://localhost:5000/api/packages/${id}`, pkg)
      .then(res =>
        dispatch({
          type: UPDATE_PACKAGE,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_PACKAGE_FAIL'))
        dispatch({
          type: UPDATE_PACKAGE_FAIL
        })
      });
  };

export const setPackagesLoading = () => {
  return {
    type: PACKAGE_LOADING
  };
};
