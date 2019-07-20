import authReducer from './authReducer'
import companyReducer from './companyReducer'
import { combineReducers } from 'redux'
import sellReducer from './sellReducer'
import packageReducer from './packageReducer'
import errorReducer from './errorReducer'
import newsReducer from './newsReducer'
import userReducer from './userReducer'
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  vehicles : sellReducer,
  pkg: packageReducer,
  error: errorReducer,
  news: newsReducer,
  user: userReducer
  // firestore: firestoreReducer,
  // firebase: firebaseReducer
});



export default rootReducer


// the key name will be the data property on the state object