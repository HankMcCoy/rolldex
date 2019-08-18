import { useContext, useEffect } from 'react'
import { __RouterContext } from 'react-router'
import { History } from 'history'

export const useRouteParam = (paramName: string): string => {
	const { match }: { match: any } = useContext(__RouterContext)
	return match.params[paramName]
}

export const useRouteId = (paramName: string): number | void => {
	const param = useRouteParam(paramName)
	return param ? +param : undefined
}

export const useHistory = (): History => {
	const { history }: { history: History } = useContext(__RouterContext)
	return history
}
export const useLocation = (): any => {
	const { location }: { location: any } = useContext(__RouterContext)
	return location
}

export const useTitle = (title: string) => {
	useEffect(() => {
		document.title = title
	})
}
