import React, { Component } from 'react'

import { Router, Switch, Route, Redirect } from 'react-router-dom'

import history from './history'
import Layout from './layout'
import ModalsPresenter from './modals/presenter'
import Campaigns from './views/campaigns'
import Systems from './views/systems'
import Login from './views/auth/login'
import Register from './views/auth/register'
import { AuthProvider } from './domains/auth'

class App extends Component<{}> {
	render() {
		return (
			<Router history={history}>
				<ModalsPresenter>
					<>
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
												<Route path="/systems" component={Systems} />
											</Switch>
										</Layout>
									</AuthProvider>
								)}
							/>
						</Switch>
					</>
				</ModalsPresenter>
			</Router>
		)
	}
}

export default App
