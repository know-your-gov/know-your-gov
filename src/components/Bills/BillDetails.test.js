import React from 'react'
import renderer from 'react-test-renderer'
import BillDetails from './BillDetails'
import {Provider} from 'react-redux'
import store from '../../ducks/store'
import {BrowserRouter as Router} from 'react-router-dom'


test("Bill Details page renders",()=>{
  const component = renderer.create(
  <Provider store = {store}>
    <Router>
      <BillDetails match = {{params:{billId:"h234-115"}}}/>
    </Router> 
  </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot();
})
