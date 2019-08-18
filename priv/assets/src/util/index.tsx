// @flow
import flatMap from 'lodash-es/flatMap'
import { matchPath } from 'react-router-dom'

export function intersperse<X, Y>(
	arr: Array<X>,
	inter: number => Y
): Array<X | Y> {
	return flatMap(arr, (a, i) => (i ? [inter(i), a] : [a]))
}

type SubApp = 'campaigns' | 'systems'
const getSubApp = (path: string): SubApp => {
	if (matchPath(path, { path: '/campaigns' })) return 'campaigns'
	if (matchPath(path, { path: '/systems' })) return 'systems'
	throw new Error(`Unknown sub-app for path: ${path}`)
}

const subAppColors: { [SubApp]: string } = {
	campaigns: 'campaignColor',
	systems: 'systemColor',
}
export const getSubAppColor = ({
	match,
	theme,
}: {
	match: {
		path: string,
	},
	theme: Object,
}): string => {
	const subApp = getSubApp(match.path)
	return theme[subAppColors[subApp]]
}

export const getFirstNByDateUpdated = <T: { updated_at: string }>(
	arr: Array<T>,
	n: number
): Array<T> => {
	return arr
		.slice()
		.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
		.slice(0, n)
}
