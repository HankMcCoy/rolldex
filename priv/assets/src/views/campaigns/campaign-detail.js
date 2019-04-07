// @flow

import * as React from 'react'
import sortBy from 'lodash-es/sortBy'
import reverse from 'lodash-es/reverse'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

import { type Campaign, useCampaignId, useIsOwner } from 'r/domains/campaigns'
import { type Session } from 'r/domains/sessions'
import { type Noun } from 'r/domains/nouns'
import type { Member } from 'r/domains/members'
import { useFetch, mutate } from 'r/util/use-fetch'

import NounList from './noun-list'

type Props = {
	removeMember: (campaignId: number, memberId: number) => Promise<void>,
	removeNoun: (campaignId: number, nounId: number) => Promise<void>,
	removeSession: (campaignId: number, sessionId: number) => Promise<void>,
}
function CampaignDetail({ removeMember, removeNoun, removeSession }: Props) {
	const id = useCampaignId()
	const [campaign] = useFetch<Campaign>(`/api/campaigns/${id}`)
	const [sessionList] = useFetch<Array<Session>>(
		`/api/campaigns/${id}/sessions`
	)
	const [memberList] = useFetch<Array<Member>>(`/api/campaigns/${id}/members`)
	const [nounList] = useFetch<Array<Noun>>(`/api/campaigns/${id}/nouns`)
	const isOwner = useIsOwner(campaign)
	if (!campaign || !sessionList || !memberList || !nounList)
		return <LoadingPage />
	const { name, description } = campaign
	return (
		<React.Fragment>
			<PageHeader
				title={name}
				breadcrumbs={[{ text: 'Campaigns', to: '/campaigns' }]}
				controls={
					isOwner ? (
						<HeaderLinkButton to={`/campaigns/${campaign.id}/edit`}>
							Edit
						</HeaderLinkButton>
					) : null
				}
			/>
			<PageContent>
				<ColumnView gutterWidth={40}>
					<Column>
						<TextSection title="Description" markdown>
							{description}
						</TextSection>
						<Spacer height={25} />
						<AddableList
							title="Members"
							addPath={`/campaigns/${id}/members/invite`}
							canEdit={isOwner}
						>
							{memberList.map(m => (
								<NotableCard
									key={m.id}
									title={m.email}
									onRemove={
										isOwner
											? () => {
													if (
														window.confirm(
															`Are you sure you want to remove ${
																m.email
															} from this campaign?`
														)
													) {
														mutate(
															'DELETE',
															`/api/campaigns/${id}/members/${m.id}`
														)
													}
											  }
											: undefined
									}
								/>
							))}
						</AddableList>
						<Spacer height={25} />
						<AddableList
							title="Sessions"
							addPath={`/campaigns/${campaign.id}/sessions/add`}
							canEdit={isOwner}
						>
							{reverse(sortBy(sessionList, 'inserted_at')).map(s => (
								<PlainLink
									key={s.id}
									to={`/campaigns/${campaign.id}/sessions/${s.id}`}
									display="block"
								>
									<NotableCard
										title={s.name}
										summary={s.summary}
										onRemove={
											isOwner
												? ({ clickEvent }) => {
														clickEvent.preventDefault()
														if (
															window.confirm(
																`Are you sure you want to remove "${
																	s.name
																}"? This is not reversable.`
															)
														) {
															removeSession(id, s.id)
														}
												  }
												: undefined
										}
									/>
								</PlainLink>
							))}
						</AddableList>
					</Column>
					<Column>
						<NounList
							title="People"
							nounType="PERSON"
							campaign={campaign}
							nouns={nounList}
							removeNoun={removeNoun}
						/>
						<Spacer height={25} />
						<NounList
							title="Factions"
							nounType="FACTION"
							campaign={campaign}
							nouns={nounList}
							removeNoun={removeNoun}
						/>
						<Spacer height={25} />
						<NounList
							title="Places"
							nounType="PLACE"
							campaign={campaign}
							nouns={nounList}
							removeNoun={removeNoun}
						/>
						<Spacer height={25} />
						<NounList
							title="Things"
							nounType="THING"
							campaign={campaign}
							nouns={nounList}
							removeNoun={removeNoun}
						/>
					</Column>
				</ColumnView>
			</PageContent>
		</React.Fragment>
	)
}

export default CampaignDetail
