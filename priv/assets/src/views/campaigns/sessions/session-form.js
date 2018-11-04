// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Field } from 'formik'

import { required } from 'r/util/formik'
import FormField, {
	FieldLabel,
	FieldHeading,
	FieldSpacer,
} from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'
import Markdown from 'r/components/markdown'
import ResizableTextarea from 'r/components/resizeable-textarea'

import { type DraftSession } from 'r/domains/sessions'

const FormWrapper = styled.div`
	& input {
		width: 100%;
	}
	& textarea {
		min-width: 100%;
		max-width: 100%;
	}
`
const Column = styled.div`
	flex: 1 0 0%;
	max-width: 600px;
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
				<Column>
					<FormField name="name" label="Name" validate={required} autoFocus />
					<Spacer height={20} />
					<FormField
						name="summary"
						label="Summary"
						component="textarea"
						rows={3}
						validate={required}
					/>
					<Spacer height={20} />
				</Column>
				<FieldLabel>
					<FieldHeading>Notes</FieldHeading>
					<FieldSpacer />
					<div
						css={`
							display: flex;
						`}
					>
						<Column>
							<Field
								name="notes"
								render={({ field }) => (
									<ResizableTextarea minRows={1} {...field} />
								)}
							/>
						</Column>
						<Spacer width={40} />
						<Column>
							<Field
								name="notes"
								render={({ field }) => <Markdown>{field.value}</Markdown>}
							/>
						</Column>
					</div>
				</FieldLabel>
				<Column>
					<Spacer height={20} />
					<FormField
						name="privateNotes"
						label="Private Notes"
						component="textarea"
						rows={15}
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
				</Column>
			</form>
		</FormWrapper>
	)
}
