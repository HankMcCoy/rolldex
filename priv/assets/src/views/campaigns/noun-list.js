// @flow

import * as React from 'react'
import { css } from '@emotion/core'

import { getFirstNByDateUpdated } from 'r/util'

import AddableList from 'r/components/addable-list'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'
import { IconButton, SecondaryLinkButton } from 'r/components/button'
import AddBtn from 'r/components/add-btn'
import Stamp from 'r/svg/stamp'
import Spacer from 'r/components/spacer'

import { type Campaign, useIsOwner } from 'r/domains/campaigns'
import { type Noun, type NounType } from 'r/domains/nouns'
import { useNounTemplateIdByType } from 'r/domains/noun-templates'

import { getNounTypePathToken } from './util/noun-util'

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
	const isOwner = useIsOwner(campaign)
	const relevantNouns = allNouns.filter(n => n.noun_type === nounType)
	const nounTemplateId = useNounTemplateIdByType(nounType)
	return (
		<AddableList
			title={`${title} (${relevantNouns.length})`}
			controls={
				isOwner ? (
					<div
						css={css`
							display: flex;
						`}
					>
						<IconButton
							Icon={Stamp}
							to={`/campaigns/${campaign.id}/noun-templates/${nounTemplateId}`}
						/>
						<Spacer width={10} />
						<AddBtn
							to={`/campaigns/${campaign.id}/nouns/add?nounType=${nounType}`}
						/>
					</div>
				) : null
			}
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
				to={`/campaigns/${campaign.id}/nouns/${getNounTypePathToken(nounType)}`}
				css={css`
					width: 100%;
				`}
			>
				See all >
			</SecondaryLinkButton>
		</AddableList>
	)
}
