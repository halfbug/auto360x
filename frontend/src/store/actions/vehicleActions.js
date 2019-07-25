import axios from 'axios';
import { returnErrors } from './errorActions';
import swal from 'sweetalert';
export const GET_VEHICLES = 'GET_VEHICLES';
export const ADD_VEHICLE = 'ADD_VEHICLE';
export const DELETE_VEHICLE = 'DELETE_VEHICLE';
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE';
export const VEHICLE_LOADING = 'VEHICLE_LOADING';
export const GET_VEHICLE_FAIL = 'GET_VEHICLE_FAIL';
export const ADD_VEHICLE_FAIL = 'ADD_VEHICLE_FAIL';
export const UPDATE_VEHICLE_FAIL = 'UPDATE_VEHICLE_FAIL'
export const DELETE_VEHICLE_FAIL = 'DELETE_VEHICLE_FAIL'

export const getVehicles = () => dispatch => {
  dispatch(setVehiclesLoading());
  axios
    .get('http://localhost:5000/api/vehicles')
    .then(res =>
      dispatch({
        type: GET_VEHICLES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_VEHICLE_FAIL'))
      dispatch({
        type: GET_VEHICLE_FAIL
      })
      swal("Error getting vehicles!")
    });
};

export const addVehicle = vehicle => (dispatch) => {
  axios
    .post('http://localhost:5000/api/vehicles', vehicle)
    .then(res => {
      dispatch({
        type: ADD_VEHICLE,
        payload: res.data
      })
      swal("Vehicle has been added successfully!")
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_VEHICLE_FAIL'))
      dispatch({
        type: ADD_VEHICLE_FAIL
      })
      swal("Error adding Vehicle", err.response.data.msg)
    });
};

export const deleteVehicle = id => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/vehicles/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_VEHICLE,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_VEHICLE_FAIL'))
      dispatch({
        type: DELETE_VEHICLE_FAIL
      })
      swal("Error deleting Vehicle!")
    });
};

export const updateVehicle = (id, vehicle) => (dispatch) => {
    axios
      .put(`http://localhost:5000/api/vehicles/${id}`, vehicle)
      .then(res => {
        dispatch({
          type: UPDATE_VEHICLE,
          payload: res.data
        })
        swal("Vehicle updated successfully!")
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_VEHICLE_FAIL'))
        dispatch({
          type: UPDATE_VEHICLE_FAIL
        })
        swal("Error updating Vehicle!", err.response.data.msg)
      });
  };

export const setVehiclesLoading = () => {
  return {
    type: VEHICLE_LOADING
  };
};
