import * as React from 'react'
import { Formik } from 'formik'

import { useSession, updateSession } from 'r/domains/sessions'
import { useCurCampaign } from 'r/domains/campaigns'
import { useRouteIdOrDie, useHistory } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import SessionForm, { convertValuesToDraftSession } from './session-form'

export default function EditSession() {
	const [campaign] = useCurCampaign()
	const [session] = useSession(useRouteIdOrDie('sessionId'))
	const history = useHistory()
	if (!campaign || !session) return <LoadingPage />

	return (
		<Formik
			initialValues={{
				name: session.name,
				summary: session.summary,
				notes: session.notes,
				privateNotes: session.private_notes,
			}}
			onSubmit={(values, { setSubmitting }) => {
				const draftSession = convertValuesToDraftSession(values)
				updateSession({
					...session,
					...draftSession,
				}).then(session => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}/sessions/${session.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<>
					<PageHeader
						title="Edit Session"
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
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
