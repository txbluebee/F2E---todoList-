import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB_-__XYF2AM9oiQ-aOpGCYJZ3VB97Q8jE",
  authDomain: "ui-challenge-73b14.firebaseapp.com",
  databaseURL: "https://ui-challenge-73b14.firebaseio.com",
  projectId: "ui-challenge-73b14",
  storageBucket: "ui-challenge-73b14.appspot.com",
  messagingSenderId: "413218096250"
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const tasksRef = databaseRef.child('tasks');