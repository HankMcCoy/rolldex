// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'

import { connect } from 'r/util/redux'
import type { Session, DraftSession } from 'r/data/sessions'
import { createSession } from 'r/data/sessions/action-creators'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import SessionForm from './session-form'

type Props = {
	campaign: Campaign | void,
	history: History,
	createSession: DraftSession => Promise<Session>,
}
function AddSession({ campaign, history, createSession }: Props) {
	if (!campaign) return <LoadingPage />
	return (
		<React.Fragment>
			<PageHeader
				title="New Session"
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
					{ text: 'Add Session', to: `/campaigns/${campaign.id}/add` },
				]}
			/>
			<PageContent>
				<SessionForm
					initialValues={{
						name: '',
						summary: '',
						notes: '',
						privateNotes: '',
					}}
					onSubmit={(values, { setSubmitting }) => {
						const { name, summary, notes, privateNotes } = values
						createSession({
							name,
							summary,
							notes,
							private_notes: privateNotes,
							campaign_id: campaign.id,
						}).then(session => {
							setSubmitting(false)
							history.push(`/campaigns/${campaign.id}`)
						})
					}}
					onCancel={() => {
						history.push(`/campaigns/${campaign.id}`)
					}}
				/>
			</PageContent>
		</React.Fragment>
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
