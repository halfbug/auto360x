import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const GET_PACKAGES = 'GET_PACKAGES';
export const ADD_PACKAGE = 'ADD_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const UPDATE_PACKAGE = 'UPDATE_PACKAGE';
export const PACKAGE_LOADING = 'PACKAGE_LOADING';

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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const setPackagesLoading = () => {
  return {
    type: PACKAGE_LOADING
  };
};
