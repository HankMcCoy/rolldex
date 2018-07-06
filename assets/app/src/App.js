// @flow

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'

import Layout from './layout'
import theme from './theme'
import Systems from './views/systems'
import Campaigns from './views/campaigns'

class App extends Component<{}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Route exact path="/" render={() => <Redirect to="/campaigns" />} />
            <Route path="/systems" component={Systems} />
            <Route path="/campaigns" component={Campaigns} />
          </Layout>
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
