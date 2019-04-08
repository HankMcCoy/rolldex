// @flow
import * as React from 'react'

import { useCampaign, useCampaignId, updateCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import CampaignForm from './campaign-form'

export default function EditCampaign() {
	const campaignId = useCampaignId()
	const [campaign] = useCampaign(campaignId)
	const history = useHistory()

	return campaign ? (
		<>
			<PageHeader
				title={`Edit ${campaign.name}`}
				breadcrumbs={[{ text: 'Campaigns', to: '/campaigns' }]}
			/>
			<PageContent>
				<CampaignForm
					initialValues={{
						name: campaign.name,
						description: campaign.description,
					}}
					onSubmit={(values, { setSubmitting }) => {
						const { name, description } = values
						updateCampaign({
							...campaign,
							name,
							description,
						}).then(() => {
							setSubmitting(false)
							history.push(`/campaigns/${campaign.id}`)
						})
					}}
				/>
			</PageContent>
		</>
	) : (
		<LoadingPage />
	)
}
