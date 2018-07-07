// @flow
import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import NounDetail from './noun-detail'
import AddNoun from './add-noun'

type Props = {
  match: Match,
}
export default function Nouns({ match }: Props) {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={match.path} render={() => <Redirect to="" />} />
        <Route exact path={`${match.path}/add`} component={AddNoun} />
        <Route path={`${match.path}/:nounId`} component={NounDetail} />
      </Switch>
    </React.Fragment>
  )
}
