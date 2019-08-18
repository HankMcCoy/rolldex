import * as React from 'react'
import styled from 'styled-components/macro'

import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { Spacer } from 'r/components/spacer'
import { useHistory } from 'r/util/router'
import theme from 'r/theme'

export const Label = styled.label`
	display: flex;
	flex-direction: column;
`

export function FormRow({
	label,
	children,
}: {
	label: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<Label>
			<div>{label}</div>
			<Spacer height={5} />
			{children}
		</Label>
	)
}

export const SaveButtons = ({ onCancel }: { onCancel: () => void }) => {
	return (
		<div
			css={`
				display: flex;
				justify-content: flex-end;
			`}
		>
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
		</div>
	)
}

type Props = {
	onSubmit: (event: any) => void
	onCancel?: () => void
	children: React.ReactNode
}
export const StandardForm = ({ onSubmit, onCancel, children }: Props) => {
	const history = useHistory()
	return (
		<form
			onSubmit={onSubmit}
			css={`
				max-width: ${theme.largeFormWidth}px;
				& > * {
					margin-bottom: 20px;
				}
			`}
		>
			{children}
			<SaveButtons onCancel={onCancel || (() => history.goBack())} />
		</form>
	)
}
