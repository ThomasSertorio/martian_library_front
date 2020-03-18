import React from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'
// Components
import Provider from './components/provider'
import SignIn from './components/sign_in'
import Library from './components/library'
import AddItemForm from './components/add_item_form'


render(
  <Provider>
    <SignIn />
    <AddItemForm />
    <Library />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
