import * as React from 'react'
import { useState, useEffect, useContext } from 'react'

import { callApi } from 'r/util/api'

type User = {
	id: number
	email: string
}
const AuthCtx = React.createContext<User | undefined>(
	undefined
) as React.Context<User>

type ProviderProps = {
	children: React.ReactNode
}

export function AuthProvider({ children }: ProviderProps) {
	const [curUser, setCurUser] = useState<User>()
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
