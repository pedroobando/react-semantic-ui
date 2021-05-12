/* eslint-disable no-useless-catch */
import firebase from '../config/firebase';

export const signInWithEmail = (creds) => {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};
export const registerInFirebase = async (creds) => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    return await result.user.updateProfile({ displayName: creds.displayName });
  } catch (error) {
    throw error;
  }
};
