// @flow
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import sortBy from 'lodash-es/sortBy'

import type { Noun } from 'r/domains/nouns'
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

type Props = {|
	campaignId: number,
	noun: Noun,
|}
export default function RelatedSessions({ campaignId, noun }: Props) {
	const [sessions, setSessions] = useState([])
	useEffect(
		() => {
			callApi({
				path: `/api/campaigns/${campaignId}/nouns/${noun.id}/related-sessions`,
				method: 'GET',
			}).then(({ data: sessions }) => {
				setSessions(sortBy(sessions, 'inserted_at'))
			})
		},
		[campaignId, noun.id]
	)
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
