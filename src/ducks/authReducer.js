const initialState = {
  authError: null
};

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const SIGNUP = "SIGNUP";

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
            email: newUser.email,
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
    case `${SIGNUP}_SUCCES`:
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
