// @flow

import * as React from 'react'

import { IsOwner } from 'r/contexts/auth'

import AddableList from 'r/components/addable-list'
import PlainLink from 'r/components/plain-link'
import ListCard from 'r/components/list-card'
import TitleNSummary from 'r/components/title-n-summary'

import { type Campaign } from 'r/data/campaigns'
import { type Noun, type NounType } from 'r/data/nouns'

export default function NounList({
	campaign,
	nouns,
	nounType,
	title,
}: {
	campaign: Campaign,
	nouns: Array<Noun>,
	nounType: NounType,
	title: string,
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
							<ListCard>
								<TitleNSummary title={n.name} summary={n.summary} />
							</ListCard>
						</PlainLink>
					))}
				</AddableList>
			)}
		</IsOwner>
	)
}
