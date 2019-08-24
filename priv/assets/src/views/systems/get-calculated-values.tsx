import { Parser } from 'hot-formula-parser'
import { ValueDef, CalcValueDef, SheetValue } from './types'

const getMatchingSheetNumberValue = (
	fullName: string,
	sheetValues: Map<string, SheetValue>
): number => {
	const matchingValue = sheetValues.get(fullName)
	if (!matchingValue) {
		return 0
	}
	if (matchingValue.type === 'number') {
		return matchingValue.value
	}
	throw new Error(`Value found matching ${fullName}, but it isn't a number`)
}

export function getCalculatedValues(
	valueDefs: Map<string, ValueDef>,
	sheetValues: Map<string, SheetValue>
): Map<string, number> {
	const parser = new Parser()
	const valueMap: Map<string, number> = new Map()
	const setValue = (name: string, value: number) => {
		valueMap.set(name, value)
		parser.setVariable(name, value)
	}

	let unsolvedValueDefs: Array<CalcValueDef> = []
	for (let [name, valueDef] of valueDefs) {
		if (valueDef.type === 'INSTANCE_VALUE' && valueDef.valueType === 'number') {
			setValue(name, getMatchingSheetNumberValue(name, sheetValues))
		} else if (valueDef.type === 'CALC_VALUE') {
			unsolvedValueDefs.push(valueDef)
		}
	}

	// While there elements left in the unsolved children...
	while (unsolvedValueDefs.length) {
		let nextUnsolved: Array<CalcValueDef> = []
		// Iterate through the list of unsolved calculations
		for (let unsolvedValueDef of unsolvedValueDefs) {
			// Try to calculate it...
			const { result, error } = parser.parse(unsolvedValueDef.calc) as {
				result: number | null
				error: string | null
			}

			// If it fails, push it to the next version of the unsolved children array
			if (error !== null) {
				console.error(error)
				nextUnsolved.push(unsolvedValueDef)
			}
			// If it succeeds, set it's value in the result map and define it on the parser
			else if (result !== null) {
				setValue(unsolvedValueDef.name, result)
			}
			// Make Flow happy
			else {
				throw new Error('Unreachable')
			}
		}

		// Replace the list of unsolved children with the new one
		if (unsolvedValueDefs.length === nextUnsolved.length) {
			throw new Error(
				'Circular dependencies detected in formulas: ' +
					nextUnsolved.map(x => x.name).join(', ')
			)
		}
		unsolvedValueDefs = nextUnsolved
	}

	return valueMap
}
