import * as React from 'react'
import { useMemo } from 'react'
import styled from 'styled-components/macro'

import { H2 } from 'r/components/heading'
import { Label } from 'r/components/form'
import { Input } from 'r/components/input'
import { useReducer } from 'r/util/hooks'

import { ValueDef, SheetValue } from './types'
import { getCalculatedValues } from './get-calculated-values'

const Sheet = styled.div`
	padding: 20px 30px;
`

type SheetValueState = Map<string, SheetValue>
type SheetValueAction = {
	type: 'UPDATE'
	sheetValue: SheetValue
}
function sheetValueReducer(state: SheetValueState, action: SheetValueAction) {
	switch (action.type) {
		case 'UPDATE':
			return new Map([...state, [action.sheetValue.name, action.sheetValue]])
		default:
			throw new Error('Unreachable')
	}
}

export default function SheetPreview({
	valueDefs,
}: {
	valueDefs: Map<string, ValueDef>
}) {
	const [sheetValues, dispatch] = useReducer(sheetValueReducer, new Map())
	const calculatedValues = useMemo(
		() => getCalculatedValues(valueDefs, sheetValues),
		[valueDefs, sheetValues]
	)
	return (
		<Sheet>
			<H2>Preview</H2>
			{[...valueDefs.values()].map(v => {
				let content
				if (v.type === 'INSTANCE_VALUE') {
					if (v.valueType === 'number') {
						content = (
							<Input
								type="number"
								onChange={e => {
									const { value: rawVal } = e.target
									const value = typeof rawVal === 'number' ? rawVal : 0
									dispatch({
										type: 'UPDATE',
										sheetValue: {
											type: 'number',
											name: v.name,
											value,
										},
									})
								}}
							/>
						)
					}
				} else if (v.type === 'CALC_VALUE') {
					content = <div>{calculatedValues.get(v.name)}</div>
				} else {
					throw new Error('WTF')
				}
				return (
					<Label>
						{v.label}
						{content}
					</Label>
				)
			})}
		</Sheet>
	)
}
