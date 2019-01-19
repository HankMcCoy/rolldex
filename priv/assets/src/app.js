// @flow

import React, { Component } from 'react'

import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'

import history from './history'
import Layout from './layout'
import theme from './theme'
import ModalsPresenter from './modals/presenter'
import Campaigns from './views/campaigns'
import Login from './views/auth/login'
import Register from './views/auth/register'
import { AuthProvider } from './domains/auth'
import { CampaignProvider } from 'r/domains/campaigns'

class App extends Component<{}> {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<CampaignProvider>
					<Router history={history}>
						<React.Fragment>
							<Switch>
								<Route
									exact
									path="/"
									render={() => <Redirect to="/campaigns" />}
								/>
								<Route exact path="/login" component={Login} />
								<Route exact path="/register" component={Register} />
								<Route
									render={() => (
										<AuthProvider>
											<Layout>
												<Switch>
													<Route path="/campaigns" component={Campaigns} />
												</Switch>
											</Layout>
										</AuthProvider>
									)}
								/>
							</Switch>
							<ModalsPresenter />
						</React.Fragment>
					</Router>
				</CampaignProvider>
			</ThemeProvider>
		)
	}
}

export default App
