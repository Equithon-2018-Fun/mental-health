import firebase from 'firebase';
require('firebase/firestore');

// Firebase config
let config = {
  apiKey: "AIzaSyB8H2lQVjaMNs-sccbvQ4RFSAt8Y5-z5Lo",
  authDomain: "equithon-9a961.firebaseapp.com",
  databaseURL: "https://equithon-9a961.firebaseio.com",
  projectId: "equithon-9a961",
  storageBucket: "equithon-9a961.appspot.com",
  messagingSenderId: "635616840469"
};

firebase.initializeApp(config);

const db = firebase.firestore();
export { db };