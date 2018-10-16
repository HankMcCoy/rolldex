// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import sortBy from 'lodash-es/sortBy'
import { withState, lifecycle, mapProps } from 'recompose'

import type { Session } from 'r/data/sessions'
import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'
import { callApi } from 'r/util/api'

const Root = styled.div`
  padding: 20px;
`
const SessionList = styled.ul`
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`

const UnstyledLink = styled(Link)`
  text-decoration: none;
`

const SessionLink = ({ session, campaignId }) => (
  <li>
    <UnstyledLink to={`/campaigns/${campaignId}/sessions/${session.id}`}>
      - {session.name}
    </UnstyledLink>
  </li>
)

type Props = {
  sessions: Array<Session> | void,
  campaignId: number,
}
function RelatedSessions({ sessions, campaignId }: Props) {
  if (!sessions) return null

  return (
    <Root>
      {sessions.length ? (
        <React.Fragment>
          <H2>Sessions</H2>
          <Spacer height={15} />
          <SessionList>
            {sessions.map(s => (
              <SessionLink key={s.id} session={s} campaignId={campaignId} />
            ))}
          </SessionList>
        </React.Fragment>
      ) : null}
    </Root>
  )
}

export default flowRight(
  withState('sessions', 'setSessions', []),
  lifecycle({
    componentDidMount() {
      const { setSessions, campaignId, noun } = this.props
      callApi({
        path: `/api/campaigns/${campaignId}/nouns/${noun.id}/related-sessions`,
        method: 'GET',
      }).then(({ data: sessions }) => {
        setSessions(sortBy(sessions, 'inserted_at'))
      })
    },
  }),
  mapProps(props => omit(props, ['setSessions']))
)(RelatedSessions)
