import * as React from 'react'
import styled from 'styled-components/macro'

import theme from 'r/theme'
import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageWithSidebar from 'r/components/page-with-sidebar'
import TextSection from 'r/components/text-section'
import RelatedNouns from 'r/components/related-nouns'
import { Spacer } from 'r/components/spacer'

import { useIsOwner, useCurCampaign } from 'r/domains/campaigns'
import { NounType, useNoun } from 'r/domains/nouns'

import { useRouteId } from 'r/util/router'

import PersonSvg from 'r/svg/person'
import PlaceSvg from 'r/svg/place'
import ThingSvg from 'r/svg/thing'
import FactionSvg from 'r/svg/faction'

import RelatedSessions from './related-sessions'
import { getNounTypeTitle, getNounTypePathToken } from './util'

const nounTypeToSvg: { [NounType]: React.ReactNode } = {
	PERSON: <PersonSvg />,
	PLACE: <PlaceSvg />,
	THING: <ThingSvg />,
	FACTION: <FactionSvg />,
}

const AvatarWrapper = styled.div`
	width: ${theme.pageSidebarWidth}px;
	height: ${theme.pageSidebarWidth}px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #9c9dc9;
	border-bottom: 1px solid ${theme.gray87};

	@media (max-width: ${theme.breakpoints.phone}px) {
		width: 100%;
		height: 200px;
	}

	& > svg {
		width: 60%;
		height: 60%;
		stroke: ${theme.white};
	}
`

export default function NounDetail() {
	const [campaign] = useCurCampaign()
	const [noun] = useNoun(useRouteId('nounId'))
	const isOwner = useIsOwner(campaign)
	if (!noun || !campaign) return <LoadingPage />

	const { name, summary, notes, private_notes, noun_type } = noun
	const typeSvg = nounTypeToSvg[noun_type]
	const nounTypeTitle = getNounTypeTitle(noun_type)

	return (
		<>
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
					<>
						<TextSection title="Summary">{summary}</TextSection>
						<Spacer height={25} />
						<TextSection title="Notes" markdown>
							{notes}
						</TextSection>
						{isOwner ? (
							<>
								<Spacer height={25} />
								<TextSection title="Private Notes" markdown>
									{private_notes}
								</TextSection>
							</>
						) : null}
						<Spacer height={25} />
					</>
				}
				sidebar={
					<>
						<AvatarWrapper>{typeSvg}</AvatarWrapper>
						<RelatedNouns
							key={`related-nouns-${noun.id}`}
							path={`/api/campaigns/${campaign.id}/nouns/${noun.id}/related-nouns`}
						/>
						<RelatedSessions key={`related-sessions-${noun.id}`} noun={noun} />
					</>
				}
			/>
		</>
	)
}
