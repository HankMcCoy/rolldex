// @flow

type FetchCache = Map<string, { data: mixed, lastAccessed: number }>

const MAX_CACHE_SIZE = 2
const NUM_TO_CLEAR = 2

const fetchCache: FetchCache = new Map()

export default {
	get: (path: string) => {
		const fromCache = fetchCache.get(path)
		if (fromCache) {
			fetchCache.set(path, {
				data: fromCache.data,
				lastAccessed: new Date().getTime(),
			})
			return fromCache.data
		}
		return undefined
	},
	set: (path: string, data: mixed) => {
		if (fetchCache.size > MAX_CACHE_SIZE && !fetchCache.has(path)) {
			console.log('EVICTING')
			const entries = [...fetchCache.entries()]
			entries.slice(-NUM_TO_CLEAR).forEach(([key]) => {
				console.log('EVICTING:', key)
				fetchCache.delete(key)
			})
		}
		fetchCache.set(path, {
			data,
			lastAccessed: new Date().getTime(),
		})
	},
	delete: (path: string) => {
		fetchCache.delete(path)
	},
}
