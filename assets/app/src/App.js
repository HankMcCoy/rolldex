// @flow

import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'

import Layout from './layout'
import theme from './theme'
import Systems from './views/systems'
import Campaigns from './views/campaigns'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

class App extends Component<{}> {
  render() {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/campaigns" />}
              />
              <Route path="/systems" component={Systems} />
              <Route path="/campaigns" component={Campaigns} />
            </Layout>
          </Router>
        </ThemeProvider>
      </ReduxProvider>
    )
  }
}

export default App
