import * as React from 'react'
import styled from 'styled-components/macro'
import { Field, FieldProps, FieldInputProps } from 'formik'

import { ErrCode, getValidationMessage } from 'r/util/formik'
import { H2 } from 'r/components/heading'
import { Input } from 'r/components/input'
import { FormRow } from 'r/components/form'
import theme from 'r/theme'

const Error = styled.div`
	margin-top: 5px;
	color: ${theme.dangerRed};
`

export default function FormField<
	InputComponent extends React.ComponentType<FieldInputProps & {}>
>({
	label,
	name,
	render,
	component: Component,
	validate,
	...rest
}: {
	label: string
	name: string
	render?: (fp: FieldProps) => React.ReactNode
	component?: any
	validate?: (value: any) => void | string | Promise<any>
}) {
	return (
		<Field
			{...rest}
			name={name}
			validate={validate}
			render={({ field, form }: FieldProps) => {
				const error = form.errors[name]
				const isTouched = form.touched[name]
				let content
				if (render) {
					content = render({ field, form })
				} else if (Component) {
					content = <Component {...rest} {...field} error={error} />
				} else {
					content = <Input {...rest} {...field} />
				}

				return (
					<FormRow label={<H2>{label}</H2>}>
						<>
							{content}
							{error && isTouched && (
								<Error>{getValidationMessage(error, label)}</Error>
							)}
						</>
					</FormRow>
				)
			}}
		/>
	)
}
