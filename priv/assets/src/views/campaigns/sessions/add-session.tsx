// @flow
import * as React from 'react'
import { Formik } from 'formik'

import { createSession } from 'r/domains/sessions'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import SessionForm, { convertValuesToDraftSession } from './session-form'

export default function AddSession() {
	const [campaign] = useCurCampaign()
	const history = useHistory()

	if (!campaign) return <LoadingPage />

	return (
		<Formik
			initialValues={{
				name: '',
				summary: '',
				notes: '',
				privateNotes: '',
			}}
			onSubmit={(values, { setSubmitting }) => {
				const draftSession = convertValuesToDraftSession(values)
				createSession({
					...draftSession,
					campaign_id: campaign.id,
				}).then(session => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<>
					<PageHeader
						title="New Session"
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
							{ text: 'Add Session', to: `/campaigns/${campaign.id}/add` },
						]}
						controls={<SaveControls onSubmit={handleSubmit} />}
					/>
					<PageContent>
						<SessionForm handleSubmit={handleSubmit} />
					</PageContent>
				</>
			)}
		/>
	)
}
