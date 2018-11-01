// @flow
import * as React from 'react'

import { callApi } from 'r/util/api'
import { useEffect, useState, useContext } from 'r/util/react-hooks'

type User = {
	id: number,
	email: string,
}
const AuthCtx: React.Context<?User> = React.createContext()

type ProviderProps = {
	children: React.Node,
}

export function AuthProvider({ children }: ProviderProps) {
	const [curUser, setCurUser] = useState()
	useEffect(() => {
		callApi({ method: 'GET', path: '/api/users/me' }).then(
			({ data: curUser }) => {
				setCurUser(curUser)
			}
		)
	}, [])

	return curUser ? (
		<AuthCtx.Provider value={curUser}>{children}</AuthCtx.Provider>
	) : null
}

export const useCurUserMaybe = () => {
	return useContext(AuthCtx)
}

export const useCurUser = () => {
	const curUser = useCurUserMaybe()
	if (!curUser) {
		throw new Error('No user found when one was expected')
	}
	return curUser
}
