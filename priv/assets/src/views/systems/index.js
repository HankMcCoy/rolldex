// @flow

import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'

import { useInput, useReducer } from 'r/util/hooks'
import PageHeader from 'r/components/page-header'
import { Spacer, SpaceChildren } from 'r/components/spacer'
import { Input, Select } from 'r/components/input'
import { FormRow } from 'r/components/form'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { H2 } from 'r/components/heading'
import theme from 'r/theme'

import type { ValueDef } from './types'
import SheetPreview from './sheet-preview'

const Content = styled.div`
	display: flex;
	flex: 1 0 0%;
`

const ValueDefFrame = styled.div`
	background: #f8f8f8;
	border: 1px solid #ddd;
	padding: 0 20px;
`
const Controls = styled.div`
	flex: 1 0 0%;
	background: ${theme.systemColorLight};
	padding: 20px 30px;
`

const LeftFrame = styled.div`
	flex: 1 0 0%;
`

function EditValueDef({
	valueDef,
	onSave,
	onCancel,
}: {
	valueDef?: ValueDef,
	onSave: ValueDef => void,
	onCancel: () => void,
}) {
	const name = useInput(valueDef && valueDef.name)
	const label = useInput(valueDef && valueDef.label)
	const type = useInput((valueDef && valueDef.type) || 'INSTANCE_VALUE')
	const instanceValueType = useInput('number')
	const calc = useInput('')

	return (
		<ValueDefFrame>
			<form
				onSubmit={() => {
					if (type.value === 'INSTANCE_VALUE') {
						const valueType:
							| 'string'
							| 'number' = (instanceValueType.value: any)

						onSave({
							type: 'INSTANCE_VALUE',
							name: name.value,
							label: label.value,
							valueType,
						})
					} else if (type.value === 'CALC_VALUE') {
						onSave({
							type: 'CALC_VALUE',
							name: name.value,
							label: label.value,
							calc: calc.value,
						})
					}
				}}
				css={css`
					padding: 10px 0 20px 0;
				`}
			>
				<SpaceChildren height={12}>
					<FormRow label="Name:">
						<Input {...name} autoFocus />
					</FormRow>
					<FormRow label="Label:">
						<Input {...label} />
					</FormRow>
					<FormRow label="Type:">
						<Select {...type}>
							<option value="INSTANCE_VALUE">Value</option>
							<option value="CALC_VALUE">Calculation</option>
						</Select>
					</FormRow>
					{type.value === 'INSTANCE_VALUE' && (
						<FormRow label="Input type:">
							<Select {...instanceValueType}>
								<option value="number">Number</option>
								<option value="string">Text</option>
							</Select>
						</FormRow>
					)}
					{type.value === 'CALC_VALUE' && (
						<FormRow label="Formula:">
							<Input {...calc} />
						</FormRow>
					)}
					<div
						css={css`
							display: flex;
							flex-direction: row-reverse;
						`}
					>
						<PrimaryButton>Save</PrimaryButton>
						<Spacer width={10} />
						<SecondaryButton
							onClick={e => {
								e.preventDefault()
								onCancel()
							}}
						>
							Cancel
						</SecondaryButton>
					</div>
				</SpaceChildren>
			</form>
		</ValueDefFrame>
	)
}

function DisplayValueDef({
	valueDef,
	edit,
}: {
	valueDef: ValueDef,
	edit: () => void,
}) {
	return (
		<ValueDefFrame>
			<div
				css={css`
					line-height: 50px;
					display: flex;
					align-items: center;
					justify-content: space-between;
				`}
			>
				{valueDef.name}
				<SecondaryButton onClick={edit}>Edit</SecondaryButton>
			</div>
		</ValueDefFrame>
	)
}
type ValueDefState = {
	valueDefs: Map<string, ValueDef>,
	isEditing: Map<string, boolean>,
	isDrafting: boolean,
}
type ValueDefAction =
	| {| type: 'CREATE', valueDef: ValueDef |}
	| {| type: 'EDIT', name: string |}
	| {| type: 'CANCEL_EDIT', name: string |}
	| {| type: 'UPDATE', valueDef: ValueDef |}
	| {| type: 'DRAFT' |}
	| {| type: 'CANCEL_DRAFT' |}
const mapAdd = <K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> =>
	new Map([...map, [key, value]])
function reduceValueDefs(
	s: ValueDefState,
	action: ValueDefAction
): ValueDefState {
	switch (action.type) {
		case 'DRAFT':
			return { ...s, isDrafting: true }
		case 'CANCEL_DRAFT':
			return { ...s, isDrafting: false }
		case 'CREATE':
			return {
				...s,
				valueDefs: mapAdd(s.valueDefs, action.valueDef.name, action.valueDef),
				isDrafting: false,
			}
		case 'EDIT':
			return { ...s, isEditing: mapAdd(s.isEditing, action.name, true) }
		case 'CANCEL_EDIT':
			return { ...s, isEditing: mapAdd(s.isEditing, action.name, false) }
		case 'UPDATE':
			return {
				...s,
				isEditing: mapAdd(s.isEditing, action.valueDef.name, false),
				valueDefs: mapAdd(s.valueDefs, action.valueDef.name, action.valueDef),
			}
		default:
			throw new Error(`Invalid action ${action.type}`)
	}
}

function Systems() {
	const [{ valueDefs, isDrafting, isEditing }, dispatch] = useReducer<
		ValueDefState,
		ValueDefAction
	>(reduceValueDefs, {
		valueDefs: new Map(),
		isEditing: new Map(),
		isDrafting: false,
	})

	return (
		<>
			<PageHeader title="Systems" />
			<Content>
				<LeftFrame>
					<SheetPreview valueDefs={valueDefs} />
				</LeftFrame>
				<Controls>
					<H2>Definitions </H2>
					<Spacer height={10} />
					<div
						css={css`
							& > *:not(:last-child) {
								margin-bottom: 5px;
							}
						`}
					>
						{[...valueDefs.values()].map(v =>
							isEditing.get(v.name) ? (
								<EditValueDef
									valueDef={v}
									onCancel={() =>
										dispatch({ type: 'CANCEL_EDIT', name: v.name })
									}
									onSave={valueDef => {
										dispatch({ type: 'UPDATE', valueDef })
									}}
								/>
							) : (
								<DisplayValueDef
									valueDef={v}
									edit={() => {
										dispatch({ type: 'EDIT', name: v.name })
									}}
								/>
							)
						)}
					</div>
					{!!valueDefs.size && <Spacer height={10} />}
					{isDrafting ? (
						<EditValueDef
							onCancel={() => dispatch({ type: 'CANCEL_DRAFT' })}
							onSave={valueDef => {
								dispatch({ type: 'CREATE', valueDef })
							}}
						/>
					) : (
						<PrimaryButton onClick={() => dispatch({ type: 'DRAFT' })}>
							+
						</PrimaryButton>
					)}
				</Controls>
			</Content>
		</>
	)
}

export default Systems
