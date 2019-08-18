

import * as React from 'react'
import sortBy from 'lodash-es/sortBy'
import reverse from 'lodash-es/reverse'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import { Spacer } from 'r/components/spacer'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

import { useCampaignId, useCurCampaign, useIsOwner } from 'r/domains/campaigns'
import { type Session, deleteSession } from 'r/domains/sessions'
import { useNounList } from 'r/domains/nouns'
import { useMemberList } from 'r/domains/members'
import { useFetch, remove } from 'r/util/use-fetch'

import NounList from './noun-list'

function CampaignDetail() {
	const id = useCampaignId()
	const [campaign] = useCurCampaign()
	const [sessionList] = useFetch<Array<Session>>(
		`/api/campaigns/${id}/sessions`
	)
	const [memberList] = useMemberList()
	const [nounList] = useNounList()
	const isOwner = useIsOwner(campaign)
	if (!campaign || !sessionList || !memberList || !nounList)
		return <LoadingPage />
	const { name, description } = campaign
	return (
		<>
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
														remove({
															path: `/api/campaigns/${id}/members/${m.id}`,
														})
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
															deleteSession(s)
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
						/>
						<Spacer height={25} />
						<NounList
							title="Factions"
							nounType="FACTION"
							campaign={campaign}
							nouns={nounList}
						/>
						<Spacer height={25} />
						<NounList
							title="Places"
							nounType="PLACE"
							campaign={campaign}
							nouns={nounList}
						/>
						<Spacer height={25} />
						<NounList
							title="Things"
							nounType="THING"
							campaign={campaign}
							nouns={nounList}
						/>
					</Column>
				</ColumnView>
			</PageContent>
		</>
	)
}

export default CampaignDetail
