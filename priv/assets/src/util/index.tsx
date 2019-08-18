import flatMap from 'lodash-es/flatMap'
import { matchPath } from 'react-router'

export function intersperse<X, Y>(
	arr: Array<X>,
	inter: (number) => Y
): Array<X | Y> {
	return flatMap(arr, (a, i) => (i ? [inter(i), a] : [a]))
}

type SubApp = 'campaigns' | 'systems'
const getSubApp = (path: string): SubApp => {
	if (matchPath(path, { path: '/campaigns' })) return 'campaigns'
	if (matchPath(path, { path: '/systems' })) return 'systems'
	throw new Error(`Unknown sub-app for path: ${path}`)
}

const subAppColors: { [key in SubApp]: string } = {
	campaigns: 'campaignColor',
	systems: 'systemColor',
}
export const getSubAppColor = ({
	match,
	theme,
}: {
	match: {
		path: string
	}
	theme: Object
}): string => {
	const subApp = getSubApp(match.path)
	return theme[subAppColors[subApp]]
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
