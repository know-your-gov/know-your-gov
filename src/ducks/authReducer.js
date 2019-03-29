const initialState = {
  authError: null,
  user: [],
  billsFavored: [],

  billsOpposed: [],
  billVotes: [],
};

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const SIGNUP = "SIGNUP";
const UPDATE = "UPDATE";
const BILLFAVOR = "BILLFAVOR";
const BILL_OPPOSE = "BILL_OPPOSE";
const GETBILLSFAVORED = "GETBILLSFAVORED";
const GET_BILLS_OPPOSED = "GET_BILLS_OPPOSED";
const GETUSER = "GETUSER";
const DELETE_BILL = "DELETE_BILL";

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

export const add = (num1, num2) => {
  return num1 + num2;
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

export const getUser = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const userData = [];
    const docRef = firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    docRef
      .get()
      .then(doc => {
        userData.push(doc.data());
        return userData;
      })
      .then(response => {
        /*console.log(response);*/
        dispatch({ type: `${GETUSER}_SUCCESS`, payload: response });
      })
      .catch(err => {
        dispatch({ type: `${GETUSER}_ERROR`, err });
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
      })
      .then(() => {
        firestore
          .collection("bills-favored")
          .doc(billDetails["bill_id"])
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            user: firebase.auth().currentUser.uid,
            vote: 1
          });
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

export const getBillsOpposed = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("bills-opposed")
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(doc => {
          dataArray.push(doc.data());
        });
        return dataArray;
      })
      .then(response => {
        dispatch({
          type: `${GET_BILLS_OPPOSED}_SUCCESS`,
          payload: response
        });
      });
  };
};

export const getBillVotes = bill_id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("bills-favored")
      .doc(bill_id)
      .collection("users")
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(function(doc) {
          dataArray.push(doc.data());
        });
        return dataArray;
      })
      .then(response => {
        dispatch({
          type: "GETBILLVOTES_SUCCESS",
          payload: response
        });
      })
      .then(response => {
        firestore
          .collection("bills-opposed")
          .doc(bill_id)
          .collection("users")
          .get()
          .then(querySnapshot => {
            const dataArray = [];
            querySnapshot.forEach(function(doc) {
              dataArray.push(doc.data());
            });
            return dataArray;
          });
      });
  };
};

export const billOppose = billDetails => {
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
      .collection("bills-opposed")
      .doc(billDetails["bill_id"])
      .set({
        congress,
        billSlug,
        title,
        committee
      })
      .then(() => {
        dispatch({ type: `${BILL_OPPOSE}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${BILL_OPPOSE}_ERROR`, err });
      })
      .then(response => {
        firestore
          .collection("bills-opposed")
          .doc(billDetails["bill_id"])
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            user: firebase.auth().currentUser.uid,
            vote: 1
          });
      });
  };
};

export const deleteBill = (loc, billId) => {
  console.log({ collection: loc, billId });
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection(loc)
      .doc(billId)
      .delete()
      .then(() => {
        console.log("success");
        dispatch({ type: `${DELETE_BILL}_SUCCESS` });
        console.log("success");
      })
      .catch(err => dispatch({ type: `${DELETE_BILL}_ERROR` }));
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNIN}_ERROR`:
      // console.log(action);
      return { ...state, authError: action.err.message };
    case `${SIGNIN}_SUCCESS`:
      return { ...state, authError: null };
    case `${SIGNOUT}_SUCCESS`:
      // console.log("signout success");
      return state;
    case `${SIGNUP}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${SIGNUP}_SUCCESS`:
      return { ...state, authError: null };
    case `${UPDATE}_SUCCESS`:
      return { ...state, authError: null };
    case `${UPDATE}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${GETUSER}_SUCCESS`:
      // console.log(action);
      return { ...state, user: action.payload[0] };
    case `${GETUSER}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${BILLFAVOR}_SUCCESS`:
      return { ...state };
    case `${BILLFAVOR}_ERROR`:
      return { ...state };

    case `${GETBILLSFAVORED}_SUCCESS`:
      return { ...state, billsFavored: action.payload };

    case `${BILL_OPPOSE}_SUCCESS`:
      return { ...state };
    case `${BILL_OPPOSE}_ERROR`:
      return { ...state };
    case `${GET_BILLS_OPPOSED}_SUCCESS`:
      return { ...state, billsOpposed: action.payload };
    case `${DELETE_BILL}_SUCCESS`:
      return { ...state };
    case "GETBILLVOTES_SUCCESS":
      console.log(action);
      return { ...state, billVotes: action.payload };

    default:
      return state;
  }
};

export default authReducer;
