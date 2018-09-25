// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import ListCard from 'r/components/list-card'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import type { Session } from 'r/data/sessions'
import { withSessionList } from 'r/data/sessions/connectors'

import type { Noun } from 'r/data/nouns'
import { withNounList } from 'r/data/nouns/connectors'

type Props = {
	campaign: Campaign | void,
	sessions: Array<Session> | void,
	nouns: Array<Noun> | void
}
function CampaignDetail({ campaign, sessions, nouns }: Props) {
	if (!campaign || !sessions || !nouns) return <LoadingPage />
	const { name, description, id } = campaign
	return (
		<React.Fragment>
			<PageHeader
				title={name}
				breadcrumbs={[{ text: 'Campaigns', to: '/campaigns' }]}
				controls={
					<HeaderButton to={`/campaigns/${campaign.id}/edit`}>
						Edit
					</HeaderButton>
				}
			/>
			<PageContent>
				<ColumnView gutterWidth={40}>
					<Column>
						<TextSection title="Description" markdown>
							{description}
						</TextSection>
						<Spacer height={20} />
						<AddableList
							title="Sessions"
							addPath={`/campaigns/${id}/sessions/add`}
						>
							{sessions.map(s => (
								<ListCard
									title={s.name}
									description={s.summary}
									to={`/campaigns/${campaign.id}/sessions/${s.id}`}
								/>
							))}
						</AddableList>
					</Column>
					<Column>
						<AddableList title="World" addPath={`/campaigns/${id}/nouns/add`}>
							{nouns.map(n => (
								<ListCard
									title={n.name}
									description={n.summary}
									to={`/campaigns/${campaign.id}/nouns/${n.id}`}
								/>
							))}
						</AddableList>
					</Column>
				</ColumnView>
			</PageContent>
		</React.Fragment>
	)
}

const getCampaignId = ({ match: { params } }) => +params.campaignId
export default flowRight(
	withCampaign(getCampaignId),
	withSessionList(getCampaignId),
	withNounList(getCampaignId)
)(CampaignDetail)