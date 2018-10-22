// @flow

import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import { IsOwner } from 'r/contexts/auth'
import { getFirstNByDateUpdated } from 'r/util'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import type { Session } from 'r/data/sessions'
import { withSessionList } from 'r/data/sessions/connectors'

import type { Noun } from 'r/data/nouns'
import { withNounList } from 'r/data/nouns/connectors'

import type { Member } from 'r/data/members'
import { withMemberList } from 'r/data/members/connectors'

import NounList from './noun-list'

type Props = {
	campaign: Campaign | void,
	sessions: Array<Session> | void,
	members: Array<Member> | void,
	nouns: Array<Noun> | void,
	removeMember: (campaignId: number, memberId: number) => Promise<void>,
	removeNoun: (campaignId: number, nounId: number) => Promise<void>,
	removeSession: (campaignId: number, sessionId: number) => Promise<void>,
}
function CampaignDetail({
	campaign,
	members,
	sessions,
	nouns,
	removeMember,
	removeNoun,
	removeSession,
}: Props) {
	if (!campaign || !members || !sessions || !nouns) return <LoadingPage />
	const { name, description, id } = campaign
	return (
		<IsOwner campaign={campaign}>
			{isOwner => (
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
									{members.map(m => (
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
																removeMember(id, m.id)
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
									addPath={`/campaigns/${id}/sessions/add`}
									canEdit={isOwner}
								>
									{getFirstNByDateUpdated(sessions, 3).map(s => (
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
									nouns={nouns}
									removeNoun={removeNoun}
								/>
								<Spacer height={25} />
								<NounList
									title="Factions"
									nounType="FACTION"
									campaign={campaign}
									nouns={nouns}
									removeNoun={removeNoun}
								/>
								<Spacer height={25} />
								<NounList
									title="Places"
									nounType="PLACE"
									campaign={campaign}
									nouns={nouns}
									removeNoun={removeNoun}
								/>
								<Spacer height={25} />
								<NounList
									title="Things"
									nounType="THING"
									campaign={campaign}
									nouns={nouns}
									removeNoun={removeNoun}
								/>
							</Column>
						</ColumnView>
					</PageContent>
				</React.Fragment>
			)}
		</IsOwner>
	)
}

const getCampaignId = ({ match: { params } }) => +params.campaignId
export default flowRight(
	withCampaign(getCampaignId),
	withSessionList(getCampaignId),
	withNounList(getCampaignId),
	withMemberList(getCampaignId)
)(CampaignDetail)
