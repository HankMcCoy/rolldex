import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { match as Match } from 'react-router-dom'

import NounDetail from './noun-detail'
import AddNoun from './add-noun'
import EditNoun from './edit-noun'
import NounTypeList from './noun-type-list'

type Props = {
	match: Match
}
export default function Nouns({ match }: Props) {
	return (
		<>
			<Switch>
				<Route exact path={match.path} render={() => <Redirect to="" />} />
				<Route exact path={`${match.path}/add`} component={AddNoun} />
				<Route exact path={`${match.path}/:nounId/edit`} component={EditNoun} />
				<Route
					exact
					path={`${match.path}/:nounType(people)`}
					component={NounTypeList}
				/>
				<Route
					exact
					path={`${match.path}/:nounType(factions)`}
					component={NounTypeList}
				/>
				<Route
					exact
					path={`${match.path}/:nounType(places)`}
					component={NounTypeList}
				/>
				<Route
					exact
					path={`${match.path}/:nounType(things)`}
					component={NounTypeList}
				/>
				<Route path={`${match.path}/:nounId`} component={NounDetail} />
			</Switch>
		</>
	)
}
