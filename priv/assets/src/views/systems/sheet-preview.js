// @flow

import * as React from 'react'
import { useMemo } from 'react'
import styled from '@emotion/styled/macro'

import { H2 } from 'r/components/heading'
import { Label } from 'r/components/form'
import { Input } from 'r/components/input'

import type { ThingDef } from './types'
import { getCalculatedValues } from './get-calculated-values'

const Sheet = styled.div`
	padding: 20px 30px;
`

export default function SheetPreview({
	things,
}: {
	things: Map<string, ThingDef>,
}) {
	const calculatedValues = useMemo(() => getCalculatedValues(things), [things])
	return (
		<Sheet>
			<H2>Preview</H2>
			{[...things.values()].map(t => (
				<Label>
					{t.label}
					{t.children.map(c => {
						if (c.type === 'INSTANCE_VALUE') {
							return (
								<Input type={c.valueType === 'number' ? 'number' : 'text'} />
							)
						} else if (c.type === 'CALC_VALUE') {
							return <div>{calculatedValues.get(`${t.name}.${c.name}`)}</div>
						}
						throw new Error('WTF')
					})}
				</Label>
			))}
		</Sheet>
	)
}
