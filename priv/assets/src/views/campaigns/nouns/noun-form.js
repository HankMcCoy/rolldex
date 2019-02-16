// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'
import { required } from 'r/util/formik'

import type { NounType, DraftNoun } from 'r/domains/nouns'

import MdEditor from 'r/components/md-editor'
import FormField from 'r/components/form-field'
import { Textarea, Select } from 'r/components/input'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'
import theme from 'r/theme'

const FormWrapper = styled('div')`
	max-width: ${theme.largeFormWidth}px;
`

const ButtonsWrapper = styled('div')`
	display: flex;
	justify-content: flex-end;
`

export type Values = {|
	name: string,
	summary: string,
	notes: string,
	privateNotes: string,
	nounType: NounType,
|}

export const convertValuesToDraftNoun = (
	values: Values
): $Diff<DraftNoun, { campaign_id: number }> => {
	const { name, summary, notes, privateNotes, nounType } = values
	return {
		name,
		summary,
		notes,
		private_notes: privateNotes,
		noun_type: nounType,
	}
}

type Props = {|
	handleSubmit: (event: any) => void,
	onCancel: () => void,
|}
export default function NounForm({ handleSubmit, onCancel }: Props) {
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit}>
				<FormField name="name" label="Name" validate={required} autoFocus />
				<Spacer height={20} />
				<FormField
					name="nounType"
					label="Type"
					component={Select}
					validate={required}
				>
					<option value="" />
					<option value="PERSON">Person</option>
					<option value="PLACE">Place</option>
					<option value="THING">Thing</option>
					<option value="FACTION">Faction</option>
				</FormField>
				<Spacer height={20} />
				<FormField
					name="summary"
					label="Summary"
					component={Textarea}
					rows={3}
					validate={required}
				/>
				<Spacer height={20} />
				<FormField name="notes" label="Notes" component={MdEditor} />
				<Spacer height={20} />
				<FormField
					name="privateNotes"
					label="Private Notes"
					component={MdEditor}
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
