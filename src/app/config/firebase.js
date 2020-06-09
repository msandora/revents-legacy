import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCvhJgcBOCFw7HcSGXU1f6B3Ez31J7oSbE',
  authDomain: 'socialfamilyapp.firebaseapp.com',
  databaseURL: 'https://socialfamilyapp.firebaseio.com',
  projectId: 'socialfamilyapp',
  storageBucket: 'socialfamilyapp.appspot.com',
  messagingSenderId: '936564498134',
  appId: '1:936564498134:web:8ca3a7b73f4c57e4343377',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
