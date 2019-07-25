import {
    GET_SELL,
    ADD_SELL,
    DELETE_SELL,
    
    SELL_LOADING,
    STORE_SELL,
    SELL_ERROR
    
  } from '../actions/sellActions';
  
  const initialState = {
    listing: [],
    loading: false,
    
  };
  
  export default function sellReducer (state =initialState, action) {
    console.log("reducer sell receive action "+Object.keys(action))
    console.log(state);
    // console.log(action.payload)
    switch (action.type) {
      case GET_SELL:
        console.log(action.payload);
        console.log("inside reducer get sell")
        return {
          ...state,
        listing: action.payload,
          loading: false
        };
      case DELETE_SELL:
        return {
          ...state,
        listing: state.listing.filter(packag => packag._id !== action.payload)
        };
      case ADD_SELL:
      console.log(action)  
      return {
          ...state,
        listing: [action.payload, ...state.listing]
        };
      case STORE_SELL:
          return {
            ...state,
          listing: [...state.listing, action.payload]
          };  
      case SELL_LOADING:
        return {
          ...state,
          loading: true
        };
        case SELL_ERROR:
          return {
            ...state,
          listing: [...state.listing, action.payload]
          }; 
      default:
        return state;
    }

    //console.log(state);
  }
  