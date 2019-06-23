// @flow
export type InstanceValueDef = {|
	type: 'INSTANCE_VALUE',
	name: string,
	valueType: 'string' | 'number',
|}

export type CalcValueDef = {|
	type: 'CALC_VALUE',
	name: string,
	calc: string,
|}

export type ChildDef = InstanceValueDef | CalcValueDef

export type ThingDef = {|
	label: string,
	name: string,
	children: Array<ChildDef>,
|}

export type SheetNumberValue = {|
	type: 'number',
	name: string,
	value: number,
|}

export type SheetStringValue = {|
	type: 'string',
	name: string,
	value: string,
|}

export type SheetValue = SheetNumberValue | SheetStringValue
