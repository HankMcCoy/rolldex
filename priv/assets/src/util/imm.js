// @flow
function mapProduce<K, V>(m: Map<K, V>, fn: (Map<K, V>) => void): Map<K, V> {
	const draft = new Map(m.entries())
	fn(draft)
	return draft
}

function setProduce<K>(m: Set<K>, fn: (Set<K>) => void): Set<K> {
	const draft = new Set(m.values())
	fn(draft)
	return draft
}

export const mapDelete = <K, V>(m: Map<K, V>, key: K): Map<K, V> =>
	mapProduce(m, m => {
		m.delete(key)
	})

export const mapSet = <K, V>(m: Map<K, V>, key: K, value: V): Map<K, V> =>
	mapProduce(m, m => {
		m.set(key, value)
	})

export const setDelete = <K>(m: Set<K>, key: K): Set<K> =>
	setProduce(m, m => {
		m.delete(key)
	})

export const setAdd = <K>(m: Set<K>, key: K): Set<K> =>
	setProduce(m, m => {
		m.add(key)
	})
