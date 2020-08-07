import { createReducer } from '../../app/common/util/reducerUtils';
import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
} from './screamConstants';

const initialState = [
  {
    id: '1',
    date: '2018-03-27',
    body: 'Bobbys Scream',
    hostedBy: 'Bobby',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    commentCount: 0,
    likeCount: 0,
    category: 'food',
  },
  {
    id: '2',
    date: '2018-03-28',
    body: 'Tommys Scream',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    commentCount: 0,
    likeCount: 0,
    category: 'music',
  },
];

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
  return payload.screams;
};

export default createReducer(initialState, {
  [CREATE_SCREAM]: createScream,
  [UPDATE_SCREAM]: updateScream,
  [DELETE_SCREAM]: deleteScream,
  [FETCH_SCREAMS]: fetchScreams,
});
