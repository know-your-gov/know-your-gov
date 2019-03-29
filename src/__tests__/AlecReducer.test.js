import {
  billFavor,
  add,
  getPoliticianVotes,
  politicianFavor,
  politicianOppose
} from "../ducks/authReducer";
import { initialState } from "../ducks/authReducer";

describe("authReducer", () => {
  it("check if bill id is used in billFavor function", () => {
    let billDetails = {
      bill_id: "h234-115"
    };
    expect(billFavor(billDetails)).toEqual(expect.anything());
  });

  it("check addition function to test jest", () => {
    expect(add(1, 2)).toEqual(3);
  });
});

test("getting favored politicians returns anything", () => {
  let politicianID = {
    id: "A000378"
  };
  expect(politicianFavor(politicianID)).toEqual(expect.anything());
});

test("getPoliticianVotes returns something", () => {
  let politicianID = {
    id: "H001042"
  };
  expect(getPoliticianVotes(politicianID)).toBeDefined();
});

test("politicianOppose comes back defined", () => {
  let politicianID = {
    id: "M001202"
  };
  expect(getPoliticianVotes(politicianID)).toBeDefined();
});

test("getting politicians favored comes back defined", () => {
  let politicianID = {
    id: "H001072"
  };
  expect(getPoliticianVotes(politicianID)).toBeDefined();
});

test("getting politicians opposed comes back defined", () => {
  let politicianID = {
    id: "R000591"
  };
  expect(getPoliticianVotes(politicianID)).toBeDefined();
});

//   test('check if bill id is used in billFavor function',()=>{
//     const mock = jest.fn()
//     authReducer.billFavor(mock)
//     expect().toBeCalledWith(expect.objectContaining({
//       bill_id: expect.stringContaining(String)
//     }))
//   })

//   it("should set a document", () => {
//     var data = {};
//     return db.collection("users").doc("newUserId").collection("bills-favored").doc("newBillId").set(data)

//     // [END cities_document_set]
// });