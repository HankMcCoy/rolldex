// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Route } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import CampaignDetail from './campaign-detail'
import CampaignList from './campaign-list'

type Props = {
  match: Match,
}
export default function Campaigns({ match }: Props) {
  return (
    <React.Fragment>
      <Route exact path={match.path} component={CampaignList} />
      <Route path={`${match.path}/:campaignId`} component={CampaignDetail} />
    </React.Fragment>
  )
}
