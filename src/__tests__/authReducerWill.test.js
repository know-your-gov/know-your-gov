import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { signUp } from "../ducks/authReducer";

describe("firestore", () => {
  const config = {
    apiKey: "AIzaSyAMaIjjfZy96z1XxGF5pZPJCA8KiAAtIVI",
    authDomain: "knowyourgov-bfddd.firebaseapp.com",
    projectId: "knowyourgov-bfddd"
  };
  const app = firebase.initializeApp(config);
  const db = firebase.firestore(app);

  it("should set a user document", () => {
    let data = {
      address: "100 test street",
      city: "Jest City",
      state: "TX",
      zip: "75201"
    };

    return db
      .collection("users")
      .doc("test-user-id")
      .set(data);
  });

  it("should update user info", () => {
    let data = {};

    return db
      .collection("users")
      .doc("test-user-id")
      .update(data);
  });

  it("should set bills-favored", () => {
    let data = {};

    return db
      .collection("users")
      .doc("test-user-id")
      .collection("bills-favored")
      .doc("test-bill-id")
      .set(data);
  });

  it("get all bills favored", () => {
    return db
      .collection("users")
      .doc("test-user-id")
      .collection("bills-favored")
      .get()
      .then(querySnapshot => {
        const dataArray = [];
        querySnapshot.forEach(doc => {
          dataArray.push(doc.data());
        });
      });
  });

  it("should add a vote bills-favored collection", () => {
    let data = {
      user: "test-user-id",
      vote: 1
    };

    return db
      .collection("bills-favored")
      .doc("test-bill-id")
      .collection("user")
      .doc("test-user-id")
      .set(data);
  });
});

// describe("signUp", () => {
//   it("should be called with an object", () => {
//     const newUser = {
//       email: "",
//       password: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: ""
//     };

//     const mock = jest.fn(() => newUser);
//     signUp(mock);

//     expect(mock).toHaveBeenCalledWith(
//       expect.objectContaining({
//         email: expect.any(String),
//         password: expect.any(String),
//         address: expect.any(String),
//         city: expect.any(String),
//         state: expect.any(String),
//         zip: expect.any(String)
//       })
//     );
//   });
// });
