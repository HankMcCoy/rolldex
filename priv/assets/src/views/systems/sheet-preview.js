// @flow

import * as React from 'react'
import { useMemo, useReducer } from 'react'
import styled from '@emotion/styled/macro'

import { H2 } from 'r/components/heading'
import { Label } from 'r/components/form'
import { Input } from 'r/components/input'

import type { ThingDef, SheetValue } from './types'
import { getCalculatedValues } from './get-calculated-values'

const Sheet = styled.div`
	padding: 20px 30px;
`

type SheetValueState = Map<string, SheetValue>
type SheetValueAction = {
	type: 'UPDATE',
	fullName: string,
	sheetValue: SheetValue,
}
function sheetValueReducer(state: SheetValueState, action: SheetValueAction) {
	switch (action.type) {
		case 'UPDATE':
			return new Map([...state, [action.fullName, action.sheetValue]])
		default:
			throw new Error('Unreachable')
	}
}

export default function SheetPreview({
	things,
}: {
	things: Map<string, ThingDef>,
}) {
	const [sheetValues, dispatch] = useReducer(sheetValueReducer, new Map())
	const calculatedValues = useMemo(
		() => getCalculatedValues(things, sheetValues),
		[things, sheetValues]
	)
	return (
		<Sheet>
			<H2>Preview</H2>
			{[...things.values()].map(t => (
				<Label>
					{t.label}
					{t.children.map(c => {
						if (c.type === 'INSTANCE_VALUE') {
							if (c.valueType === 'number') {
								return (
									<Input
										type={'number'}
										onChange={e => {
											const value = e.target.value || 0
											dispatch({
												type: 'UPDATE',
												fullName: `${t.name}_${c.name}`,
												sheetValue: {
													type: 'number',
													name: c.name,
													value,
												},
											})
										}}
									/>
								)
							}
						} else if (c.type === 'CALC_VALUE') {
							return <div>{calculatedValues.get(`${t.name}_${c.name}`)}</div>
						}
						throw new Error('WTF')
					})}
				</Label>
			))}
		</Sheet>
	)
}
