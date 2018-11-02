// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Field } from 'formik'

import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

export const FieldLabel = styled('label')`
	display: flex;
	flex-direction: column;
`

export const FieldHeading = H2
export const FieldSpacer = () => <Spacer height={10} />

type Props = {
	label: React.Node,
	name: string,
}
export default function FormField({ label, name, ...rest }: Props) {
	return (
		<FieldLabel>
			<FieldHeading>{label}</FieldHeading>
			<FieldSpacer />
			<Field name={name} {...rest} />
		</FieldLabel>
	)
}
