import * as React from 'react'
import { Formik, FormikActions } from 'formik'

import { required } from 'r/util/formik'

import { StandardForm } from 'r/components/form'
import FormField from 'r/components/form-field'

type Values = {
	email: string
}
type Props = {
	initialValues: Values
	onSubmit: (values: Values, actions: FormikActions<Values>) => void
}
export default function MemberForm({ initialValues, onSubmit }: Props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={({ handleSubmit }) => (
				<StandardForm onSubmit={handleSubmit}>
					<FormField name="email" label="Email" validate={required} />
				</StandardForm>
			)}
		/>
	)
}
