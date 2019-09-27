import * as React from 'react'
import { required } from 'r/util/formik'

import { NounType, DraftNoun } from 'r/domains/nouns'

import { StandardForm } from 'r/components/form'
import MdEditor from 'r/components/md-editor'
import FormField from 'r/components/form-field'
import { Textarea, Select } from 'r/components/input'

export type Values = {
	name: string
	summary: string
	notes: string
	privateNotes: string
	nounType: NounType
}

export const convertValuesToDraftNoun = (
	values: Values
): Omit<DraftNoun, 'campaign_id'> => {
	const { name, summary, notes, privateNotes, nounType } = values
	return {
		name,
		summary,
		notes,
		private_notes: privateNotes,
		noun_type: nounType,
	}
}

type Props = {
	handleSubmit: (event: any) => void
}
export default function NounForm({ handleSubmit }: Props) {
	return (
		<StandardForm onSubmit={handleSubmit}>
			<FormField name="name" label="Name" validate={required} autoFocus />
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
			<FormField
				name="summary"
				label="Summary"
				component={Textarea}
				rows={3}
				validate={required}
			/>
			<FormField name="notes" label="Notes" component={MdEditor} />
			<FormField
				name="privateNotes"
				label="Private Notes"
				component={MdEditor}
			/>
		</StandardForm>
	)
}
