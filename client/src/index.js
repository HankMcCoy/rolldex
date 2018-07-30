// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.render(<App />, rootEl)
} else {
  throw new Error('Oops! No #root element found to render the app into.')
}
