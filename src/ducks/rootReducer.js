import authReducer from "./authReducer";
import poliReducer from "./politicianReducer"
import { combineReducers } from "redux";
//Sync Data from Database
import { firestoreReducer } from "redux-firestore";
//Sync Auth status from firebase
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  politicians: poliReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
