const initialState = {
  authError: null,
  user: [],
  politiciansFavored: [],
  politiciansOpposed: [],
  politicianVotes: [],
  politicianOpposedVotes: []
};

const GETUSER = "GETUSER";
const POLITICIANFAVOR = "POLITICIANFAVOR";
const GETPOLITICIANSFAVORED = "GETPOLITICIANSFAVORED";
const POLITICIANOPPOSE = "POLITICIANOPPOSE";
const GETPOLITICIANSOPPOSED = "GETPOLITICIANSOPPOSED";
const GETPOLITICIANVOTES = "GETPOLITICIANVOTES"
const GETPOLITICIANOPPOSEDVOTES="GETPOLITICIANOPPOSEDVOTES"
const DELETEPOLITICIAN = "DELETEPOLITICIAN"

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

export const getPoliticianVotes = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("politicians-favored")
      .doc(id)
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
          type: `${GETPOLITICIANVOTES}_SUCCESS`,
          payload: response
        });
      })
  };
};

export const getPoliticianOpposedVotes = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("politicians-opposed")
      .doc(id)
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
          type: `${GETPOLITICIANOPPOSEDVOTES}_SUCCESS`,
          payload: response
        });
      })
  };
};

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
      })
      .then(() => {
        firestore
          .collection("politicians-favored")
          .doc(poliDetails["id"])
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            user: firebase.auth().currentUser.uid,
            vote: 1
          });
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
        dispatch({
          type: `${GETPOLITICIANSFAVORED}_SUCCESS`,
          payload: response
        });
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
      .collection("politicians-opposed")
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
      })
      .then(() => {
        firestore
          .collection("politicians-opposed")
          .doc(poliDetails["id"])
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            user: firebase.auth().currentUser.uid,
            vote: 1
          });
      });
  };
};

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
        dispatch({
          type: `${GETPOLITICIANSOPPOSED}_SUCCESS`,
          payload: response
        });
      });
  };
};

export const deletePolitician = (loc, id) => {
    console.log({ collection: loc, id });
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
      firestore
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(loc)
        .doc(id)
        .delete()
        .then(() => {
          console.log("success");
          dispatch({ type: `${DELETEPOLITICIAN}_SUCCESS` });
          console.log("success");
        })
        .catch(err => dispatch({ type: `${DELETEPOLITICIAN}_ERROR` }));
    };
  };
  

const politicianReducer = (state = initialState, action) => {
  switch (action.type) {

    case `${GETUSER}_SUCCESS`:
      // console.log(action);
      return { ...state, user: action.payload[0] };
    case `${GETUSER}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${POLITICIANFAVOR}_SUCCESS`:
      return { ...state };
    case `${POLITICIANFAVOR}_ERROR`:
      return { ...state };
    case `${POLITICIANOPPOSE}_SUCCESS`:
      return { ...state };
    case `${POLITICIANOPPOSE}_ERROR`:
      return { ...state };
    case `${GETPOLITICIANSFAVORED}_SUCCESS`:
      return { ...state, politiciansFavored: action.payload };
    case `${GETPOLITICIANSOPPOSED}_SUCCESS`:
      return { ...state, politiciansOpposed: action.payload };
    case `${GETPOLITICIANVOTES}_SUCCESS`:
    //   console.log(action);
      return { ...state, politicianVotes: action.payload };
    case `${GETPOLITICIANOPPOSEDVOTES}_SUCCESS`:
    //   console.log(action);
      return { ...state, politicianOpposedVotes: action.payload };
    case `${DELETEPOLITICIAN}_SUCCESS`:
      return { ...state };
      
    default:
      return state;
  }
};

export default politicianReducer