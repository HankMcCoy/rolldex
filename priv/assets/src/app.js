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
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'

import history from './history'
import Layout from './layout'
import theme from './theme'
import Campaigns from './views/campaigns'
import Login from './views/auth/login'
import Register from './views/auth/register'
import reducer from './reducer'
import ModalsPresenter from './modals/presenter'
import { showModal, hideModal } from './modals/action-creators'
import { AuthProvider } from './domains/auth'
import JumpTo from './modals/jump-to'
import { CampaignProvider } from 'r/domains/campaigns'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const storeEnhancer: StoreEnhancer<*, *, *> = composeEnhancers(
	applyMiddleware(thunk)
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
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
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
					<CampaignProvider>
						<Router history={history}>
							<React.Fragment>
								<GlobalKeyListener />
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
			</ReduxProvider>
		)
	}
}

export default App
