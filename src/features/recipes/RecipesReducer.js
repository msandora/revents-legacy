import { createReducer } from '../../app/common/util/reducerUtils';
import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPES,
} from './RecipesConstants';

const initialState = [
  {
    id: '1',
    title: 'Green Eggs and Ham!',
    date: '2018-03-27',
    category: 'Breakfast',
    ingredients: '2 Eggs, 1 slice of Ham',
    body: 'I do not like Green Eggs and Ham.',
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    commentCount: 0,
    likeCount: 0,
  },
  {
    id: '2',
    title: 'Chocolate Chip Pancakes',
    date: '2018-03-28',
    category: 'Breakfast',
    ingredients: 'Pancake mix, Chocolate Chips',
    body: 'I love Pancakes.',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    commentCount: 0,
    likeCount: 0,
  },
];

const createRecipe = (state, payload) => {
  return [...state, payload.recipe];
};

const updateRecipe = (state, payload) => {
  return [
    ...state.filter((recipe) => recipe.id !== payload.recipe.id),
    payload.recipe,
  ];
};

const deleteRecipe = (state, payload) => {
  return [...state.filter((recipe) => recipe.id !== payload.recipeId)];
};

const fetchRecipes = (state, payload) => {
  return payload.recipes;
};

export default createReducer(initialState, {
  [CREATE_RECIPE]: createRecipe,
  [UPDATE_RECIPE]: updateRecipe,
  [DELETE_RECIPE]: deleteRecipe,
  [FETCH_RECIPES]: fetchRecipes,
});
