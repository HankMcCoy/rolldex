import * as React from 'react'
import { type Match } from 'react-router-dom'
import flowRight from 'lodash-es/flowRight'
import sortBy from 'lodash-es/sortBy'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'
import { List } from 'r/components/lists'

import { IsOwner } from 'r/contexts/auth'
import { type Noun } from 'r/data/nouns'
import { type Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'
import { withNounList } from 'r/data/nouns/connectors'

import { getNounTypeFromPathToken, getNounTypeTitle } from './util'

type Props = {|
	campaign: Campaign,
	nouns: Array<Noun>,
	removeNoun: (campaignId: number, nounId: number) => void,
	match: Match,
|}
function NounTypeList({ campaign, nouns: allNouns, removeNoun, match }: Props) {
	const nounType = getNounTypeFromPathToken(match.params.nounType)
	if (!campaign || !allNouns) return <LoadingPage />
	const relevantNouns = sortBy(
		allNouns.filter((n: Noun) => n.noun_type === nounType),
		'name'
	)
	return (
		<React.Fragment>
			<PageHeader
				title={getNounTypeTitle(nounType)}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
			/>
			<PageContent>
				<IsOwner campaign={campaign}>
					{isOwner => (
						<List>
							{relevantNouns.map(n => (
								<PlainLink
									key={n.id}
									to={`/campaigns/${campaign.id}/nouns/${n.id}`}
									display="block"
								>
									<NotableCard
										title={n.name}
										summary={n.summary}
										onRemove={
											isOwner
												? ({ clickEvent }) => {
														clickEvent.preventDefault()
														if (
															window.confirm(
																`Are you sure you want to remove "${
																	n.name
																}"? This is not reversible.`
															)
														) {
															removeNoun(campaign.id, n.id)
														}
												  }
												: undefined
										}
									/>
								</PlainLink>
							))}
						</List>
					)}
				</IsOwner>
			</PageContent>
		</React.Fragment>
	)
}

const getCampaignId = ({ match }) => +match.params.campaignId
export default flowRight(
	withNounList(getCampaignId),
	withCampaign(getCampaignId)
)(NounTypeList)
