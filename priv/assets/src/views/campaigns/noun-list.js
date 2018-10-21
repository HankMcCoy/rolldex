// @flow

import * as React from 'react'

import { IsOwner } from 'r/contexts/auth'
import { getFirstNByDateUpdated } from 'r/util'

import AddableList from 'r/components/addable-list'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'
import { SecondaryLinkButton } from 'r/components/button'

import { type Campaign } from 'r/data/campaigns'
import { type Noun, type NounType } from 'r/data/nouns'

import { getNounTypePathToken } from './nouns/util'

type Props = {|
	campaign: Campaign,
	nouns: Array<Noun>,
	nounType: NounType,
	title: string,
	removeNoun: (campaignId: number, nounId: number) => Promise<void>,
|}
export default function NounList({
	campaign,
	nouns: allNouns,
	nounType,
	title,
	removeNoun,
}: Props) {
	const relevantNouns = allNouns.filter(n => n.noun_type === nounType)
	return (
		<IsOwner campaign={campaign}>
			{isOwner => (
				<AddableList
					title={`${title} (${relevantNouns.length})`}
					addPath={`/campaigns/${campaign.id}/nouns/add?nounType=${nounType}`}
					canEdit={isOwner}
				>
					{getFirstNByDateUpdated(relevantNouns, 3).map(n => (
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
					<SecondaryLinkButton
						to={`/campaigns/${campaign.id}/nouns/${getNounTypePathToken(
							nounType
						)}`}
						css={`
							width: 100%;
						`}
					>
						See all >
					</SecondaryLinkButton>
				</AddableList>
			)}
		</IsOwner>
	)
}
