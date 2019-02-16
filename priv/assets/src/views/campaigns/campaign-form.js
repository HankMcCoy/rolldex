// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'
import { Formik } from 'formik'

import { required } from 'r/util/formik'

import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { Textarea } from 'r/components/input'
import Spacer from 'r/components/spacer'

const FormWrapper = styled('div')`
	max-width: 500px;
`

const ButtonsWrapper = styled('div')`
	display: flex;
	justify-content: flex-end;
`

type Values = {|
	name: string,
	description: string,
|}
type Props = {|
	initialValues: Values,
	onSubmit: (Values, *) => void,
	onCancel: () => void,
|}
function CampaignForm({ initialValues, onSubmit, onCancel }: Props) {
	return (
		<FormWrapper>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FormField name="name" label="Name" validate={required} />
						<Spacer height={20} />
						<FormField
							name="description"
							label="Description"
							component={Textarea}
							validate={required}
						/>
						<Spacer height={20} />
						<ButtonsWrapper>
							<SecondaryButton
								onClick={e => {
									e.preventDefault()
									onCancel()
								}}
							>
								Cancel
							</SecondaryButton>
							<Spacer width={10} />
							<PrimaryButton type="submit">Save</PrimaryButton>
						</ButtonsWrapper>
					</form>
				)}
			/>
		</FormWrapper>
	)
}

export default CampaignForm
