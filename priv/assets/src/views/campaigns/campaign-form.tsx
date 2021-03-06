import * as React from 'react'
import { Formik, FormikActions } from 'formik'

import { required } from 'r/util/formik'

import { StandardForm } from 'r/components/form'
import FormField from 'r/components/form-field'
import { Input, Textarea } from 'r/components/input'

type Values = {
	name: string
	description: string
}
type Props = {
	initialValues: Values
	onSubmit: (values: Values, actions: FormikActions<Values>) => void
}
function CampaignForm({ initialValues, onSubmit }: Props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={({ handleSubmit }) => (
				<StandardForm onSubmit={handleSubmit}>
					<FormField
						name="name"
						label="Name"
						validate={required}
						render={({ field }) => <Input {...field} />}
					/>
					<FormField
						name="description"
						label="Description"
						validate={required}
						render={({ field }) => <Textarea {...field} />}
					/>
				</StandardForm>
			)}
		/>
	)
}

export default CampaignForm
