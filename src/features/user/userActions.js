import { toastr } from 'react-redux-toastr';

// No need for contants or reducer since we use firebase
export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success('Success', 'Your profile has been updated');
  } catch (error) {
    console.log(error);
  }
};
