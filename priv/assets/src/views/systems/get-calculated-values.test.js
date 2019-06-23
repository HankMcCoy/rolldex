// @flow
import { getCalculatedValues } from './get-calculated-values'
import type { ThingDef, SheetValue } from './types'

const arrToMap = <T: { name: string }>(arr: Array<T>): Map<string, T> =>
	new Map([...arr.map(v => [v.name, v])])

it('returns an empty map given empty values', () => {
	const things = new Map()
	const sheetValues = new Map()
	const result = getCalculatedValues(things, sheetValues)

	expect(result.size).toEqual(0)
})

it('retrieves a single instance value', () => {
	const things: Array<ThingDef> = [
		{
			label: 'Strength',
			name: 'str',
			children: [
				{
					type: 'INSTANCE_VALUE',
					name: 'base',
					valueType: 'number',
				},
			],
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'str_base',
			type: 'number',
			value: 12,
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.size).toEqual(1)
	expect(result.get('str_base')).toEqual(12)
})

it('calculates a value based on a single instance value', () => {
	const things: Array<ThingDef> = [
		{
			label: 'Strength',
			name: 'str',
			children: [
				{
					type: 'INSTANCE_VALUE',
					name: 'base',
					valueType: 'number',
				},
				{
					type: 'CALC_VALUE',
					name: 'mod',
					calc: 'FLOOR((str_base - 10)/2)',
				},
			],
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'str_base',
			type: 'number',
			value: 13,
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.get('str_mod')).toEqual(1)
})

it('ignores string values', () => {
	const things: Array<ThingDef> = [
		{
			label: 'Character Name',
			name: 'characterName',
			children: [
				{
					type: 'INSTANCE_VALUE',
					name: 'base',
					valueType: 'string',
				},
			],
		},
	]
	const sheetValues: Array<SheetValue> = [
		{
			name: 'characterName_base',
			type: 'string',
			value: 'Fluter Flam',
		},
	]
	const thingsMap = new Map(arrToMap(things))
	const sheetValuesMap = new Map(arrToMap(sheetValues))
	const result = getCalculatedValues(thingsMap, sheetValuesMap)

	expect(result.size).toEqual(0)
})
