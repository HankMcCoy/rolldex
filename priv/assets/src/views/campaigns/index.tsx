import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import CampaignDetail from './campaign-detail'
import CampaignList from './campaign-list'
import AddCampaign from './add-campaign'
import EditCampaign from './edit-campaign'
import Sessions from './sessions'
import Nouns from './nouns'
import InviteMember from './members/invite'

function Campaign({ match }) {
	return (
		<Switch>
			<Route exact path={`${match.path}/edit`} component={EditCampaign} />
			<Route path={`${match.path}/sessions`} component={Sessions} />
			<Route path={`${match.path}/nouns`} component={Nouns} />
			<Route path={`${match.path}/members/invite`} component={InviteMember} />
			<Route exact path={match.path} component={CampaignDetail} />
		</Switch>
	)
}

export default function Campaigns({ match }: { match: any }) {
	return (
		<Switch>
			<Route exact path={match.path} component={CampaignList} />
			<Route exact path={`${match.path}/add`} component={AddCampaign} />
			<Route path={`${match.path}/:campaignId`} component={Campaign} />
		</Switch>
	)
}
