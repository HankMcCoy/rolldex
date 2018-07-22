// @flow
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import SystemDetail from './system-detail'
import SystemList from './system-list'
import AddSystem from './add-system'
import EditSystem from './edit-system'

type Props = {
	match: Match
}
export default function Systems({ match }: Props) {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path={match.path} component={SystemList} />
				<Route exact path={`${match.path}/add`} component={AddSystem} />
				<Route
					exact
					path={`${match.path}/:systemId/edit`}
					component={EditSystem}
				/>
				<Route path={`${match.path}/:systemId`} component={SystemDetail} />
			</Switch>
		</React.Fragment>
	)
}
