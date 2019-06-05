import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import  rootReducer  from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { reduxFirestore } from 'redux-firestore';
// import { reactReduxFirebase } from 'react-redux-firebase';
// import firebaseConfig from './config/firebaseCnfg'

const state = { authState: {}, statCardState: {} }
const store = createStore(rootReducer, state,
  compose(
    applyMiddleware(thunk),
    // reactReduxFirebase(firebaseConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
    // reduxFirestore(firebaseConfig) // redux bindingsr for firestore
  )
);

// store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  serviceWorker.register();
// });


