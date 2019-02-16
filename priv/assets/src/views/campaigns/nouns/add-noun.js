// @flow
import * as React from 'react'
import qs from 'query-string'
import { Formik } from 'formik'

import { useNounMutations } from 'r/domains/nouns'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm, { convertValuesToDraftNoun } from './noun-form'

function AddNoun() {
	const history = useHistory()
	const { datum: campaign } = useCurCampaign()
	const { create: createNoun } = useNounMutations()

	if (!campaign) return <LoadingPage />
	const queryParams = qs.parse(history.location.search)
	return (
		<Formik
			initialValues={{
				name: queryParams.name ? queryParams.name : '',
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
						controls={<SaveControls onSubmit={handleSubmit} />}
					/>
					<PageContent>
						<NounForm handleSubmit={handleSubmit} />
					</PageContent>
				</React.Fragment>
			)}
		/>
	)
}

export default AddNoun
