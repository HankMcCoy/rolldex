import flatMap from 'lodash-es/flatMap'
import { matchPath, useLocation } from 'react-router'
import theme from 'r/theme'

export function intersperse<X, Y>(
	arr: Array<X>,
	inter: (idx: number) => Y
): Array<X | Y> {
	return flatMap(arr, (a, i) => (i ? [inter(i), a] : [a]))
}

type SubApp = 'campaigns' | 'systems'
const getSubApp = (path: string): SubApp => {
	if (matchPath(path, { path: '/campaigns' })) return 'campaigns'
	if (matchPath(path, { path: '/systems' })) return 'systems'
	throw new Error(`Unknown sub-app for path: ${path}`)
}

const subAppColors: {
	campaigns: 'campaignColor'
	systems: 'systemColor'
} = {
	campaigns: 'campaignColor',
	systems: 'systemColor',
}
export const getSubAppColor = (pathname: string): string => {
	const subApp = getSubApp(pathname)
	return theme[subAppColors[subApp]]
}

export const useSubAppColor = () => {
	const { pathname } = useLocation()
	return getSubAppColor(pathname)
}

interface HasUpdatedDate {
	updated_at: string
}
export const getFirstNByDateUpdated = <T extends HasUpdatedDate>(
	arr: Array<T>,
	n: number
): Array<T> => {
	return arr
		.slice()
		.sort(
			(a, b) =>
				new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
		)
		.slice(0, n)
}
