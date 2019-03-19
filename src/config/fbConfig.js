import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAMaIjjfZy96z1XxGF5pZPJCA8KiAAtIVI",
  authDomain: "knowyourgov-bfddd.firebaseapp.com",
  databaseURL: "https://knowyourgov-bfddd.firebaseio.com",
  projectId: "knowyourgov-bfddd",
  storageBucket: "knowyourgov-bfddd.appspot.com",
  messagingSenderId: "219874119115"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
