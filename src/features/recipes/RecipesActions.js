import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from './RecipesConstants';

export const createRecipe = (recipe) => {
  return {
    type: CREATE_RECIPE,
    payload: {
      recipe,
    },
  };
};

export const updateRecipe = (recipe) => {
  return {
    type: UPDATE_RECIPE,
    payload: {
      recipe,
    },
  };
};

export const deleteRecipe = (recipe) => {
  return {
    type: DELETE_RECIPE,
    payload: {
      recipe,
    },
  };
};
