// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'
import { Formik } from 'formik'

import { connect } from 'r/util/redux'
import type { Session, DraftSession } from 'r/data/sessions'
import { createSession } from 'r/data/sessions/action-creators'
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
	history: History,
	createSession: DraftSession => Promise<Session>,
}
function AddSession({ campaign, history, createSession }: Props) {
	if (!campaign) return <LoadingPage />
	const onCancel = () => {
		history.push(`/campaigns/${campaign.id}`)
	}
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
				<React.Fragment>
					<PageHeader
						title="New Session"
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
							{ text: 'Add Session', to: `/campaigns/${campaign.id}/add` },
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
									Create
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

export default flowRight(
	withRouter,
	withCampaign(({ match: { params } }) => +params.campaignId),
	connect({
		actionCreators: {
			createSession,
		},
	})
)(AddSession)
