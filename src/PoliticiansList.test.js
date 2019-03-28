const JestTest = require("./PoliticianFunctions")
test("please just work", () => {
  expect(JestTest.jestcommunicationtest(3)).toEqual(4);
});

// test("Bill Details page renders",()=>{
//   const component = renderer.create(
//   <Provider store = {store}>
//     <Router>
//       <PoliticianDetails match = {{params:{id:"F000468"}}}/>
//     </Router> 
//   </Provider>
//   )
//   expect(component.toJSON()).toMatchSnapshot();
// })
