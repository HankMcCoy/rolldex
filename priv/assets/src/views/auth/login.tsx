

import * as React from 'react'
import { callApi } from 'r/util/api'
import type { History } from 'history'
import { Formik } from 'formik'
import styled from '@emotion/styled/macro'

import { required } from 'r/util/formik'
import FormField from 'r/components/form-field'
import { Spacer } from 'r/components/spacer'
import { H1 } from 'r/components/heading'
import { PrimaryButton, UnstyledLink } from 'r/components/button'

const FormWrapper = styled.form`
	max-width: 500px;
	margin: 100px auto 0 auto;
`
const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

type Props = {
	history: History,
}
type Values = {
	email: string,
	password: string,
}
type FormErrors = {
	badLogin: boolean,
}
class Login extends React.Component<Props, void> {
	render() {
		return (
			<Formik
				initialValues={{}}
				onSubmit={this.login}
				render={({
					handleSubmit,
					errors,
				}: {
					handleSubmit: Function,
					errors: FormErrors,
				}) => (
					<FormWrapper onSubmit={handleSubmit}>
						<H1>Rolldex</H1>
						<Spacer height={20} />
						<FormField name="email" label="Email" validate={required} />
						<Spacer height={10} />
						<FormField
							name="password"
							label="Password"
							validate={required}
							type="password"
						/>
						{errors && errors.badLogin && <div>Bad login</div>}
						<Spacer height={10} />
						<ButtonWrapper>
							<UnstyledLink to="/register">Need an account?</UnstyledLink>
							<Spacer width={10} />
							<PrimaryButton>Login</PrimaryButton>
						</ButtonWrapper>
					</FormWrapper>
				)}
			/>
		)
	}

	login = (
		values: Values,
		{
			setSubmitting,
			setErrors,
		}: { setSubmitting: boolean => void, setErrors: FormErrors => void }
	) => {
		const { email, password } = values

		callApi({
			method: 'POST',
			path: '/api/users/sign-in',
			body: {
				email,
				password,
			},
		}).then(
			() => {
				setSubmitting(false)
				this.props.history.push('/')
			},
			err => {
				setSubmitting(false)
				setErrors({ badLogin: true })
				console.error(err)
			}
		)
	}
}

export default Login
