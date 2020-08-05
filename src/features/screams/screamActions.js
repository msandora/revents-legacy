// import { toastr } from 'react-redux-toastr';
// import { createNewScream } from '../../app/common/util/helpers';
// import firebase from '../../app/config/firebase';
import { CREATE_SCREAM, UPDATE_SCREAM, DELETE_SCREAM } from './screamConstants';
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError,
// } from '../async/asyncActions';
// import { getFirestore } from 'redux-firestore';

export const createScream = (scream) => {
  return {
    type: CREATE_SCREAM,
    payload: {
      scream,
    },
  };
};

export const updateScream = (scream) => {
  return {
    type: UPDATE_SCREAM,
    payload: {
      scream,
    },
  };
};

export const deleteScream = (screamId) => {
  return {
    type: DELETE_SCREAM,
    payload: {
      screamId,
    },
  };
};
