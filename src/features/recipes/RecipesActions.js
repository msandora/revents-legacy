import { toastr } from 'react-redux-toastr';
import { createNewRecipe } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import { DELETE_RECIPE, FETCH_RECIPES } from './RecipesConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';

export const createRecipe = (recipe) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newRecipe = createNewRecipe(user, photoURL, recipe);
    try {
      dispatch(asyncActionStart());
      let createdRecipe = await firestore.add('recipes', newRecipe);
      await firestore.set(`recipe_attendee/${createdRecipe.id}_${user.uid}`, {
        recipeId: createdRecipe.id,
        userUid: user.uid,
        recipeDate: recipe.date,
        host: true,
      });
      toastr.success('Success!', 'Recipe has been created');
      dispatch(asyncActionFinish());
      return createdRecipe;
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const deleteRecipe = (recipeId) => {
  return {
    type: DELETE_RECIPE,
    payload: {
      recipeId,
    },
  };
};

export const updateRecipe = (recipe) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      dispatch(asyncActionStart());
      let recipeDocRef = firestore.collection('recipes').doc(recipe.id);
      let dateEqual = getState().firestore.ordered.recipes[0].date.isEqual(
        recipe.date
      );
      if (!dateEqual) {
        let batch = firestore.batch();
        batch.update(recipeDocRef, recipe);

        let recipeAttendeeRef = firestore.collection('recipe_attendee');
        let recipeAttendeeQuery = await recipeAttendeeRef.where(
          'recipeId',
          '==',
          recipe.id
        );
        let recipeAttendeeQuerySnap = await recipeAttendeeQuery.get();

        for (let i = 0; i < recipeAttendeeQuerySnap.docs.length; i++) {
          let recipeAttendeeDocRef = firestore
            .collection('recipe_attendee')
            .doc(recipeAttendeeQuerySnap.docs[i].id);

          batch.update(recipeAttendeeDocRef, {
            recipeDate: recipe.date,
          });
        }
        await batch.commit();
      } else {
        await recipeDocRef.update(recipe);
      }
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Recipe has been updated');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const getRecipesForDashboard = (lastRecipe) => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const recipesRef = firestore.collection('recipes');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastRecipe &&
      (await firestore.collection('recipes').doc(lastRecipe.id).get());
    let query;
    console.log(today);
    lastRecipe
      ? (query = recipesRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
      : (query = recipesRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let recipes = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      recipes.push(evt);
    }
    dispatch({ type: FETCH_RECIPES, payload: { recipes } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
