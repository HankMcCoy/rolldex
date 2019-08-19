const idRegExp = new RegExp('(/|^)([0-9]+)(/|$)', 'g')
const normalize = (path: string): string => {
	return path.replace(
		idRegExp,
		(_, lead: string, id: string, trail: string) => `${lead}:id${trail}`
	)
}
const getPathLevels = (path: string): Array<string> => {
	const segments = path.split('/').filter(x => x)
	return segments.reduce(
		(levels, segment) => {
			const prevSeg = levels[0] || ''
			return [`${prevSeg}/${segment}`, ...levels]
		},
		[] as string[]
	)
}

const subscriptions: Map<string, Array<() => void>> = new Map()
const invalidationManager = {
	subscribe: (path: string, cb: () => void) => {
		const normalizedPath = normalize(path)
		const oldCbs = subscriptions.get(normalizedPath) || []
		subscriptions.set(normalizedPath, [...oldCbs, cb])
	},
	unsubscribe: (path: string, cb: () => void) => {
		const normalizedPath = normalize(path)
		const oldCbs = subscriptions.get(normalizedPath) || []
		const cbIdx = oldCbs.indexOf(cb)
		if (cbIdx === -1) {
			console.warn('Attempted to unsubscribe an invalid callback')
		} else if (oldCbs.length === 1) {
			subscriptions.delete(normalizedPath)
		} else {
			subscriptions.set(normalizedPath, [
				...oldCbs.slice(0, cbIdx),
				...oldCbs.slice(cbIdx + 1),
			])
		}
	},
	invalidate: (path: string) => {
		const normalizedPath = normalize(path)
		getPathLevels(normalizedPath).forEach(level => {
			const subsForLevel = subscriptions.get(level)
			if (subsForLevel) {
				subsForLevel.forEach(cb => cb())
			}
		})
	},
}

export default invalidationManager
