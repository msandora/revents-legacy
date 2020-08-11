import { createReducer } from '../../app/common/util/reducerUtils';
import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from './screamConstants';

const initialState = [];

const createScream = (state, payload) => {
  return [...state, payload.scream];
};

const updateScream = (state, payload) => {
  return [
    ...state.filter((scream) => scream.id !== payload.scream.id),
    payload.scream,
  ];
};

const deleteScream = (state, payload) => {
  return [...state.filter((scream) => scream.id !== payload.screamId)];
};

const fetchScreams = (state, payload) => {
  return {
    ...state,
    screams: payload.screams,
  };
};

const likeScream = (state, payload) => {
  let screamIndex = state.screams.findIndex(
    (scream) => scream.id === payload.scream.id
  );
  console.log('likeScream', screamIndex);
  // state.screams[screamIndex] = payload;
  // if (state.scream.screamId === payload.scream.id) {
  //   state.scream = { ...state.scream, ...payload };
  // }
  return { ...state, data: state.data + 1 };
};

const unlikeScream = (state, payload) => {
  return { ...state, data: state.data - 1 };
};

export default createReducer(initialState, {
  [CREATE_SCREAM]: createScream,
  [UPDATE_SCREAM]: updateScream,
  [DELETE_SCREAM]: deleteScream,
  [FETCH_SCREAMS]: fetchScreams,
  [LIKE_SCREAM]: likeScream,
  [UNLIKE_SCREAM]: unlikeScream,
});
