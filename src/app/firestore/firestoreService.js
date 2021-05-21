/* eslint-disable no-useless-catch */
/* eslint-disable no-prototype-builtins */
import cuid from 'cuid';
import firebase from '../config/firebase';

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const ListenToEventsFromFirestore = () => {
  return db.collection('events');
};

export const ListenToEventFromFirestore = (eventId) => {
  return db.collection('events').doc(eventId);
};

export const addEventToFirestore = (event) => {
  const user = firebase.auth().currentUser;
  return db.collection('events').add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
};

export const updateEventInFirestore = (event) => {
  return db.collection('events').doc(event.id).update(event);
};

export const deleteEventInFirestore = (eventId) => {
  return db.collection('events').doc(eventId).delete();
};

export const cancelEventToggle = (event) => {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
};

export const setUserProfileData = (user) => {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getUserProfile = (userId) => {
  return db.collection('users').doc(userId);
};

export const updateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;

  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection('users').doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userUid) => {
  return db.collection('users').doc(userUid).collection('photos');
};

export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;
  try {
    await db.collection('users').doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePhotoFromCollection = (photoId) => {
  const userUid = firebase.auth().currentUser.uid;
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
};
