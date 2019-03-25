import React from 'react';
import Navbar from '../../src/components/Navbar';
import renderer from 'react-test-renderer';
 
test('Can see header', () => {
  const component = renderer.create(
    <Navbar />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// const arrayTest = require('./test1')


// test('the data is an array', () => {
//     return arrayTest("TX").then(data => {
//       expect(data).toEqual(expect.not.arrayContaining(['test']));
//     });
//   });



// import * as PoliList from "./src/components/Politicians/PoliticianList"

// const sum = require('./test1')

// test("testing babel with sum", () => {
//     expect(sum(1, 2)).toBe(3);
// })

// it('works with promises', () => {
//     expect.assertions(1);
//     return PoliList.jestTestSuccess().then(data => expect(data).toEqual('test works'));
//   });

