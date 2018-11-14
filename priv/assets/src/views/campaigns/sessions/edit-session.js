// @flow
import * as React from 'react'
import { Formik } from 'formik'

import { useSession, useSessionMutations } from 'r/domains/sessions'
import { useCurCampaign } from 'r/domains/campaigns'
import { useRouteId, useHistory } from 'r/util/router'

import PageHeader, {
	HeaderButton,
	SecondaryHeaderButton,
	ControlsWrapper,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import SessionForm, { convertValuesToDraftSession } from './session-form'

export default function EditSession() {
	const { datum: campaign } = useCurCampaign()
	const { datum: session } = useSession(useRouteId('sessionId'))
	const history = useHistory()
	const { update: updateSession } = useSessionMutations()
	if (!campaign || !session) return <LoadingPage />

	const onCancel = () => {
		history.goBack()
	}
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
				<React.Fragment>
					<PageHeader
						title="Edit Session"
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
						]}
						controls={
							<ControlsWrapper>
								<SecondaryHeaderButton
									onClick={e => {
										onCancel()
									}}
								>
									Cancel
								</SecondaryHeaderButton>
								<HeaderButton type="submit" onClick={() => handleSubmit()}>
									Save
								</HeaderButton>
							</ControlsWrapper>
						}
					/>
					<PageContent>
						<SessionForm handleSubmit={handleSubmit} onCancel={onCancel} />
					</PageContent>
				</React.Fragment>
			)}
		/>
	)
}
