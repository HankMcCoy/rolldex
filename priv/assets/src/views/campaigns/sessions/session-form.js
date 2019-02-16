// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'

import { fromTheme } from 'r/theme'
import { required } from 'r/util/formik'
import FormField from 'r/components/form-field'
import MdEditor from 'r/components/md-editor'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { Textarea } from 'r/components/input'
import Spacer from 'r/components/spacer'

import { type DraftSession } from 'r/domains/sessions'

const FormWrapper = styled.div`
	max-width: ${fromTheme('largeFormWidth')}px;
	& input {
		width: 100%;
	}
	& textarea {
		min-width: 100%;
		max-width: 100%;
	}
`
const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`

export type Values = {|
	name: string,
	summary: string,
	notes: string,
	privateNotes: string,
|}

export const convertValuesToDraftSession = (
	values: Values
): $Diff<DraftSession, { campaign_id: number }> => {
	const { name, summary, notes, privateNotes } = values
	return {
		name,
		summary,
		notes,
		private_notes: privateNotes,
	}
}

type Props = {
	handleSubmit: (event: any) => void,
	onCancel: () => void,
}
export default function SessionForm({ handleSubmit, onCancel }: Props) {
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit}>
				<FormField name="name" label="Name" validate={required} autoFocus />
				<Spacer height={20} />
				<FormField
					name="summary"
					label="Summary"
					component={Textarea}
					rows={3}
					validate={required}
				/>
				<Spacer height={20} />
				<FormField
					name="notes"
					label="Notes"
					render={({ field }) => <MdEditor {...field} />}
				/>
				<Spacer height={20} />
				<FormField
					name="privateNotes"
					label="Private Notes"
					render={({ field }) => <MdEditor {...field} />}
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
		</FormWrapper>
	)
}
