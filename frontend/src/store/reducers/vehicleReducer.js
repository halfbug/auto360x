import {
    GET_VEHICLES,
    ADD_VEHICLE,
    DELETE_VEHICLE,
    UPDATE_VEHICLE,
    VEHICLE_LOADING,
    GET_VEHICLE_FAIL,
    ADD_VEHICLE_FAIL,
    UPDATE_VEHICLE_FAIL,
    DELETE_VEHICLE_FAIL,
  } from '../actions/vehicleActions';
  
  const initialState = {
    vehicles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_VEHICLES:
        return {
          ...state,
          vehicles: action.payload,
          loading: false
        };
      case GET_VEHICLE_FAIL:
      case ADD_VEHICLE_FAIL:
      case DELETE_VEHICLE_FAIL:
      case UPDATE_VEHICLE_FAIL: 
        return {
          ...state,
          loading: false
        }
      case DELETE_VEHICLE:
        return {
          ...state,
          vehicles: state.vehicles.filter(vehicle => vehicle._id !== action.payload)
        };
      case ADD_VEHICLE:
        return {
          ...state,
          vehicles: [ ...state.vehicles, action.payload]
        };
      case UPDATE_VEHICLE:
          return {
            ...state,
            vehicles: [action.payload]
          };
      case VEHICLE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  