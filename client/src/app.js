// @flow

import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import {
  type StoreEnhancer,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'

import Layout from './layout'
import theme from './theme'
import Systems from './views/systems'
import Campaigns from './views/campaigns'
import reducer from './reducer'
import ModalsPresenter from './modals/presenter'
import { showModal, hideModal } from './modals/action-creators'
import JumpTo from './modals/jump-to'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const storeEnhancer: StoreEnhancer<*, *, *> = composeEnhancers(
  applyMiddleware(thunk),
)
const store = createStore(reducer, storeEnhancer)

class GlobalKeyListener extends Component<{}> {
  render() {
    return null
  }
  componentDidMount() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        store.dispatch(hideModal())
      }
      if (event.key === 'k' && event.metaKey) {
        this.showModal(<JumpTo close={() => store.dispatch(hideModal())} />)
      }
    })
  }
  showModal(modal) {
    setTimeout(() => {
      store.dispatch(showModal(modal))
    }, 0)
  }
}

class App extends Component<{}> {
  render() {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <React.Fragment>
              <GlobalKeyListener />
              <Layout>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/campaigns" />}
                />
                <Route path="/systems" component={Systems} />
                <Route path="/campaigns" component={Campaigns} />
              </Layout>
              <ModalsPresenter />
            </React.Fragment>
          </Router>
        </ThemeProvider>
      </ReduxProvider>
    )
  }
}

export default App
