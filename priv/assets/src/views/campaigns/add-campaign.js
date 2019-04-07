// @flow
import * as React from 'react'

import { createCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

import CampaignForm from './campaign-form'

export default function AddCampaign() {
	const history = useHistory()
	return (
		<React.Fragment>
			<PageHeader title="New Campaign" />
			<PageContent>
				<CampaignForm
					initialValues={{
						name: '',
						description: '',
					}}
					onSubmit={(values, { setSubmitting }) => {
						const { name, description } = values
						createCampaign({ name, description }).then(campaign => {
							setSubmitting(false)
							history.push(`/campaigns/${campaign.id}`)
						})
					}}
				/>
			</PageContent>
		</React.Fragment>
	)
}
