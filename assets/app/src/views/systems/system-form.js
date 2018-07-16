// @flow
import * as React from 'react'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik } from 'formik'

import { required } from 'r/util/formik'

import type { System } from 'r/data/systems'
import { withSystemList } from 'r/data/systems/connectors'

import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
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
	description: string
|}
type ExternalProps = {|
	initialValues: Values,
	onSubmit: (Values, *) => void,
	onCancel: () => void
|}
type BoundProps = {|
	systems: Array<System> | void
|}
function CampaignForm({
	initialValues,
	systems,
	onSubmit,
	onCancel
}: ExternalProps & BoundProps) {
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
							component="textarea"
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

const ExportedCampaignForm: React.ComponentType<ExternalProps> = flowRight(
	withSystemList
)(CampaignForm)
export default ExportedCampaignForm
