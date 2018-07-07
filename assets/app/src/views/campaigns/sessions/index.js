// @flow
import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import SessionDetail from './session-detail'
import AddSession from './add-session'

type Props = {
  match: Match,
}
export default function Sessions({ match }: Props) {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={match.path} render={() => <Redirect to="" />} />
        <Route exact path={`${match.path}/add`} component={AddSession} />
        <Route path={`${match.path}/:sessionId`} component={SessionDetail} />
      </Switch>
    </React.Fragment>
  )
}
