// @flow

import * as React from 'react'

import { IsOwner } from 'r/contexts/auth'

import AddableList from 'r/components/addable-list'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

import { type Campaign } from 'r/data/campaigns'
import { type Noun, type NounType } from 'r/data/nouns'

export default function NounList({
	campaign,
	nouns,
	nounType,
	title,
	removeNoun,
}: {
	campaign: Campaign,
	nouns: Array<Noun>,
	nounType: NounType,
	title: string,
	removeNoun: (campaignId: number, nounId: number) => Promise<void>,
}) {
	return (
		<IsOwner campaign={campaign}>
			{isOwner => (
				<AddableList
					title={title}
					addPath={`/campaigns/${campaign.id}/nouns/add?nounType=${nounType}`}
					canEdit={isOwner}
				>
					{nouns.filter(n => n.noun_type === nounType).map(n => (
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
				</AddableList>
			)}
		</IsOwner>
	)
}
