// @flow
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import ViewNounTemplate from './view-noun-template'
import EditNounTemplate from './edit-noun-template'

type Props = {
	match: Match,
}
export default function Nouns({ match }: Props) {
	return (
		<>
			<Switch>
				<Route
					exact
					path={`${match.path}/:nounTemplateId`}
					component={ViewNounTemplate}
				/>
				<Route
					exact
					path={`${match.path}/:nounTemplateId/edit`}
					component={EditNounTemplate}
				/>
			</Switch>
		</>
	)
}
