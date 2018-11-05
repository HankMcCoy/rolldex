// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Field } from 'formik'

import theme from 'r/theme'
import { required } from 'r/util/formik'
import { FieldLabel, FieldHeading, FieldSpacer } from 'r/components/form-field'
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

const FieldWithPreview = ({
	heading,
	name,
	renderField,
	renderPreview,
	validate,
}: {
	heading: string,
	name: string,
	renderField: ({ field: { value: string } }) => React.Node,
	renderPreview: ({ field: { value: string } }) => React.Node,
	validate?: string => string | void,
}) => {
	return (
		<FieldLabel>
			<FieldHeading>{heading}</FieldHeading>
			<FieldSpacer />
			<div
				css={`
					display: flex;
				`}
			>
				<Column>
					<Field name={name} render={renderField} validate={validate} />
				</Column>
				<Spacer width={80} />
				<Column
					css={`
						background: ${theme.campaignColorLight};
					`}
				>
					<Field name={name} render={renderPreview} />
				</Column>
			</div>
		</FieldLabel>
	)
}

type Props = {
	handleSubmit: (event: any) => void,
	onCancel: () => void,
}
export default function SessionForm({ handleSubmit, onCancel }: Props) {
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit}>
				<FieldWithPreview
					heading="Summary"
					name="summary"
					renderField={({ field }) => (
						<ResizableTextarea minRows={4} {...field} />
					)}
					renderPreview={({ field }) => <Markdown>{field.value}</Markdown>}
					validate={required}
				/>
				<Spacer height={20} />
				<FieldWithPreview
					heading="Notes"
					name="notes"
					renderField={({ field }) => (
						<ResizableTextarea minRows={10} {...field} />
					)}
					renderPreview={({ field }) => <Markdown>{field.value}</Markdown>}
				/>
				<Spacer height={20} />
				<FieldWithPreview
					heading="Private Notes"
					name="privateNotes"
					renderField={({ field }) => (
						<ResizableTextarea minRows={10} {...field} />
					)}
					renderPreview={({ field }) => <Markdown>{field.value}</Markdown>}
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
