import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import testReducer from '../../features/playground/testReducer';
import eventReducer from '../../features/events/eventReducer';
import screamReducer from '../../features/screams/screamReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  screams: screamReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer,
});

export default rootReducer;
