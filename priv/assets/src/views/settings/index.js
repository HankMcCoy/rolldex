// @flow
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import SettingsOverview from './overview'
import TemplateEdit from './template-edit'

type Props = {
	match: Match,
}
export default function Campaigns({ match }: Props) {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path={match.path} component={SettingsOverview} />
				<Route
					path={`${match.path}/templates/:templateType`}
					component={TemplateEdit}
				/>
			</Switch>
		</React.Fragment>
	)
}
