import * as React from 'react'
import qs from 'query-string'
import { Formik } from 'formik'

import { createNoun, asNounType } from 'r/domains/nouns'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm, { convertValuesToDraftNoun } from './noun-form'
import { useConfirmLeave } from '../../../util/hooks'

type ParsedParam = string | string[] | null | undefined
const asString = (param: ParsedParam): string => {
	return typeof param === 'string' ? param : ''
}

function AddNoun() {
	const history = useHistory()
	const [campaign] = useCurCampaign()
	useConfirmLeave()

	if (!campaign) return <LoadingPage />
	const queryParams = qs.parse(history.location.search)
	return (
		<Formik
			initialValues={{
				name: asString(queryParams.name),
				summary: '',
				notes: '',
				privateNotes: '',
				nounType: asNounType(asString(queryParams.nounType)) || 'PERSON',
			}}
			onSubmit={(values, { setSubmitting }) => {
				const draftNoun = convertValuesToDraftNoun(values)
				createNoun({
					...draftNoun,
					campaign_id: campaign.id,
				}).then(() => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<>
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
				</>
			)}
		/>
	)
}

export default AddNoun
