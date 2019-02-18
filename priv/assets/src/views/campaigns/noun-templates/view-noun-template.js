// @flow
import * as React from 'react'

import { useIsOwner, useCurCampaign } from 'r/domains/campaigns'
import { useNounTemplate } from 'r/domains/noun-templates'
import { useRouteParam, useLocation } from 'r/util/router'

import PageHeader, { EditControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import Spacer from 'r/components/spacer'
import TextSection from 'r/components/text-section'
import { getNounTypeTitle } from '../util/noun-util'

export default function ViewNounTemplate() {
	const { datum: campaign } = useCurCampaign()
	const nounTemplateId = +useRouteParam('nounTemplateId')
	const { datum: nounTemplate } = useNounTemplate(nounTemplateId)
	const isOwner = useIsOwner(campaign)
	const location = useLocation()

	if (!campaign || !nounTemplate) return <LoadingPage />

	return (
		<>
			<PageHeader
				title={`${getNounTypeTitle(nounTemplate.noun_type)} template`}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
				controls={
					<EditControls to={`${location.pathname}/edit`} isOwner={isOwner} />
				}
			/>
			<PageContent>
				<TextSection title="Name">{nounTemplate.name}</TextSection>
				<Spacer height={25} />
				<TextSection title="Summary">{nounTemplate.summary}</TextSection>
				<Spacer height={25} />
				<TextSection title="Notes" markdown>
					{nounTemplate.notes}
				</TextSection>
				<Spacer height={25} />
				<TextSection title="Private Notes" markdown>
					{nounTemplate.private_notes}
				</TextSection>
				<Spacer height={25} />
			</PageContent>
		</>
	)
}
