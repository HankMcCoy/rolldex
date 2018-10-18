// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Field } from 'formik'

import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

const Label = styled('label')`
	display: flex;
	flex-direction: column;
`

type Props = {
	label: React.Node,
	name: string,
}
export default function FormField({ label, name, ...rest }: Props) {
	return (
		<Label>
			<H2>{label}</H2>
			<Spacer height={10} />
			<Field name={name} {...rest} />
		</Label>
	)
}
