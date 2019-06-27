import {
    GET_NEWS,
    ADD_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS,
    PACKAGE_NEWS,
    GET_NEWS_FAIL,
    ADD_NEWS_FAIL,
    UPDATE_NEWS_FAIL,
    DELETE_NEWS_FAIL,
    NEWS_LOADING,
  } from '../actions/newsActions';
  
  const initialState = {
    news: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_NEWS:
        return {
          ...state,
          news: action.payload,
          loading: false
        };
      case GET_NEWS_FAIL:
      case ADD_NEWS_FAIL:
      case DELETE_NEWS_FAIL:
      case UPDATE_NEWS_FAIL: 
        return {
          ...state,
          loading: false
        }
      case DELETE_NEWS:
        return {
          ...state,
          news: state.news.filter(news => news._id !== action.payload)
        };
      case ADD_NEWS:
        return {
          ...state,
          news: [ ...state.news, action.payload]
        };
      case UPDATE_NEWS:
          return {
            ...state,
            news: [action.payload]
          };
      case NEWS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  