// @flow
import * as React from 'react'
import { Formik } from 'formik'

import { useCurCampaign } from 'r/domains/campaigns'
import {
	useNounTemplate,
	useNounTemplateMutations,
} from 'r/domains/noun-templates'
import { useRouteParam, useHistory } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import { getNounTypeTitle } from '../util/noun-util'

import { StandardForm } from 'r/components/form'
import MdEditor from 'r/components/md-editor'
import FormField from 'r/components/form-field'
import { Textarea } from 'r/components/input'

export default function EditNounTemplate() {
	const { datum: campaign } = useCurCampaign()
	const nounTemplateId = +useRouteParam('nounTemplateId')
	const { datum: nounTemplate } = useNounTemplate(nounTemplateId)
	const { update } = useNounTemplateMutations()
	const history = useHistory()

	if (!campaign || !nounTemplate) return <LoadingPage />

	return (
		<Formik
			initialValues={{
				name: nounTemplate.name,
				summary: nounTemplate.summary,
				notes: nounTemplate.notes,
				privateNotes: nounTemplate.private_notes,
			}}
			onSubmit={(values, { setSubmitting }) => {
				const { name, summary, notes, privateNotes } = values
				update({
					...nounTemplate,
					name,
					summary,
					notes,
					private_notes: privateNotes,
				}).then(() => {
					setSubmitting(false)
					history.push(`/campaigns/${campaign.id}`)
				})
			}}
			render={({ handleSubmit }) => (
				<>
					<PageHeader
						title={`Edit ${getNounTypeTitle(nounTemplate.noun_type)} Template`}
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
						]}
						controls={<SaveControls onSubmit={handleSubmit} />}
					/>
					<PageContent>
						<StandardForm onSubmit={handleSubmit}>
							<FormField name="name" label="Name" autoFocus />
							<FormField
								name="summary"
								label="Summary"
								component={Textarea}
								rows={3}
							/>
							<FormField name="notes" label="Notes" component={MdEditor} />
							<FormField
								name="privateNotes"
								label="Private Notes"
								component={MdEditor}
							/>
						</StandardForm>
					</PageContent>
				</>
			)}
		/>
	)
}
