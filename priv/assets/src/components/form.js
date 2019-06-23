// @flow
import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'

import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'
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
	label: React.Node,
	children: React.Node,
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
			css={css`
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

type Props = {|
	onSubmit: (event: any) => void,
	onCancel?: () => void,
	children: React.ChildrenArray<React.Element<typeof FormField>>,
|}
export const StandardForm = ({ onSubmit, onCancel, children }: Props) => {
	const history = useHistory()
	return (
		<form
			onSubmit={onSubmit}
			css={css`
				max-width: ${theme.largeFormWidth}px;
				& > * {
					margin-bottom: 20px;
				}
			`}
		>
			{children}
			<SaveButtons
				onSubmit={onSubmit}
				onCancel={onCancel || (() => history.goBack())}
			/>
		</form>
	)
}
