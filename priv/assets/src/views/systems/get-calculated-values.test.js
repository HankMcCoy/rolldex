// @flow
import { getCalculatedValues } from './get-calculated-values'
import type { ValueDef, SheetValue } from './types'

const arrToMap = <T: { name: string }>(arr: Array<T>): Map<string, T> =>
	new Map([...arr.map(v => [v.name, v])])

it('returns an empty map given empty values', () => {
	const things = new Map()
	const sheetValues = new Map()
	const result = getCalculatedValues(things, sheetValues)

	expect(result.size).toEqual(0)
})

it('retrieves a single instance value', () => {
	const things: Array<ValueDef> = [
		{
			label: 'Strength',
			name: 'str',
			type: 'INSTANCE_VALUE',
			valueType: 'number',
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'str',
			type: 'number',
			value: 12,
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.size).toEqual(1)
	expect(result.get('str')).toEqual(12)
})

it('calculates a value based on a single instance value', () => {
	const things: Array<ValueDef> = [
		{
			type: 'INSTANCE_VALUE',
			name: 'str',
			label: 'Strength',
			valueType: 'number',
		},
		{
			type: 'CALC_VALUE',
			name: 'strMod',
			label: 'Strength Modifier',
			calc: 'FLOOR((str - 10)/2)',
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'str',
			type: 'number',
			value: 13,
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.get('strMod')).toEqual(1)
})

it('ignores string values', () => {
	const things: Array<ValueDef> = [
		{
			label: 'Character Name',
			name: 'characterName',
			type: 'INSTANCE_VALUE',
			valueType: 'string',
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'characterName',
			type: 'string',
			value: 'Fluter Flam',
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.size).toEqual(0)
})
