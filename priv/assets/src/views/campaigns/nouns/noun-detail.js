// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'

import { fromTheme } from 'r/theme'
import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageWithSidebar from 'r/components/page-with-sidebar'
import TextSection from 'r/components/text-section'
import RelatedNouns from 'r/components/related-nouns'
import Spacer from 'r/components/spacer'

import { useIsOwner, useCurCampaign } from 'r/domains/campaigns'
import { type NounType, useNoun } from 'r/domains/nouns'

import { callApi } from 'r/util/api'
import { useRouteId } from 'r/util/router'

import PersonSvg from 'r/svg/person'
import PlaceSvg from 'r/svg/place'
import ThingSvg from 'r/svg/thing'
import FactionSvg from 'r/svg/faction'

import RelatedSessions from './related-sessions'
import { getNounTypeTitle, getNounTypePathToken } from './util'

const nounTypeToSvg: { [NounType]: React.Node } = {
	PERSON: <PersonSvg />,
	PLACE: <PlaceSvg />,
	THING: <ThingSvg />,
	FACTION: <FactionSvg />,
}

const AvatarWrapper = styled.div`
	width: ${fromTheme('pageSidebarWidth')}px;
	height: ${fromTheme('pageSidebarWidth')}px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #9c9dc9;
	border-bottom: 1px solid ${fromTheme('gray87')};
	& > svg {
		width: 60%;
		height: 60%;
		stroke: ${fromTheme('white')};
	}
`

export default function NounDetail() {
	const { datum: campaign } = useCurCampaign()
	const { datum: noun } = useNoun(useRouteId('nounId'))
	const isOwner = useIsOwner(campaign)
	if (!noun || !campaign) return <LoadingPage />

	const { name, summary, notes, private_notes, noun_type } = noun
	const typeSvg = nounTypeToSvg[noun_type]
	const nounTypeTitle = getNounTypeTitle(noun_type)

	return (
		<React.Fragment>
			<PageHeader
				title={name}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
					{
						text: nounTypeTitle,
						to: `/campaigns/${campaign.id}/nouns/${getNounTypePathToken(
							noun_type
						)}`,
					},
				]}
				controls={
					isOwner ? (
						<HeaderLinkButton
							to={`/campaigns/${campaign.id}/nouns/${noun.id}/edit`}
							data-id="edit"
							title="Edit (Ctrl/Cmd-E)"
						>
							Edit
						</HeaderLinkButton>
					) : null
				}
			/>
			<PageWithSidebar
				content={
					<React.Fragment>
						<TextSection title="Summary">{summary}</TextSection>
						<Spacer height={25} />
						<TextSection title="Notes" markdown>
							{notes}
						</TextSection>
						{isOwner ? (
							<React.Fragment>
								<Spacer height={25} />
								<TextSection title="Private Notes" markdown>
									{private_notes}
								</TextSection>
							</React.Fragment>
						) : null}
						<Spacer height={25} />
					</React.Fragment>
				}
				sidebar={
					<React.Fragment>
						<AvatarWrapper>{typeSvg}</AvatarWrapper>

						<RelatedNouns
							key={`related-nouns-${noun.id}`}
							campaignId={campaign.id}
							getNouns={() =>
								callApi({
									path: `/api/campaigns/${campaign.id}/nouns/${
										noun.id
									}/related-nouns`,
									method: 'GET',
								}).then(({ data: nouns }) => nouns)
							}
						/>
						<RelatedSessions
							key={`related-sessions-${noun.id}`}
							noun={noun}
							campaignId={campaign.id}
						/>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	)
}
