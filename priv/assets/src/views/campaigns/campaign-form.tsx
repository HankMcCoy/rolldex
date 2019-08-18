
import * as React from 'react'
import { Formik } from 'formik'

import { required } from 'r/util/formik'

import { StandardForm } from 'r/components/form'
import FormField from 'r/components/form-field'
import { Textarea } from 'r/components/input'

type Values = {
	name: string,
	description: string,
}
type Props = {
	initialValues: Values,
	onSubmit: (Values, *) => void,
}
function CampaignForm({ initialValues, onSubmit }: Props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={({ handleSubmit }) => (
				<StandardForm onSubmit={handleSubmit}>
					<FormField name="name" label="Name" validate={required} />
					<FormField
						name="description"
						label="Description"
						component={Textarea}
						validate={required}
					/>
				</StandardForm>
			)}
		/>
	)
}

export default CampaignForm
