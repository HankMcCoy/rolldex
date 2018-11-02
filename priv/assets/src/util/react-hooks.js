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
	useLayoutEffect as useLayoutEffectImpl,
	// $FlowFixMe
	useMutationEffect as useMutationEffectImpl,
	// $FlowFixMe
	useReducer as useReducerImpl,
	// $FlowFixMe
	useMemo as useMemoImpl,
	// $FlowFixMe
	useRef as useRefImpl,
} from 'react'
import { type Reducer } from 'redux'

type UseState = <T>(T) => [T, (T | (T => T)) => void]
export const useState: UseState = useStateImpl

type UseContext = <T>(Context<T>) => T
export const useContext: UseContext = useContextImpl

type UseEffect = (() => void | (() => void), ?Array<any>) => void
export const useEffect: UseEffect = useEffectImpl
export const useLayoutEffect: UseEffect = useLayoutEffectImpl
export const useMutationEffect: UseEffect = useMutationEffectImpl

type UseReducer = <State, Action>(
	Reducer<State, Action>,
	State,
	?Action
) => [State, (Action) => void]
export const useReducer: UseReducer = useReducerImpl

type UseMemo = <T>(() => T, ?Array<any>) => T
export const useMemo: UseMemo = useMemoImpl

type UseRef = <T>(?T) => { (): void, current: T }
export const useRef: UseRef = useRefImpl
