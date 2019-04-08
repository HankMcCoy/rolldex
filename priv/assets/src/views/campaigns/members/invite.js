// @flow
import * as React from 'react'

import { createMember } from 'r/domains/members'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import MemberForm from './member-form'

export default function AddNoun() {
	const history = useHistory()
	const [campaign] = useCurCampaign()
	if (!campaign) return <LoadingPage />
	return (
		<>
			<PageHeader
				title="New Member"
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
			/>
			<PageContent>
				<MemberForm
					initialValues={{
						email: '',
					}}
					onSubmit={(values, { setSubmitting, setFieldError }) => {
						const { email } = values
						createMember({
							email,
							campaign_id: campaign.id,
							member_type: 'READ_ONLY',
						}).then(
							() => {
								setSubmitting(false)
								history.push(`/campaigns/${campaign.id}`)
							},
							error => {
								setFieldError('email', 'Bad email')
							}
						)
					}}
				/>
			</PageContent>
		</>
	)
}
