// @flow

import * as React from 'react'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

import { useCurCampaign, useIsOwner } from 'r/domains/campaigns'
import { useSessionList } from 'r/domains/sessions'
import { useNounList } from 'r/domains/nouns'
import { useMemberList } from 'r/domains/members'

import NounList from './noun-list'

type Props = {
	removeMember: (campaignId: number, memberId: number) => Promise<void>,
	removeNoun: (campaignId: number, nounId: number) => Promise<void>,
	removeSession: (campaignId: number, sessionId: number) => Promise<void>,
}
function CampaignDetail({ removeMember, removeNoun, removeSession }: Props) {
	const { datum: campaign } = useCurCampaign()
	const { list: sessionList } = useSessionList(['inserted_at'], 'DESC')
	const { list: memberList } = useMemberList(['email'])
	const { list: nounList } = useNounList(['name'])
	const isOwner = useIsOwner(campaign)
	if (!campaign || !sessionList || !memberList || !nounList)
		return <LoadingPage />
	const { name, description, id } = campaign
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
							addPath={`/campaigns/${campaign.id}/members/invite`}
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
							addPath={`/campaigns/${campaign.id}/sessions/add`}
							canEdit={isOwner}
						>
							{sessionList.map(s => (
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
