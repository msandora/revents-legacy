import { createReducer } from '../../app/common/util/reducerUtils';
import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
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

export default createReducer(initialState, {
  [CREATE_SCREAM]: createScream,
  [UPDATE_SCREAM]: updateScream,
  [DELETE_SCREAM]: deleteScream,
  [FETCH_SCREAMS]: fetchScreams,
});
