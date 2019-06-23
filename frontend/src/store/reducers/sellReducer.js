import {
    GET_SELL,
    ADD_SELL,
    DELETE_SELL,
    SELL_LOADING,
    STORE_SELL,
    
  } from '../actions/sellActions';
  
  const initialState = {
    sell: [],
    loading: false
  };
  
  export default function sell(state = initialState, action) {
    console.log("reducer sell receive action "+Object.keys(action))
    // console.log(state);
    switch (action.type) {
      case GET_SELL:
        console.log(action.payload);
        return {
          ...state,
          sell: action.payload,
          loading: false
        };
      case DELETE_SELL:
        return {
          ...state,
          sell: state.sells.filter(packag => packag._id !== action.payload)
        };
      case ADD_SELL:
        return {
          ...state,
          sell: [action.payload, ...state.sell]
        };
      case STORE_SELL:
          return {
            ...state,
            sell: [...state.sell, action.payload]
          };  
      case SELL_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }

    //console.log(state);
  }
  