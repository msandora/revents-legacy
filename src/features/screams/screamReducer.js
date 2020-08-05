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
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    hostedBy: 'Bobby',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    commentCount: 0,
    likeCount: 0,
  },
  {
    id: '2',
    date: '2018-03-28',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    commentCount: 0,
    likeCount: 0,
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
