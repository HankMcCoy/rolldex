// @flow

import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import styled from 'react-emotion'

import { IsOwner } from 'r/contexts/auth'
import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import ListCard from 'r/components/list-card'
import TitleNSummary from 'r/components/title-n-summary'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'
import PlainLink from 'r/components/plain-link'
import XBtn from 'r/components/x-btn'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import type { Session } from 'r/data/sessions'
import { withSessionList } from 'r/data/sessions/connectors'

import type { Noun } from 'r/data/nouns'
import { withNounList } from 'r/data/nouns/connectors'

import type { Member } from 'r/data/members'
import { withMemberList } from 'r/data/members/connectors'

const FlexBtwn = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

type Props = {
	campaign: Campaign | void,
	sessions: Array<Session> | void,
	members: Array<Member> | void,
	nouns: Array<Noun> | void,
	removeMember: (campaignId: number, memberId: number) => Promise<void>,
}
function CampaignDetail({
	campaign,
	members,
	sessions,
	nouns,
	removeMember,
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
								<HeaderButton to={`/campaigns/${campaign.id}/edit`}>
									Edit
								</HeaderButton>
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
										<ListCard key={m.id} paddingRight={0}>
											<FlexBtwn>
												<TitleNSummary title={m.email} />
												<XBtn onClick={() => removeMember(id, m.id)} />
											</FlexBtwn>
										</ListCard>
									))}
								</AddableList>
								<Spacer height={25} />
								<AddableList
									title="Sessions"
									addPath={`/campaigns/${id}/sessions/add`}
									canEdit={isOwner}
								>
									{sessions.map(s => (
										<PlainLink
											key={s.id}
											to={`/campaigns/${campaign.id}/sessions/${s.id}`}
											display="block"
										>
											<ListCard>
												<TitleNSummary title={s.name} summary={s.summary} />
											</ListCard>
										</PlainLink>
									))}
								</AddableList>
							</Column>
							<Column>
								<AddableList
									title="World"
									addPath={`/campaigns/${id}/nouns/add`}
									canEdit={isOwner}
								>
									{nouns.map(n => (
										<PlainLink
											key={n.id}
											to={`/campaigns/${campaign.id}/nouns/${n.id}`}
											display="block"
										>
											<ListCard>
												<TitleNSummary title={n.name} summary={n.summary} />
											</ListCard>
										</PlainLink>
									))}
								</AddableList>
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
