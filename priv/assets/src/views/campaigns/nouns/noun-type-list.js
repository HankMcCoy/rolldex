// @flow
import * as React from 'react'

import PageHeader, {
	ControlsWrapper,
	HeaderLinkButton,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'
import { List } from 'r/components/lists'

import { type Noun } from 'r/domains/nouns'
import { useIsOwner } from 'r/domains/campaigns'
import { useCurCampaign } from 'r/domains/campaigns'
import { useNounList, useNounMutations } from 'r/domains/nouns'
import { useRouteParam } from 'r/util/router'

import { getNounTypeFromPathToken, getNounTypeTitle } from '../util/noun-util'

export default function NounTypeList() {
	const { datum: campaign } = useCurCampaign()
	const { list: allNouns } = useNounList(['name'])
	const nounTypePathToken = useRouteParam('nounType')
	const { remove: removeNoun } = useNounMutations()
	const isOwner = useIsOwner(campaign)

	if (!campaign || !allNouns) return <LoadingPage />

	const nounType = getNounTypeFromPathToken(nounTypePathToken)
	const relevantNouns = allNouns.filter((n: Noun) => n.noun_type === nounType)

	return (
		<React.Fragment>
			<PageHeader
				title={getNounTypeTitle(nounType)}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
				controls={
					<ControlsWrapper>
						<HeaderLinkButton
							to={`/campaigns/${campaign.id}/nouns/add?nounType=${nounType}`}
						>
							Add
						</HeaderLinkButton>
					</ControlsWrapper>
				}
			/>
			<PageContent>
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
													removeNoun(n.id)
												}
										  }
										: undefined
								}
							/>
						</PlainLink>
					))}
				</List>
			</PageContent>
		</React.Fragment>
	)
}
