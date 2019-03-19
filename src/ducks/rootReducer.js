import authReducer from "./authReducer";
import { combineReducers } from "redux";
//Sync Data from Database
import { firestoreReducer } from "redux-firestore";
//Sync Auth status from firebase
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
