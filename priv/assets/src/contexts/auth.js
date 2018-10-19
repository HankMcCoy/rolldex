// @flow
import * as React from 'react'

import type { Campaign } from 'r/data/campaigns'
import { callApi } from 'r/util/api'
const { Provider, Consumer } = React.createContext()

type ProviderProps = {
	children: React.Node,
}
type User = {
	id: number,
	email: string,
}
type ProviderState = {
	curUser: ?User,
}
export class AuthProvider extends React.Component<
	ProviderProps,
	ProviderState
> {
	state = {
		curUser: undefined,
	}

	render() {
		const { curUser } = this.state
		return curUser ? (
			<Provider value={this.state}>{this.props.children}</Provider>
		) : null
	}

	componentDidMount() {
		callApi({ method: 'GET', path: '/api/users/me' }).then(
			({ data: curUser }) => {
				this.setState({
					curUser,
				})
			}
		)
	}
}

export const IsOwner = ({
	children,
	campaign,
}: {|
	children: boolean => React.Node,
	campaign: Campaign,
|}) => (
	<CurUser>
		{(curUser: ?User) =>
			children(curUser && curUser.id === campaign.created_by_id ? true : false)
		}
	</CurUser>
)

export const CurUser = ({
	children,
}: {|
	children: (user: ?User) => React.Node,
|}) => (
	<Consumer>
		{(value: { curUser: ?User } | void) => children(value && value.curUser)}
	</Consumer>
)

export { Consumer as AuthConsumer }
