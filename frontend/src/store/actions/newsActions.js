import axios from 'axios';
import { returnErrors } from './errorActions';
import swal from 'sweetalert';
export const GET_NEWS = 'GET_NEWS';
export const ADD_NEWS = 'ADD_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const NEWS_LOADING = 'NEWS_LOADING';
export const GET_NEWS_FAIL = 'GET_NEWS_FAIL';
export const ADD_NEWS_FAIL = 'ADD_NEWS_FAIL';
export const UPDATE_NEWS_FAIL = 'UPDATE_NEWS_FAIL'
export const DELETE_NEWS_FAIL = 'DELETE_NEWS_FAIL'

export const getNews = () => dispatch => {
  dispatch(setNewsLoading());
  axios
    .get('http://localhost:5000/api/news')
    .then(res =>
      dispatch({
        type: GET_NEWS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'GET_NEWS_FAIL'))
      dispatch({
        type: GET_NEWS_FAIL
      })
      swal("Error getting News!")
    });
};

export const addNews = (news) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/news', news)
    .then(res => {
      dispatch({
        type: ADD_NEWS,
        payload: res.data,
      })
      swal("News has been added successfully!")
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NEWS_FAIL'))
      dispatch({
        type: ADD_NEWS_FAIL
      })
      swal("Error adding News", err.response.data.msg)
    });
};

export const deleteNews = id => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/news/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_NEWS,
        payload: id
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NEWS_FAIL'))
      dispatch({
        type: DELETE_NEWS_FAIL
      })
      swal("Error deleting News!")
    });
};

export const updateNews = (id, news) => (dispatch) => {
    axios
      .put(`http://localhost:5000/api/news/${id}`, news)
      .then(res => {
        dispatch({
          type: UPDATE_NEWS,
          payload: res.data
        })
        swal("News updated successfully!")
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_NEWS_FAIL'))
        dispatch({
          type: UPDATE_NEWS_FAIL
        })
        swal("Error updating News!", err.response.data.msg)
      });
  };

export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING
  };
};
