import { toastr } from 'react-redux-toastr';
import { createNewScream } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import {
  // CREATE_SCREAM,
  // UPDATE_SCREAM,
  // DELETE_SCREAM,
  FETCH_SCREAMS,
} from './screamConstants';
// import { fetchSampleData } from '../../app/data/mockApi';
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/asyncActions';
// import { getFirestore } from 'redux-firestore';

export const createScream = (scream) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newScream = createNewScream(user, photoURL, scream);
    try {
      dispatch(asyncActionStart());
      let createdScream = await firestore.add('screams', newScream);

      toastr.success('Success!', 'Post has been created');
      dispatch(asyncActionFinish());
      return createdScream;
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

// export const deleteScream = (screamId) => {
//   return {
//     type: DELETE_SCREAM,
//     payload: {
//       screamId,
//     },
//   };
// };

export const deleteScream = (cancelled, screamId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This will reactivate the event, are you sure?';
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${screamId}`, {
          cancelled: cancelled,
        }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateScream = (scream) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      dispatch(asyncActionStart());

      await firestore.update(`screams/${scream.id}`, scream);
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Post has been updated');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

// export const loadScreams = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(asyncActionStart());
//       const screams = await fetchSampleData();
//       dispatch({ type: FETCH_SCREAMS, payload: { screams } });
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       console.log(error);
//       dispatch(asyncActionError());
//     }
//   };
// };

// export const getScreamsForDashboard = () => async (dispatch, getState) => {
//   let today = new Date();
//   const firestore = firebase.firestore();
//   const screamsQuery = firestore
//     .collection('screams')
//     .where('date', '>=', today);
//   console.log(screamsQuery);
// };

export const getScreamsForDashboard = () => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const screamsQuery = firestore.collection('screams');
  // console.log(screamsQuery);

  try {
    dispatch(asyncActionStart());

    let querySnap = await screamsQuery.get();

    // if (querySnap.docs.length === 0) {
    //   dispatch(asyncActionFinish());
    //   return querySnap;
    // }

    let screams = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      screams.push(evt);
    }
    console.log(screams);

    dispatch({ type: FETCH_SCREAMS, payload: { screams } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

// export const getScreamsForDashboard = (lastScream) => async (
//   dispatch,
//   getState
// ) => {
//   let today = new Date(Date.now());
//   const firestore = firebase.firestore();
//   const screamsRef = firestore.collection('screams');
//   try {
//     dispatch(asyncActionStart());
//     let startAfter =
//       lastScream &&
//       (await firestore.collection('screams').doc(lastScream.id).get());
//     let query;

//     lastScream
//       ? (query = screamsRef
//           .where('date', '>=', today)
//           .orderBy('createdAt', 'desc')
//           .startAfter(startAfter)
//           .limit(2))
//       : (query = screamsRef
//           // .where('date', '>=', today)
//           .orderBy('createdAt', 'desc')
//           .limit(2));

//     let querySnap = await query.get();

//     if (querySnap.docs.length === 0) {
//       dispatch(asyncActionFinish());
//       return querySnap;
//     }

//     let screams = [];

//     for (let i = 0; i < querySnap.docs.length; i++) {
//       let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
//       screams.push(evt);
//     }
//     console.log(query);
//     dispatch({ type: FETCH_SCREAMS, payload: { screams } });
//     dispatch(asyncActionFinish());
//     return querySnap;
//   } catch (error) {
//     console.log(error);
//     dispatch(asyncActionError());
//   }
// };

export const addScreamComment = (screamId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
  };
  try {
    await firebase.push(`scream_chat/${screamId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error('Oops', 'Problem adding comment');
  }
};
