

import * as React from 'react'
import { callApi } from 'r/util/api'
import { History } from 'history'
import { Formik } from 'formik'
import styled from 'styled-components'

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
class Register extends React.Component<Props, void> {
	render() {
		return (
			<Formik
				initialValues={{}}
				onSubmit={this.login}
				render={({ handleSubmit }) => (
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
						<Spacer height={10} />
						<ButtonWrapper>
							<UnstyledLink to="/login">Have an account?</UnstyledLink>
							<Spacer width={10} />
							<PrimaryButton>Register</PrimaryButton>
						</ButtonWrapper>
					</FormWrapper>
				)}
			/>
		)
	}

	login = (
		values: Values,
		{ setSubmitting }: { setSubmitting: boolean => void }
	) => {
		const { email, password } = values

		callApi({
			method: 'POST',
			path: '/api/users/register',
			body: {
				email,
				password,
			},
		}).then(() => {
			setSubmitting(false)
			this.props.history.push('/')
		})
	}
}

export default Register
