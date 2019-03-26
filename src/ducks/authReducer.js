const initialState = {
  authError: null,
  user: [],
  billsFavored: [],
  politiciansFavored: [],
  politiciansOpposed: [],
  billsOpposed: []
};

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const SIGNUP = "SIGNUP";
const UPDATE = "UPDATE";
const BILLFAVOR = "BILLFAVOR";
const BILL_OPPOSE = "BILL_OPPOSE"
const GETBILLSFAVORED = "GETBILLSFAVORED";
const GET_BILLS_OPPOSED = "GET_BILLS_OPPOSED"
const GETUSER = "GETUSER";
const POLITICIANFAVOR = "POLITICIANFAVOR";
const GETPOLITICIANSFAVORED = "GETPOLITICIANSFAVORED";
const POLITICIANOPPOSE = "POLITICIANOPPOSE"
const GETPOLITICIANSOPPOSED = "GETPOLITICIANSOPPOSED"

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

export const getBillsOpposed = ()=>{
  return (dispatch,getState,{getFirebase, getFirestore})=>{
    const firebase = getFirebase()
    const firestore = getFirestore()

    firestore.collection("users")
    . doc(firebase.auth().currentUser.uid)
    .collection("bills-opposed")
    .get()
    .then(querySnapshot=>{
      const dataArray =[];
      querySnapshot.forEach((doc)=>{
        dataArray.push(doc.data())
      })
      return dataArray
    }).then(response=>{
      dispatch({
        type: `${GET_BILLS_OPPOSED}_SUCCESS`,
        payload: response
      })
    })
  }
}

export const politicianFavor = poliDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const split = poliDetails["id"].split("-");
    const id = split[0];
    const name = poliDetails["name"];
    const title = poliDetails["title"];
    const state = poliDetails["state"];
    const party = poliDetails["party"];

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("politicians-favored")
      .doc(poliDetails["id"])
      .set({
        id,
        name,
        title,
        state,
        party
      })
      .then(() => {
        dispatch({ type: `${POLITICIANFAVOR}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${POLITICIANFAVOR}_ERROR`, err });
      });
  };
};

export const getPoliticiansFavored = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("politicians-favored")
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
        dispatch({ type: `${GETPOLITICIANSFAVORED}_SUCCESS`, payload: response });
      });
  };
};

export const politicianOppose = poliDetails => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

  const split = poliDetails["id"].split("-");
  const id = split[0];
  const name = poliDetails["name"];
  const title = poliDetails["title"];
  const state = poliDetails["state"];
  const party = poliDetails["party"];
  firestore
  .collection("users")
  .doc(firebase.auth().currentUser.uid)
  .collection("politicians-favored")
  .doc(poliDetails["id"])
  .set({
    id,
    name,
    title,
    state,
    party
  })
      .then(() => {
        dispatch({ type: `${POLITICIANOPPOSE}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${POLITICIANOPPOSE}_ERROR`, err });
      });
  };
}


export const getPoliticiansOpposed = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("politicians-opposed")
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
        dispatch({ type: `${GETPOLITICIANSOPPOSED}_SUCCESS`, payload: response });
      });
  };
};


export const billOppose=(billDetails)=>{
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
      });
  }
}

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
    case `${POLITICIANFAVOR}_SUCCESS`:
      return { ...state };
    case `${POLITICIANFAVOR}_ERROR`:
      return { ...state };
    case `${GETBILLSFAVORED}_SUCCESS`:
      return { ...state, billsFavored: action.payload };
    case `${GETPOLITICIANSFAVORED}_SUCCESS`:
      return { ...state, politiciansFavored: action.payload };
    case `${GETPOLITICIANSOPPOSED}_SUCCESS`:
      return { ...state, politiciansOpposed: action.payload };
    case `${BILL_OPPOSE}_SUCCESS`:
      return {...state};
    case `${BILL_OPPOSE}_ERROR`:
      return{...state};
    case `${GET_BILLS_OPPOSED}_SUCCESS`:
      return {...state, billsOpposed: action.payload};
    default:
      return state;
  }
};

export default authReducer;
