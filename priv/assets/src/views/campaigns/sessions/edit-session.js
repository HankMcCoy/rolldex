// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'
import { Formik } from 'formik'

import { connect } from 'r/util/redux'
import { type Session, type DraftSession } from 'r/data/sessions'
import { withSession } from 'r/data/sessions/connectors'
import { updateSession } from 'r/data/sessions/action-creators'
import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader, {
	HeaderButton,
	SecondaryHeaderButton,
	ControlsWrapper,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import SessionForm, { convertValuesToDraftSession } from './session-form'

type Props = {
	campaign: Campaign | void,
	session: Session | void,
	history: History,
	updateSession: Session => Promise<Session>,
}
function EditSession({ campaign, session, history, updateSession }: Props) {
	if (!campaign || !session) return <LoadingPage />
	const onCancel = () => {
		history.push(`/campaigns/${campaign.id}`)
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
					history.push(`/campaigns/${campaign.id}`)
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

const getIds = ({ match: { params } }) => ({
	campaignId: +params.campaignId,
	sessionId: +params.sessionId,
})

export default flowRight(
	withRouter,
	withCampaign(({ match: { params } }) => +params.campaignId),
	withSession(getIds),
	connect({
		actionCreators: {
			updateSession,
		},
	})
)(EditSession)
