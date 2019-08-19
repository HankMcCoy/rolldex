import * as React from 'react'
import styled from 'styled-components/macro'

import { getFirstNByDateUpdated } from 'r/util'

import AddableList from 'r/components/addable-list'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'
import { SecondaryLinkButton } from 'r/components/button'

import { Campaign, useIsOwner } from 'r/domains/campaigns'
import { Noun, NounType, deleteNoun } from 'r/domains/nouns'

import { getNounTypePathToken } from './nouns/util'

type Props = {
	campaign: Campaign
	nouns: Array<Noun>
	nounType: NounType
	title: string
}
export default function NounList({
	campaign,
	nouns: allNouns,
	nounType,
	title,
}: Props) {
	const isOwner = useIsOwner(campaign)
	const relevantNouns = allNouns.filter(n => n.noun_type === nounType)
	return (
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
												`Are you sure you want to remove "${n.name}"? This is not reversible.`
											)
										) {
											deleteNoun(n)
										}
								  }
								: undefined
						}
					/>
				</PlainLink>
			))}
			<SecondaryLinkButton
				to={`/campaigns/${campaign.id}/nouns/${getNounTypePathToken(nounType)}`}
				css={`
					width: 100%;
				`}
			>
				See all >
			</SecondaryLinkButton>
		</AddableList>
	)
}
