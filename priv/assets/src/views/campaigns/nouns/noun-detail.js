// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'
import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageWithSidebar from 'r/components/page-with-sidebar'
import TextSection from 'r/components/text-section'
import RelatedNouns from 'r/components/related-nouns'
import Spacer from 'r/components/spacer'

import { IsOwner } from 'r/contexts/auth'
import type { Noun, NounType } from 'r/data/nouns'
import { withNoun } from 'r/data/nouns/connectors'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import { callApi } from 'r/util/api'

import PersonSvg from 'r/svg/person'
import PlaceSvg from 'r/svg/place'
import ThingSvg from 'r/svg/thing'
import FactionSvg from 'r/svg/faction'

import RelatedSessions from './related-sessions'

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

type Props = {
	noun: Noun | void,
	campaign: Campaign | void,
}
function NounDetail({ noun, campaign }: Props) {
	if (!noun || !campaign) return <LoadingPage />
	const { name, summary, notes, private_notes, noun_type } = noun
	const typeSvg = nounTypeToSvg[noun_type]
	return (
		<IsOwner campaign={campaign}>
			{isOwner => (
				<React.Fragment>
					<PageHeader
						title={name}
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
						]}
						controls={
							isOwner ? (
								<HeaderButton
									to={`/campaigns/${campaign.id}/nouns/${noun.id}/edit`}
								>
									Edit
								</HeaderButton>
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
			)}
		</IsOwner>
	)
}

const getIds = ({ match: { params } }) => ({
	nounId: +params.nounId,
	campaignId: +params.campaignId,
})
export default flowRight(
	withNoun(getIds),
	withCampaign(props => getIds(props).campaignId)
)(NounDetail)
