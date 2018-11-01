// @flow
import {
	type Context,
	// $FlowFixMe
	useState as useStateImpl,
	// $FlowFixMe
	useContext as useContextImpl,
	// $FlowFixMe
	useEffect as useEffectImpl,
	// $FlowFixMe
	useReducer as useReducerImpl,
	// $FlowFixMe
	useMemo as useMemoImpl,
} from 'react'
import { type Reducer } from 'redux'

type UseState = <T>(T) => [T, (T | (T => T)) => void]
export const useState: UseState = useStateImpl

type UseContext = <T>(Context<T>) => T
export const useContext: UseContext = useContextImpl

type UseEffect = (() => void | (() => void), ?Array<any>) => void
export const useEffect: UseEffect = useEffectImpl

type UseReducer = <State, Action>(
	Reducer<State, Action>,
	State,
	?Action
) => [State, (Action) => void]
export const useReducer: UseReducer = useReducerImpl

type UseMemo = <T>(() => T, ?Array<any>) => T
export const useMemo: UseMemo = useMemoImpl
