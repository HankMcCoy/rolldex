// @flow
import * as React from 'react'
import { Formik } from 'formik'

import { useNoun, useNounMutations } from 'r/domains/nouns'
import { useCurCampaign } from 'r/domains/campaigns'
import { useHistory, useRouteId } from 'r/util/router'

import PageHeader, {
	HeaderButton,
	SecondaryHeaderButton,
	ControlsWrapper,
} from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import NounForm, { type Values, convertValuesToDraftNoun } from './noun-form'

export default function EditNoun() {
	const history = useHistory()
	const { datum: campaign } = useCurCampaign()
	const { datum: noun } = useNoun(useRouteId('nounId'))
	const { update: updateNoun } = useNounMutations()

	if (!campaign || !noun) return <LoadingPage />

	const onCancel = () => {
		history.goBack()
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
									data-id="cancel"
									onClick={e => {
										onCancel()
									}}
									title="Cancel (Ctrl/Cmd-E)"
								>
									Cancel
								</SecondaryHeaderButton>
								<HeaderButton
									type="submit"
									data-id="save"
									onClick={() => handleSubmit()}
									title="Save (Ctrl/Cmd-S)"
								>
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
