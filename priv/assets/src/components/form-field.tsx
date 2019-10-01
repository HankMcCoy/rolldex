import * as React from 'react'
import styled from 'styled-components/macro'
import { Field, FieldProps } from 'formik'

import { isErrCode, ErrCode, getValidationMessage } from 'r/util/formik'
import { H2 } from 'r/components/heading'
import { FormRow } from 'r/components/form'
import theme from 'r/theme'

const FieldError = styled.div`
	margin-top: 5px;
	color: ${theme.dangerRed};
`

export default function FormField({
	label,
	name,
	render,
	validate,
	...rest
}: {
	label: string
	name: string
	render: (fp: FieldProps) => React.ReactNode
	validate?: (value: any) => void | ErrCode | Promise<any>
}) {
	return (
		<Field
			{...rest}
			name={name}
			validate={validate}
			render={({ field, form }: FieldProps) => {
				const error = form.errors[name]
				const isTouched = form.touched[name]
				if (
					error !== undefined &&
					(typeof error !== 'string' || !isErrCode(error))
				) {
					throw new Error('Formik errors must be an ErrCode string enum value')
				}

				return (
					<FormRow label={<H2>{label}</H2>}>
						<>
							{render({ field, form })}
							{error && isTouched && (
								<FieldError>{getValidationMessage(error, label)}</FieldError>
							)}
						</>
					</FormRow>
				)
			}}
		/>
	)
}
