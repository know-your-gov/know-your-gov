import {
  signOut,
  billFavor,
  getBillsFavored,
  getPoliticiansFavored,
  getPoliticiansOpposed
} from "../ducks/authReducer";
import { initialState } from "../ducks/authReducer";
import "firebase/firestore";
import "firebase/auth";

describe("sam auth reducer test", () => {
  it("signout function exists", () => {
    expect(signOut()).toBeDefined();
  });

  it("bills can be favored", () => {
    const billDetails = { bill_id: "h234-115" };
    expect(billFavor(billDetails)).toBeDefined();
  });

  it("get bills favored function exists", () => {
    expect(getBillsFavored()).toBeDefined();
  });

  it("get politicians favored function exists", () => {
    expect(getPoliticiansFavored()).toBeDefined();
  });

  it("get politicians opposed function exists", () => {
    expect(getPoliticiansOpposed()).toBeDefined();
  });

  // it('get bills favored works',()=>{
  //   const ans = getBillsFavored()
  //   expect(initialState.billsFavored.length).toBeGreaterThan(0)

  // })

  /*
  const app = firebase.initializeApp(creds);
  const db = firebase.firestore();

  const creds = {
    apiKey: "AIzaSyAMaIjjfZy96z1XxGF5pZPJCA8KiAAtIVI",
    authDomain: "knowyourgov-bfddd.firebaseapp.com",
    projectId: "knowyourgov-bfddd",
  }
  */
});
