import BillDetails from "../components/Bills/BillDetails";

const initialState = {
  authError: null,
  billsFavored: []
};

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const SIGNUP = "SIGNUP";
const UPDATE = "UPDATE";
const BILLFAVOR = "BILLFAVOR";
const GETBILLSFAVORED = "GETBILLSFAVORED";

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: `${SIGNIN}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${SIGNIN}_ERROR`, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: `${SIGNOUT}_SUCCESS` });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            address: newUser.address,
            city: newUser.city,
            state: newUser.state,
            zip: newUser.zip
          });
      })
      .then(() => {
        dispatch({ type: `${SIGNUP}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${SIGNUP}_ERROR`, err });
      });
  };
};

export const updateAccount = newInfo => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        address: newInfo.address,
        city: newInfo.city,
        state: newInfo.state,
        zip: newInfo.zip
      })
      .then(() => {
        dispatch({ type: `${UPDATE}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${UPDATE}_ERROR`, err });
      });
  };
};

export const billFavor = billDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const split = billDetails["bill_id"].split("-");
    const congress = split[1];
    const billSlug = split[0];
    const title = billDetails.title;
    const committee = billDetails.committees;

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("bills-favored")
      .doc(billDetails["bill_id"])
      .set({
        congress,
        billSlug,
        title,
        committee
      })
      .then(() => {
        dispatch({ type: `${BILLFAVOR}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${BILLFAVOR}_ERROR`, err });
      });
  };
};

export const getBillsFavored = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("bills-favored")
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(function(doc) {
          dataArray.push(doc.data());
        });
        return dataArray;
      })
      .then(response => {
        console.log(response);
        dispatch({ type: `${GETBILLSFAVORED}_SUCCESS`, payload: response });
      });
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNIN}_ERROR`:
      console.log(action);
      return { ...state, authError: action.err.message };
    case `${SIGNIN}_SUCCESS`:
      return { ...state, authError: null };
    case `${SIGNOUT}_SUCCESS`:
      console.log("signout success");
      return state;
    case `${SIGNUP}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${SIGNUP}_SUCCESS`:
      return { ...state, authError: null };
    case `${UPDATE}_SUCCESS`:
      return { ...state, authError: null };
    case `${UPDATE}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${BILLFAVOR}_SUCCESS`:
      return { ...state };
    case `${BILLFAVOR}_ERROR`:
      return { ...state };
    case `${GETBILLSFAVORED}_SUCCESS`:
      return { ...state, billsFavored: action.payload };
    default:
      return state;
  }
};

export default authReducer;
