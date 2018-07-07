// @flow
import * as React from 'react'
import { Route } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import SystemDetail from './system-detail'
import SystemList from './system-list'

type Props = {
  match: Match,
}
export default function Systems({ match }: Props) {
  return (
    <React.Fragment>
      <Route exact path={match.path} component={SystemList} />
      <Route path={`${match.path}/:systemId`} component={SystemDetail} />
    </React.Fragment>
  )
}
