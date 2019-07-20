import authReducer from './authReducer'
import companyReducer from './companyReducer'
import { combineReducers } from 'redux'
import sellReducer from './sellReducer'
import packageReducer from './packageReducer'
import errorReducer from './errorReducer'
import newsReducer from './newsReducer'
import userReducer from './userReducer'
import vehicleReducer from './vehicleReducer'
import clientQueryReducer from './clientQueryReducer'
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  sell : sellReducer,
  pkg: packageReducer,
  error: errorReducer,
  news: newsReducer,
  user: userReducer,
  vehicle: vehicleReducer,
  clientQuery: clientQueryReducer
  // firestore: firestoreReducer,
  // firebase: firebaseReducer
});



export default rootReducer


// the key name will be the data property on the state object