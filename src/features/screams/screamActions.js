import { toastr } from 'react-redux-toastr';
import { createNewScream } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import { FETCH_SCREAMS } from './screamConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';

export const createScream = (scream) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newScream = createNewScream(user, photoURL, scream);
    try {
      let createdScream = await firestore.add('screams', newScream);

      toastr.success('Success!', 'Post has been created');
      return createdScream;
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const getScreamsForDashboard = (lastScream) => async (
  dispatch,
  getState
) => {
  // let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const screamsRef = firestore.collection('screams');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastScream &&
      (await firestore.collection('screams').doc(lastScream.id).get());
    let query;

    lastScream
      ? (query = screamsRef
          // .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
      : (query = screamsRef
          // .where('date', '>=', today)
          .orderBy('date')
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    
    let screams = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      screams.push(evt);
    }
    dispatch({ type: FETCH_SCREAMS, payload: { screams } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const updateScream = (scream) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      dispatch(asyncActionStart());
      let screamDocRef = firestore.collection('screams').doc(scream.id);
      let dateEqual = getState().firestore.ordered.screams[0].date.isEqual(
        scream.date
      );
      if (!dateEqual) {
        let batch = firestore.batch();
        batch.update(screamDocRef, scream);

        let screamAttendeeRef = firestore.collection('scream_attendee');
        let screamAttendeeQuery = await screamAttendeeRef.where(
          'screamId',
          '==',
          scream.id
        );
        let screamAttendeeQuerySnap = await screamAttendeeQuery.get();

        for (let i = 0; i < screamAttendeeQuerySnap.docs.length; i++) {
          let screamAttendeeDocRef = firestore
            .collection('scream_attendee')
            .doc(screamAttendeeQuerySnap.docs[i].id);

          batch.update(screamAttendeeDocRef, {
            screamDate: scream.date,
          });
        }
        await batch.commit();
      } else {
        await screamDocRef.update(scream);
      }
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Post has been updated');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};
