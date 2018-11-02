// @flow
import * as React from 'react'
import sortBy from 'lodash-es/sortBy'
import { type Reducer, combineReducers } from 'redux'

import { setAdd, setDelete, mapSet, mapDelete } from 'r/util/imm'
import { useContext, useEffect, useReducer, useMemo } from 'r/util/react-hooks'
import { callApi } from 'r/util/api'

export default function createGenericDomain<DraftT, T: { id: number }>({
	name,
	useRootPath,
	wrapPost,
	wrapPut,
}: {|
	name: string,
	useRootPath: () => string,
	wrapPost: DraftT => any,
	wrapPut: T => any,
|}): {|
	Provider: React.ComponentType<{ children: React.Node }>,
	useList: (
		sortKeys: Array<string>,
		sortOrder: 'ASC' | 'DESC' | void
	) => {|
		list: Array<T>,
		hasLoadedAll: boolean,
		isLoadingAll: boolean,
	|},
	useOne: (
		id: number
	) => {
		datum: ?T,
		isLoading: boolean,
	},
	useMutations: () => {
		remove: (id: number) => Promise<void>,
		create: (draft: DraftT) => Promise<T>,
		update: (t: T) => Promise<T>,
	},
|} {
	type ByIdMap = Map<number, T>
	type MetaState = {|
		hasLoadedAll: boolean,
		isLoadingAll: boolean,
		isLoadingById: Set<number>,
	|}
	type State = {|
		data: ByIdMap,
		meta: MetaState,
	|}

	type FetchAllStartAction = {| +type: 'FETCH_ALL_START' |}
	type FetchAllResolvedAction = {|
		+type: 'FETCH_ALL_RESOLVED',
		+payload: Array<T>,
	|}
	type FetchOneStartAction = {| +type: 'FETCH_ONE_START', +payload: number |}
	type FetchOneResolvedAction = {| +type: 'FETCH_ONE_RESOLVED', +payload: T |}
	type RemoveStartAction = {|
		+type: 'REMOVE_START',
		+payload: number,
	|}
	type RemoveResolvedAction = {|
		+type: 'REMOVE_RESOLVED',
		+payload: number,
	|}
	type CreateStartAction = {|
		+type: 'CREATE_START',
		+payload: DraftT,
	|}
	type CreateResolvedAction = {|
		+type: 'CREATE_RESOLVED',
		+payload: T,
	|}
	type UpdateStartAction = {|
		+type: 'UPDATE_START',
		+payload: T,
	|}
	type UpdateResolvedAction = {|
		+type: 'UPDATE_RESOLVED',
		+payload: T,
	|}
	type Action =
		| FetchAllStartAction
		| FetchAllResolvedAction
		| FetchOneStartAction
		| FetchOneResolvedAction
		| CreateStartAction
		| CreateResolvedAction
		| UpdateStartAction
		| UpdateResolvedAction
		| RemoveStartAction
		| RemoveResolvedAction

	// $FlowFixMe
	const DispatchCtx: React.Context<(Action) => void> = React.createContext()

	const initialByIdState: ByIdMap = new Map()
	const byIdReducer: Reducer<ByIdMap, Action> = (
		state = initialByIdState,
		action
	) => {
		switch (action.type) {
			case 'FETCH_ALL_RESOLVED':
				return new Map(action.payload.map(m => [m.id, m]))
			case 'REMOVE_START':
				return mapDelete(state, action.payload)
			case 'FETCH_ONE_RESOLVED':
			case 'CREATE_RESOLVED':
				const member = action.payload
				return mapSet(state, member.id, member)
			default:
				return state
		}
	}
	const dataReducer = byIdReducer

	const initialMetaState: MetaState = {
		hasLoadedAll: false,
		isLoadingAll: false,
		isLoadingById: new Set(),
	}
	const metaReducer: Reducer<MetaState, Action> = (
		state = initialMetaState,
		action
	) => {
		switch (action.type) {
			case 'FETCH_ALL_START':
				return { ...state, isLoadingAll: true }
			case 'FETCH_ALL_RESOLVED':
				return { ...state, hasLoadedAll: true, isLoadingAll: false }
			case 'FETCH_ONE_START': {
				const id = action.payload
				return {
					...state,
					isLoadingById: setAdd(state.isLoadingById, id),
				}
			}
			case 'FETCH_ONE_RESOLVED': {
				const { id } = action.payload
				return {
					...state,
					isLoadingById: setDelete(state.isLoadingById, id),
				}
			}
			default:
				return state
		}
	}

	const reducer: Reducer<State, Action> = combineReducers({
		data: dataReducer,
		meta: metaReducer,
	})

	const StateCtx: React.Context<State> = React.createContext({
		data: initialByIdState,
		meta: initialMetaState,
	})
	function useReducerWithLogging<S, A: { +type: string }>(
		reducer: Reducer<S, A>,
		initialState: S,
		initialAction: ?A
	): [S, (A) => void] {
		const reducerWithLogging: Reducer<S, A> = useMemo(
			() => (state, action) => {
				const prevState = state
				const nextState = reducer(state, action)
				console.log(`${name}.${action.type}`, { prevState, action, nextState })
				return nextState
			},
			[reducer, initialState, initialAction]
		)
		return useReducer(reducerWithLogging, initialState, initialAction)
	}
	function Provider({ children }: { children: React.Node }) {
		const [state, dispatch] = useReducerWithLogging<State, Action>(reducer, {
			data: initialByIdState,
			meta: initialMetaState,
		})

		return (
			<DispatchCtx.Provider value={dispatch}>
				<StateCtx.Provider value={state}>{children}</StateCtx.Provider>
			</DispatchCtx.Provider>
		)
	}

	const useMutations = () => {
		const dispatch = useContext(DispatchCtx)
		const rootPath = useRootPath()
		return {
			remove: (id: number) => {
				dispatch({ type: 'REMOVE_START', payload: id })
				return callApi({
					method: 'DELETE',
					path: rootPath,
				}).then(() => {
					dispatch({ type: 'REMOVE_RESOLVED', payload: id })
				})
			},
			create: (draft: DraftT) => {
				dispatch({ type: 'CREATE_START', payload: draft })
				return callApi({
					method: 'POST',
					path: rootPath,
					body: wrapPost(draft),
				}).then(json => {
					const payload: T = json.data
					dispatch({ type: 'CREATE_RESOLVED', payload })
					return payload
				})
			},
			update: (t: T) => {
				dispatch({ type: 'UPDATE_START', payload: t })
				return callApi({
					method: 'PUT',
					path: rootPath,
					body: wrapPut(t),
				}).then(json => {
					const payload: T = json.data
					dispatch({ type: 'UPDATE_RESOLVED', payload })
					return payload
				})
			},
		}
	}

	const useList = (
		sortKeys: Array<string>,
		sortOrder: 'ASC' | 'DESC' = 'ASC'
	) => {
		const {
			data: byId,
			meta: { hasLoadedAll, isLoadingAll },
		} = useContext(StateCtx)
		const dispatch = useContext(DispatchCtx)
		const rootPath = useRootPath()

		// Immediately load members, if a request isn't already in flight
		useEffect(() => {
			if (!isLoadingAll) {
				dispatch({ type: 'FETCH_ALL_START' })
				callApi({
					method: 'GET',
					path: rootPath,
				}).then(json => {
					const payload: Array<T> = json.data
					dispatch({ type: 'FETCH_ALL_RESOLVED', payload })
				})
			}
		}, [])

		const list: Array<T> = sortBy([...byId.values()], sortKeys)
		if (sortOrder === 'DESC') {
			list.reverse()
		}

		return {
			list,
			hasLoadedAll,
			isLoadingAll,
		}
	}

	const useOne = (id: number) => {
		const {
			data: byId,
			meta: { isLoadingById },
		} = useContext(StateCtx)
		const dispatch = useContext(DispatchCtx)
		const rootPath = useRootPath()

		useEffect(
			() => {
				if (!isLoadingById.has(id)) {
					dispatch({ type: 'FETCH_ONE_START', payload: id })
					callApi({
						method: 'GET',
						path: `${rootPath}/${id}`,
					}).then(json => {
						const payload: T = json.data
						dispatch({ type: 'FETCH_ONE_RESOLVED', payload })
					})
				}
			},
			[id]
		)

		const t = byId.get(id)

		return {
			datum: t,
			isLoading: isLoadingById.has(id),
		}
	}

	return {
		Provider,
		useList,
		useOne,
		useMutations,
	}
}
