// @flow
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import CampaignDetail from './campaign-detail'
import CampaignList from './campaign-list'
import AddCampaign from './add-campaign'
import Sessions from './sessions'
import Nouns from './nouns'

type Props = {
  match: Match,
}
export default function Campaigns({ match }: Props) {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={match.path} component={CampaignList} />
        <Route exact path={`${match.path}/add`} component={AddCampaign} />
        <Route
          path={`${match.path}/:campaignId/sessions`}
          component={Sessions}
        />
        <Route path={`${match.path}/:campaignId/nouns`} component={Nouns} />
        <Route path={`${match.path}/:campaignId`} component={CampaignDetail} />
      </Switch>
    </React.Fragment>
  )
}
