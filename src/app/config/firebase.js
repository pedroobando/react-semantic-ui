import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-ijZUfvXPj1DKGx5cjXnkdOSHUEg_i0s',
  authDomain: 'reventscourse-c8e88.firebaseapp.com',
  projectId: 'reventscourse-c8e88',
  storageBucket: 'reventscourse-c8e88.appspot.com',
  messagingSenderId: '215525523186',
  appId: '1:215525523186:web:985dfed21b9251db1e9a6b',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
