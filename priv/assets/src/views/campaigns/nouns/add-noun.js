// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { type History } from 'history'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { Formik } from 'formik'

import { connect } from 'r/util/redux'

import type { Noun, DraftNoun } from 'r/data/nouns'
import { createNoun } from 'r/data/nouns/action-creators'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader, {
	HeaderButton,
	SecondaryHeaderButton,
	ControlsWrapper,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm, { convertValuesToDraftNoun } from './noun-form'

type Props = {
	campaign: Campaign,
	history: History,
	createNoun: DraftNoun => Promise<Noun>,
}
function AddNoun({ campaign, history, createNoun }: Props) {
	if (!campaign) return <LoadingPage />
	const queryParams = qs.parse(history.location.search)
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
				nounType: queryParams.nounType ? queryParams.nounType : '',
			}}
			onSubmit={(values, { setSubmitting }) => {
				const draftNoun = convertValuesToDraftNoun(values)
				createNoun({
					...draftNoun,
					campaign_id: campaign.id,
				}).then(noun => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<React.Fragment>
					<PageHeader
						title="New Noun"
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
									Create
								</HeaderButton>
							</ControlsWrapper>
						}
					/>
					<PageContent>
						<NounForm handleSubmit={handleSubmit} onCancel={onCancel} />
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
			createNoun,
		},
	})
)(AddNoun)
