// @flow
import * as React from 'react'

import { useIsOwner, useCurCampaign } from 'r/domains/campaigns'
import { useRouteParam, useLocation } from 'r/util/router'

import PageHeader, { EditControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import Spacer from 'r/components/spacer'
import TextSection from 'r/components/text-section'
import { getNounTypeTitleFromPathToken } from '../util/noun-util'

export default function ViewNounTemplate() {
	const { datum: campaign } = useCurCampaign()
	const nounType = useRouteParam('nounType')
	const isOwner = useIsOwner(campaign)
	const location = useLocation()

	if (!campaign || !nounType) return <LoadingPage />

	return (
		<>
			<PageHeader
				title={`${getNounTypeTitleFromPathToken(nounType)} template`}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
				controls={
					<EditControls to={`${location.pathname}/edit`} isOwner={isOwner} />
				}
			/>
			<PageContent>
				<TextSection title="Name">Name</TextSection>
				<Spacer height={25} />
				<TextSection title="Summary">Cool summary</TextSection>
				<Spacer height={25} />
				<TextSection title="Notes" markdown>
					Definitely **notes**
				</TextSection>
				<Spacer height={25} />
				<TextSection title="Private Notes" markdown>
					MAJOR _spoilers_
				</TextSection>
				<Spacer height={25} />
			</PageContent>
		</>
	)
}
