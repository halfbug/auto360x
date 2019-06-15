import authReducer from './authReducer'
import companyReducer from './companyReducer'
import { combineReducers } from 'redux'
import packageReducer from './packageReducer'
import errorReducer from './errorReducer'
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  pkg: packageReducer,
  error: errorReducer,
  // firestore: firestoreReducer,
  // firebase: firebaseReducer
});



export default rootReducer


// the key name will be the data property on the state object