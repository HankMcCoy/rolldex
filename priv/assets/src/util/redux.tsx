// @flow

import { combineReducers as combineReducersImpl } from 'redux'

export type Action<Payload, Metadata = void> = {
	type: string,
	payload?: Payload,
	metadata?: Metadata,
}

export function success(actionType: string) {
	return actionType + '_SUCCESS'
}

export function failure(actionType: string) {
	return actionType + '_FAILURE'
}

export const combineReducers = <T: {}>(reducerMap: T) => {
	const result = combineReducersImpl<*, any>(reducerMap)
	return result
}
