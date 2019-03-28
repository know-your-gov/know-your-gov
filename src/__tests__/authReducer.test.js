import authReducer from "../ducks/authReducer";
import { initialState } from "../ducks/authReducer";

describe("authReducer", () => {
  test("check if bill id is used in billFavor function", () => {
    let billDetails = {
      bill_id: "h234-115"
    };
    expect(authReducer.billFavor(billDetails)).toEqual(expect.anything());
  });

  test("check addition function to test jest", () => {
    expect(authReducer.add(1, 2)).toEqual(3);
  });
});

/*

  test('check if bill id is used in billFavor function',()=>{
    const mock = jest.fn()
    authReducer.billFavor(mock)
    expect().toBeCalledWith(expect.objectContaining({
      bill_id: expect.stringContaining(String)
    }))
  })


  it("should set a document", () => {
    var data = {};
    return db.collection("users").doc("newUserId").collection("bills-favored").doc("newBillId").set(data)

    // [END cities_document_set]
});

*/
