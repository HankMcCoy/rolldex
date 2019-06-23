// @flow
import * as React from 'react'
import { css } from '@emotion/core'

import { H2 } from 'r/components/heading'
import { FormRow } from 'r/components/form'
import { Input, Select } from 'r/components/input'
import Spacer from 'r/components/spacer'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { Modal, Header, Body, ButtonSection } from 'r/components/modal'
import { useInput } from 'r/util/hooks'

import type { ChildDef } from './types'

export default function AddChildModal({
	createChild,
	closeModal,
}: {
	createChild: ChildDef => void,
	closeModal: () => void,
}) {
	const name = useInput('')
	const type = useInput('INSTANCE_VALUE')
	const instanceValueType = useInput('string')
	const calc = useInput('')

	return (
		<Modal
			css={css`
				width: 600px;
			`}
		>
			<Header>
				<H2>Add field</H2>
			</Header>
			<Body>
				<FormRow label="Name:">
					<Input {...name} />
				</FormRow>
				<Spacer height={10} />
				<FormRow label="Type:">
					<Select {...type}>
						<option value="INSTANCE_VALUE">Instance value</option>
						<option value="CALC_VALUE">Calculated value</option>
					</Select>
				</FormRow>
				<Spacer height={10} />
				{type.value === 'INSTANCE_VALUE' && (
					<FormRow label="Input type:">
						<Select {...instanceValueType}>
							<option value="string">Text</option>
							<option value="number">Number</option>
						</Select>
					</FormRow>
				)}
				{type.value === 'CALC_VALUE' && (
					<FormRow label="Calculation:">
						<Input {...calc} />
					</FormRow>
				)}
			</Body>
			<ButtonSection>
				<SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
				<Spacer width={10} />
				<PrimaryButton
					onClick={() => {
						if (type.value === 'INSTANCE_VALUE') {
							const valType:
								| 'string'
								| 'number' = (instanceValueType.value: any)

							createChild({
								type: 'INSTANCE_VALUE',
								name: name.value,
								valueType: valType,
							})
						} else if (type.value === 'CALC_VALUE') {
							createChild({
								type: 'CALC_VALUE',
								name: name.value,
								calc: calc.value,
							})
						}
						closeModal()
					}}
				>
					Create
				</PrimaryButton>
			</ButtonSection>
		</Modal>
	)
}
