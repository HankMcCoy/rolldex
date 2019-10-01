// Validations
export enum ErrCode {
	required = 'required',
}
export const isErrCode = (err: string): err is ErrCode => {
	return err === ErrCode.required
}
export const required = (value: string): ErrCode | void =>
	value ? undefined : ErrCode.required

const validationMessagesByCode: {
	[key in ErrCode]: (name: string) => string
} = {
	required: name => `${name} is required`,
}
export const getValidationMessage = (errCode: ErrCode, name: string) =>
	(validationMessagesByCode[errCode] || (() => 'Unknown validation error'))(
		name
	)
