import * as React from 'react'
import styled from 'styled-components/macro'
import sortBy from 'lodash-es/sortBy'

import { Noun } from 'r/domains/nouns'
import { Session } from 'r/domains/sessions'
import { H2 } from 'r/components/heading'
import { Spacer } from 'r/components/spacer'
import PlainLink from 'r/components/plain-link'
import { Tooltip } from 'r/components/tooltip'
import { StyledMarkdown } from 'r/components/text-section'
import { useFetch } from 'r/util/use-fetch'

const Root = styled.div`
	padding: 20px;
`
const SessionList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	& > *:not(:last-child) {
		margin-bottom: 15px;
	}
`

const SessionLink = ({ session }: { session: Session }) => (
	<Tooltip
		renderTarget={ref => (
			<li ref={ref}>
				<PlainLink
					to={`/campaigns/${session.campaign_id}/sessions/${session.id}`}
				>
					- {session.name}
				</PlainLink>
			</li>
		)}
		tooltipContent={<StyledMarkdown>{session.summary}</StyledMarkdown>}
	/>
)

type Props = {
	noun: Noun
}
export default function RelatedSessions({ noun }: Props) {
	const [sessions] = useFetch<Array<Session>>(
		`/api/campaigns/${noun.campaign_id}/nouns/${noun.id}/related-sessions`
	)

	if (!sessions) return null

	return (
		<Root>
			{sessions.length ? (
				<>
					<H2>Sessions</H2>
					<Spacer height={15} />
					<SessionList>
						{sortBy(sessions, 'inserted_at').map((s: Session) => (
							<SessionLink key={s.id} session={s} />
						))}
					</SessionList>
				</>
			) : null}
		</Root>
	)
}
