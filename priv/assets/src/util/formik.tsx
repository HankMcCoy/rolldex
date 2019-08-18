// Validations
export type ErrCode = 'required'
export const required = (value: string): ErrCode | void =>
	value ? undefined : 'required'

const validationMessagesByCode: {
	[key in ErrCode]: (name: string) => string
} = {
	required: name => `${name} is required`,
}
export const getValidationMessage = (errCode: ErrCode, name: string) =>
	(validationMessagesByCode[errCode] || (() => 'Unknown validation error'))(
		name
	)
