// @flow
import * as React from 'react'
import { useEffect, useReducer, useRef } from 'react'

import JumpTo from './jump-to'

const useClick = (
	el: HTMLElement | Document,
	listener: MouseEvent => void,
	deps: ?$ReadOnlyArray<mixed>
) => {
	return useEffect(() => {
		el.addEventListener('click', listener)
		return () => el.removeEventListener('click', listener)
	}, deps)
}

const useKeydown = (
	el: HTMLElement | Document,
	listener: KeyboardEvent => void,
	deps: ?$ReadOnlyArray<mixed>
) => {
	return useEffect(() => {
		el.addEventListener('keydown', listener)
		return () => el.removeEventListener('keydown', listener)
	}, deps)
}

type Modal = React.Element<*>
type State = Array<Modal>
type Action = { type: 'SHOW_MODAL', payload: Modal } | { type: 'HIDE_MODAL' }
function modalsReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SHOW_MODAL':
			return [...state, action.payload]
		case 'HIDE_MODAL':
			return state.slice(0, -1)
		default:
			throw new Error(`Invalid modals action ${action.type}`)
	}
}
export default function ModalsPresenter() {
	const rootRef = useRef<HTMLDivElement>(null)
	const [modals, dispatch] = useReducer<State, Action>(modalsReducer, [])

	const handleClick = (event: MouseEvent) => {
		if (rootRef && rootRef.current && rootRef.current === event.target) {
			dispatch({ type: 'HIDE_MODAL' })
		}
	}
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			dispatch({ type: 'HIDE_MODAL' })
		}
		if (
			event.key === 'k' &&
			(event.metaKey || event.ctrlKey) &&
			!event.shiftKey
		) {
			event.preventDefault()
			if (!modals.length || modals[modals.length - 1].type !== JumpTo) {
				dispatch({
					type: 'SHOW_MODAL',
					payload: <JumpTo close={() => dispatch({ type: 'HIDE_MODAL' })} />,
				})
			}
		}
	}

	useClick(document, handleClick, [])
	useKeydown(document, handleKeydown, [modals])

	if (!modals.length) {
		return null
	}

	return (
		<div
			ref={rootRef}
			css={`
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.3);
				z-index: 1000;
			`}
		>
			{modals.map((modal, idx) => React.cloneElement(modal, { key: idx }))}
		</div>
	)
}
