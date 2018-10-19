// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Formik } from 'formik'

import { required } from 'r/util/formik'

import type { NounType } from 'r/data/nouns'

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
	summary: string,
	notes: string,
	privateNotes: string,
	nounType: NounType | '',
|}
type Props = {|
	initialValues: Values,
	onSubmit: (Values, *) => void,
	onCancel: () => void,
|}
export default function NounForm({ initialValues, onSubmit, onCancel }: Props) {
	return (
		<FormWrapper>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FormField name="name" label="Name" validate={required} autoFocus />
						<Spacer height={20} />
						<FormField
							name="nounType"
							label="Type"
							component="select"
							validate={required}
						>
							<option />
							<option value="PERSON">Person</option>
							<option value="PLACE">Place</option>
							<option value="THING">Thing</option>
							<option value="FACTION">Faction</option>
						</FormField>
						<Spacer height={20} />
						<FormField
							name="summary"
							label="Summary"
							component="textarea"
							rows={10}
							validate={required}
						/>
						<Spacer height={20} />
						<FormField
							name="notes"
							label="Notes"
							component="textarea"
							rows={20}
						/>
						<Spacer height={20} />
						<FormField
							name="privateNotes"
							label="Private Notes"
							component="textarea"
							rows={20}
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
