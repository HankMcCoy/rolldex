// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'
import { Formik } from 'formik'

import { connect } from 'r/util/redux'

import type { Noun } from 'r/data/nouns'
import { updateNoun } from 'r/data/nouns/action-creators'
import { withNoun } from 'r/data/nouns/connectors'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader, {
	HeaderButton,
	SecondaryHeaderButton,
	ControlsWrapper,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm, { type Values, convertValuesToDraftNoun } from './noun-form'

type Props = {
	campaign: Campaign,
	noun: Noun,
	history: History,
	updateNoun: Noun => Promise<Noun>,
}

function EditNoun({ campaign, noun, history, updateNoun }: Props) {
	if (!campaign || !noun) return <LoadingPage />
	const onCancel = () => {
		history.push(`/campaigns/${campaign.id}/nouns/${noun.id}`)
	}
	return (
		<Formik
			initialValues={{
				name: noun.name,
				summary: noun.summary,
				notes: noun.notes,
				privateNotes: noun.private_notes,
				nounType: noun.noun_type,
			}}
			onSubmit={(values: Values, { setSubmitting }) => {
				const draftNoun = convertValuesToDraftNoun(values)
				updateNoun({
					...noun,
					...draftNoun,
				}).then(noun => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}/nouns/${noun.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<React.Fragment>
					<PageHeader
						title={`Edit ${noun.name}`}
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
						<NounForm handleSubmit={handleSubmit} onCancel={onCancel} />
					</PageContent>
				</React.Fragment>
			)}
		/>
	)
}

const getIds = ({ match: { params } }) => ({
	campaignId: +params.campaignId,
	nounId: +params.nounId,
})
export default flowRight(
	withRouter,
	withCampaign(props => getIds(props).campaignId),
	withNoun(getIds),
	connect({
		actionCreators: {
			updateNoun,
		},
	})
)(EditNoun)
