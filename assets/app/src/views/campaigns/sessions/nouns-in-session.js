// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { withState, lifecycle, mapProps } from 'recompose'

import type { Session } from 'r/data/sessions'
import type { Noun } from 'r/data/nouns'
import { callApi } from 'r/util/api'

import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

const Root = styled.div`
  padding: 20px;
  & > *:not(:last-child) {
    margin-bottom: 25px;
  }
`
const NounGroup = styled.div``

const NounList = styled.ul`
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`

const UnstyledLink = styled(Link)`
  text-decoration: none;
`

const NounLink = ({ session, noun }) => (
  <li>
    <UnstyledLink to={`/campaigns/${session.campaign_id}/nouns/${noun.id}`}>
      - {noun.name}
    </UnstyledLink>
  </li>
)

type Props = {
  nouns: Array<Noun> | void,
  session: Session,
}
function NounsInSession({ nouns, session }: Props) {
  if (!nouns) return 'Loading...'
  const people = nouns.filter(n => n.noun_type === 'PERSON')
  const places = nouns.filter(n => n.noun_type === 'PLACE')
  const things = nouns.filter(n => n.noun_type === 'THING')

  return (
    <Root>
      {people.length ? (
        <NounGroup>
          <H2>People</H2>
          <Spacer height={15} />
          <NounList>
            {people.map(noun => <NounLink noun={noun} session={session} />)}
          </NounList>
        </NounGroup>
      ) : null}
      {places.length ? (
        <NounGroup>
          <H2>Places</H2>
          <Spacer height={15} />
          <NounList>
            {places.map(noun => <NounLink noun={noun} session={session} />)}
          </NounList>
        </NounGroup>
      ) : null}
      {things.length ? (
        <NounGroup>
          <H2>Things</H2>
          <Spacer height={15} />
          <NounList>
            {things.map(noun => <NounLink noun={noun} session={session} />)}
          </NounList>
        </NounGroup>
      ) : null}
    </Root>
  )
}

export default flowRight(
  withState('nouns', 'setNouns', []),
  lifecycle({
    componentDidMount() {
      const {
        setNouns,
        session: { id, campaign_id },
      } = this.props
      callApi({
        path: `/api/campaigns/${campaign_id}/sessions/${id}/nouns`,
        method: 'GET',
      }).then(({ data: nouns }) => {
        setNouns(nouns)
      })
    },
  }),
  mapProps(props => omit(props, ['setNouns'])),
)(NounsInSession)
