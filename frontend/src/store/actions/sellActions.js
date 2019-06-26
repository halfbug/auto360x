import axios from 'axios';
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const GET_SELL = 'GET_SELL';
export const ADD_SELL = 'ADD_SELL';
export const DELETE_SELL = 'DELETE_SELL';
export const SELL_LOADING = 'SELL_LOADING';
export const STORE_SELL = 'STORE_SELL';

export const getSells = (info,dispatch) => {
  console.log("inside action sell")
  axios
      .post('/api/vehicles').then(res =>
        dispatch({
          type: GET_SELL,
          payload: res.data
        })
      )
  // return (dispatch, getState) => {
  //   console.log("inside get sells");
  //   // dispatch(setSellsLoading());
  //   axios
  //     .get('/api/vehicles')
  //     .then(res =>
  //       dispatch({
  //         type: GET_SELL,
  //         payload: res.data
  //       })
  //     )
  //     .catch(err =>
  //       //dispatch(returnErrors(err.response.data, err.response.status))  
  //       dispatch({ type: 'CREATE_EVENT_ERROR' }, err)
  //     );
  // }
};

export const storeSell =(record,dispatch) => {
    console.log("store");
  
      dispatch({
        type: STORE_SELL,
        payload: record
      })
  
};


export const addSell = (sellrecord,dispatch) => {
  console.log("about to add new record")
  axios
    .post('/api/vehicles', sellrecord)
    .then(res =>{
      dispatch({
        type: ADD_SELL,
        payload: res.data
      });
      // console.log(res.data)
    }
    )
    .catch(err =>
      //dispatch(returnErrors(err.response.data, err.response.status))  
      dispatch({ type: 'CREATE_EVENT_ERROR' }, err)
    );
};

export const deleteSell = id => (dispatch) => {
  axios
    .delete(`/api/Sells/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SELL,
        payload: id
      })
    )
    .catch(err =>
      //dispatch(returnErrors(err.response.data, err.response.status))  
      dispatch({ type: 'CREATE_EVENT_ERROR' }, err)
    );
};

export const updateSell = id => (dispatch) => {
    axios
      .put(`/api/Sells/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_SELL,
          payload: id
        })
      )
      .catch(err =>
        //dispatch(returnErrors(err.response.data, err.response.status))  
        dispatch({ type: 'CREATE_EVENT_ERROR' }, err)
      );
  };

export const setSellsLoading = () => {
  return {
    type: SELL_LOADING
  };
};
