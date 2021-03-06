import * as React from 'react'
import { $Diff } from 'utility-types'

import { required } from 'r/util/formik'
import { StandardForm } from 'r/components/form'
import FormField from 'r/components/form-field'
import MdEditor from 'r/components/md-editor'
import { Input, Textarea } from 'r/components/input'

import { DraftSession } from 'r/domains/sessions'

export type Values = {
	name: string
	summary: string
	notes: string
	privateNotes: string
}

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
	handleSubmit: (event: any) => void
}
export default function SessionForm({ handleSubmit }: Props) {
	return (
		<StandardForm onSubmit={handleSubmit}>
			<FormField
				name="name"
				label="Name"
				validate={required}
				render={({ field }) => <Input autoFocus {...field} />}
			/>
			<FormField
				name="summary"
				label="Summary"
				validate={required}
				render={({ field }) => <Textarea rows={3} {...field} />}
			/>
			<FormField
				name="notes"
				label="Notes"
				render={({ field }) => <MdEditor {...field} />}
			/>
			<FormField
				name="privateNotes"
				label="Private Notes"
				render={({ field }) => <MdEditor {...field} />}
			/>
		</StandardForm>
	)
}
