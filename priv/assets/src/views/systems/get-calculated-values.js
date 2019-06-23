// @flow
import type { ThingDef, SheetValue } from './types'

export function getCalculatedValues(
	things: Map<string, ThingDef>,
	sheetValues: Map<string, SheetValue>
): Map<string, number> {
	const valueMap: Map<string, number> = new Map()
	for (let [thingName, thing] of things) {
		console.log('**************')
		console.log(thing.children)
		for (let child of thing.children) {
			if (child.type === 'INSTANCE_VALUE') {
				const fullName = `${thingName}_${child.name}`
				const matchingValue = sheetValues.get(fullName)

				if (matchingValue === undefined) {
					throw new Error(`No value exists in the sheet matching ${fullName}`)
				} else if (typeof matchingValue.value === 'number') {
					// Fow now we don't handle formulas modifying text
					valueMap.set(fullName, matchingValue.value)
				}
			}
		}
	}
	return valueMap
}
