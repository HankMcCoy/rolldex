export type InstanceValueDef = {
	type: 'INSTANCE_VALUE'
	name: string
	label: string
	valueType: 'string' | 'number'
}

export type CalcValueDef = {
	type: 'CALC_VALUE'
	name: string
	label: string
	calc: string
}

export type ValueDef = InstanceValueDef | CalcValueDef

export type SheetNumberValue = {
	type: 'number'
	name: string
	value: number
}

export type SheetStringValue = {
	type: 'string'
	name: string
	value: string
}

export type SheetValue = SheetNumberValue | SheetStringValue
