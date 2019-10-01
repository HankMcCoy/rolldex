import * as React from 'react'
import { Formik, FormikActions } from 'formik'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'

import { callApi } from 'r/util/api'
import { required } from 'r/util/formik'
import FormField from 'r/components/form-field'
import { Spacer } from 'r/components/spacer'
import { Input } from 'r/components/input'
import { H1 } from 'r/components/heading'
import { PrimaryButton, UnstyledLink } from 'r/components/button'
import { useState } from 'react'

const FormWrapper = styled.form`
	max-width: 500px;
	margin: 100px auto 0 auto;
`
const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

type Values = {
	email: string
	password: string
}
const Login = () => {
	const [badLogin, setBadLogin] = useState(false)
	const history = useHistory()
	const login = React.useCallback(
		(values: Values, { setSubmitting }: FormikActions<Values>) => {
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
					setBadLogin(false)
					history.push('/')
				},
				err => {
					setSubmitting(false)
					setBadLogin(true)
				}
			)
		},
		[history]
	)

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			onSubmit={login}
			render={({ handleSubmit, errors }) => (
				<FormWrapper onSubmit={handleSubmit}>
					<H1>Rolldex</H1>
					<Spacer height={20} />
					<FormField
						name="email"
						label="Email"
						validate={required}
						render={({ field }) => <Input {...field} />}
					/>
					<Spacer height={10} />
					<FormField
						name="password"
						label="Password"
						validate={required}
						render={({ field }) => <Input {...field} type="password" />}
					/>
					{badLogin && <div>Bad login</div>}
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

export default Login
