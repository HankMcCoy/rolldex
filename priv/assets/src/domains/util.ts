export function getFromList<T extends { id: number }>(
	results: [T[], undefined] | [undefined, Error],
	id: number
): [T, undefined] | [undefined, Error] {
	const [list, err] = results
	if (list) {
		const item = list.find(x => x.id === id)
		return item
			? [item, undefined]
			: [undefined, new Error('No matching noun found')]
	} else if (err) {
		return [undefined, err]
	}
	return [undefined, new Error('Well this is impossible bullshit')]
}
