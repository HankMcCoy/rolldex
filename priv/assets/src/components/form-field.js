// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'
import { Field } from 'formik'

import { type ErrCode, getValidationMessage } from 'r/util/formik'
import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

const Label = styled.label`
	display: flex;
	flex-direction: column;
`

const Error = styled.div`
	margin-top: 5px;
	color: #b81422;
`

type FieldProps = {
	field: {
		name: string,
		onChange: Function,
		onBlur: Function,
		value: any,
		onChange: Function,
	},
	form: {
		values: { [field: string]: any },
		touched: { [field: string]: boolean },
		errors: { [field: string]: ErrCode },
		handleChange: Function,
		handleBlur: Function,
		handleSubmit: Function,
	},
}
type Props = {
	label: string,
	name: string,
	render?: FieldProps => ?React.Node,
	component?: React.ComponentType<FieldProps> | string,
	validate?: (value: any) => void | string | Promise<any>,
}
export default function FormField({
	label,
	name,
	render,
	component: Component,
	validate,
	...rest
}: Props) {
	return (
		<Field
			{...rest}
			name={name}
			validate={validate}
			render={({ field, form }: FieldProps) => {
				let content
				if (render) {
					content = render({ field, form })
				} else if (typeof Component == 'string') {
					content = <Component {...rest} {...field} />
				} else if (Component) {
					content = <Component {...rest} field={field} form={form} />
				} else {
					content = <input {...rest} {...field} />
				}

				const error: ErrCode = form.errors[name]
				const isTouched = form.touched[name]

				return (
					<Label>
						<H2>{label}</H2>
						<Spacer height={10} />
						{content}
						{error && isTouched && (
							<Error>{getValidationMessage(error, label)}</Error>
						)}
					</Label>
				)
			}}
		/>
	)
}
