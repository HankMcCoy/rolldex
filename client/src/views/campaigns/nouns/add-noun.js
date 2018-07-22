// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { type History } from 'history'
import { withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'

import type { Noun, DraftNoun } from 'r/data/nouns'
import { createNoun } from 'r/data/nouns/action-creators'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm from './noun-form'

type Props = {
	campaign: Campaign,
	history: History,
	createNoun: DraftNoun => Promise<Noun>
}
function AddNoun({ campaign, history, createNoun }: Props) {
	if (!campaign) return <LoadingPage />
	return (
		<React.Fragment>
			<PageHeader
				title="New Noun"
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` }
				]}
			/>
			<PageContent>
				<NounForm
					initialValues={{
						name: '',
						summary: '',
						notes: '',
						nounType: ''
					}}
					onSubmit={(values, { setSubmitting }) => {
						const { name, summary, notes, nounType } = values
						if (nounType === '') throw new Error('Empty nounType')
						createNoun({
							name,
							summary,
							notes,
							noun_type: nounType,
							campaign_id: campaign.id
						}).then(noun => {
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
			createNoun
		}
	})
)(AddNoun)
