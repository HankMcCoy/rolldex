// @flow
import { Parser } from 'hot-formula-parser'
import type { ThingDef, ChildDef, SheetValue } from './types'

const flatMap = <T, R>(arr: Array<T>, map: T => Array<R | void>): Array<R> => {
	return arr.map(map).reduce((result: Array<R>, r: Array<R | void>) => {
		for (let x of r) {
			if (x) {
				result.push(x)
			}
		}
		return result
	}, [])
}

const getMatchingSheetNumberValue = (
	fullName: string,
	sheetValues: Map<string, SheetValue>
): number => {
	const matchingValue = sheetValues.get(fullName)
	if (!matchingValue) {
		return 0
		//</R></R>throw new Error(`No value found in sheet, matching ${fullName}`)
	}
	if (matchingValue.type === 'number') {
		return matchingValue.value
	}
	throw new Error(`Value found matching ${fullName}, but it isn't a number`)
}

type UnsolvedChild = {|
	fullName: string,
	child: ChildDef,
|}
export function getCalculatedValues(
	things: Map<string, ThingDef>,
	sheetValues: Map<string, SheetValue>
): Map<string, number> {
	const valueMap: Map<string, number> = new Map()

	// Flatten the list of things into a flat list of unsolved children, ignoring string ones
	let unsolvedChildren: Array<UnsolvedChild> = flatMap(
		[...things.values()],
		thing => {
			return thing.children.map(c => ({
				fullName: `${thing.name}_${c.name}`,
				child: c,
			}))
		}
	)

	const parser = new Parser()

	// While there elements left in the unsolved children...
	while (unsolvedChildren.length) {
		let nextUnsolved: Array<UnsolvedChild> = []
		// Iterate through the list of unsolved children
		for (let { fullName, child } of unsolvedChildren) {
			// If it is an instance value, set it's value in the result map and define it on the parser
			if (child.type === 'INSTANCE_VALUE') {
				if (child.valueType === 'number') {
					const value = getMatchingSheetNumberValue(fullName, sheetValues)
					valueMap.set(fullName, value)
					parser.setVariable(fullName, value)
				}
			}

			if (child.type === 'CALC_VALUE') {
				// If it is a calculated value, try to calculate it
				const { result, error } = (parser.parse(child.calc): {
					result: number | null,
					error: string | null,
				})

				// If it fails, push it to the next version of the unsolved children array
				if (error !== null) {
					nextUnsolved.push({ fullName, child })
				}

				// If it succeeds, set it's value in the result map and define it on the parser
				else if (result !== null) {
					valueMap.set(fullName, result)
					parser.setVariable(fullName, result)
				}
				// Make Flow happy
				else {
					throw new Error('Unreachable')
				}
			}
		}

		// Replace the list of unsolved children with the new one
		if (unsolvedChildren.length === nextUnsolved.length) {
			throw new Error(
				'Circular dependencies detected in formulas: ' +
					nextUnsolved.map(x => x.fullName).join(', ')
			)
		}
		unsolvedChildren = nextUnsolved
	}

	return valueMap
}
