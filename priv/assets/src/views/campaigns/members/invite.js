// @flow
import * as React from 'react'

import { useMemberMutations } from 'r/domains/members'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import MemberForm from './member-form'

export default function AddNoun() {
	const history = useHistory()
	const { datum: campaign } = useCurCampaign()
	const { create: createMember } = useMemberMutations()
	if (!campaign) return <LoadingPage />
	return (
		<React.Fragment>
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
					onSubmit={(values, { setSubmitting }) => {
						const { email } = values
						createMember({
							email,
							campaign_id: campaign.id,
							member_type: 'READ_ONLY',
						}).then(() => {
							setSubmitting(false)
							history.push(`/campaigns/${campaign.id}`)
						})
					}}
				/>
			</PageContent>
		</React.Fragment>
	)
}
