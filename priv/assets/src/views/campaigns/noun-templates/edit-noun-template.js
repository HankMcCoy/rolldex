// @flow
import * as React from 'react'
import { Formik } from 'formik'

import { useCurCampaign } from 'r/domains/campaigns'
import { useRouteParam } from 'r/util/router'

import PageHeader, { SaveControls } from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'
import { getNounTypeTitleFromPathToken } from '../util/noun-util'

import { StandardForm } from 'r/components/form'
import MdEditor from 'r/components/md-editor'
import FormField from 'r/components/form-field'
import { Textarea } from 'r/components/input'

export default function EditNounTemplate() {
	const { datum: campaign } = useCurCampaign()
	const nounType = useRouteParam('nounType')
	console.log({ campaign, nounType })

	if (!campaign || !nounType) return <LoadingPage />

	return (
		<Formik
			initialValues={{
				name: '',
				summary: '',
				notes: '',
				privateNotes: '',
			}}
			onSubmit={() => {}}
			render={({ handleSubmit }) => (
				<>
					<PageHeader
						title={`Edit ${getNounTypeTitleFromPathToken(nounType)} Template`}
						breadcrumbs={[
							{ text: 'Campaigns', to: '/campaigns' },
							{ text: campaign.name, to: `/campaigns/${campaign.id}` },
						]}
						controls={<SaveControls onSubmit={handleSubmit} />}
					/>
					<PageContent>
						<Formik>
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
						</Formik>
					</PageContent>
				</>
			)}
		/>
	)
}
