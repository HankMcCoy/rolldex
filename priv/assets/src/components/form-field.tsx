
import * as React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'

import { ErrCode, getValidationMessage } from 'r/util/formik'
import { H2 } from 'r/components/heading'
import { Input } from 'r/components/input'
import { FormRow } from 'r/components/form'
import theme from 'r/theme'

const Error = styled.div`
	margin-top: 5px;
	color: ${theme.dangerRed};
`

type FieldInfo = {
	name: string,
	onChange: Function,
	onBlur: Function,
	value: any,
}
type FormInfo = {
	values: { [field: string]: any },
	touched: { [field: string]: boolean },
	errors: { [field: string]: ErrCode },
	handleChange: Function,
	handleBlur: Function,
	handleSubmit: Function,
}
type FieldProps = {
	field: FieldInfo,
	form: FormInfo,
}
export default function FormField<
	InputComponent: React.ComponentType<FieldInfo>
>({
	label,
	name,
	render,
	component: Component,
	validate,
	...rest
}: {
	label: string,
	name: string,
	render?: FieldProps => ?React.ReactNode,
	component?: React.ComponentType<React.ElementConfig<InputComponent>>,
	validate?: (value: any) => void | string | Promise<any>,
}) {
	return (
		<Field
			{...rest}
			name={name}
			validate={validate}
			render={({ field, form }: FieldProps) => {
				const error: ErrCode = form.errors[name]
				const isTouched = form.touched[name]
				let content
				if (render) {
					content = render({ field, form })
				} else if (Component) {
					content = <Component {...rest} {...field} error={error} />
				} else {
					content = <Input {...rest} {...field} error={error} />
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
