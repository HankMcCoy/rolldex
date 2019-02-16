// @flow
import * as React from 'react'
import { useState, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import { css } from '@emotion/core'
import isHotkey from 'is-hotkey'

import { useClick, useKeydown } from 'r/util/hooks'
import { subscribeToErrors } from 'r/util/api'
import JumpTo from './jump-to'
import Help from './help'
import NetworkError from './network-error'

type Modal = React.Element<*>
type State = Array<Modal>
type Action =
	| {
			type: 'SHOW_MODAL',
			payload: Modal,
	  }
	| {
			type: 'HIDE_MODAL',
	  }

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

function usePreserveFocus(modals) {
	// Restore the focus wherever it was previously, upon hiding the last modal.
	const [prevFocusedEl, setPrevFocusedEl] = useState()
	useLayoutEffect(
		() => {
			if (modals.length) {
				setPrevFocusedEl(document.activeElement)
			} else if (prevFocusedEl) {
				prevFocusedEl.focus()
			}
		},
		[modals.length > 0]
	)
}

type ContextType = {
	modals: State,
	showModal: Modal => void,
	closeModal: () => void,
}
// $FlowFixMe
const ModalContext = React.createContext<ContextType>()
export const ModalsConsumer = ModalContext.Consumer

type KeyHandler = (e: KeyboardEvent) => void
function useKeyBindings(
	el: HTMLElement | Document,
	keyHandlerMap: Map<string, KeyHandler>,
	deps: $ReadOnlyArray<mixed>
) {
	const conditionalHandlers = Array.from(keyHandlerMap).map(
		([keyDesc, handler]) => {
			const matches: KeyboardEvent => boolean = isHotkey(keyDesc)
			return (e: KeyboardEvent) => {
				if (matches(e)) {
					handler(e)
				}
			}
		}
	)
	useKeydown(el, e => conditionalHandlers.forEach(h => h(e)), deps)
}

function Presenter({ modals, showModal, closeModal }: ContextType) {
	const rootRef = useRef<HTMLDivElement>(null)
	const showHelp = () => {
		showModal(<Help />)
	}

	useClick(
		document,
		(event: MouseEvent) => {
			if (rootRef && rootRef.current && rootRef.current === event.target) {
				closeModal()
			}
		},
		[]
	)
	useKeyBindings(
		document,
		new Map([
			['Escape', () => closeModal()],
			[
				'mod+k',
				(event: KeyboardEvent) => {
					event.preventDefault()
					if (!modals.length || modals[modals.length - 1].type !== JumpTo) {
						showModal(<JumpTo close={closeModal} />)
					}
				},
			],
			['mod+/', showHelp],
			['shift+/', showHelp],
		]),
		[modals]
	)

	usePreserveFocus(modals)

	useEffect(() => {
		subscribeToErrors(() => {
			showModal(<NetworkError close={closeModal} />)
		})
	}, [])

	if (!modals.length) {
		return null
	}

	return (
		<div
			ref={rootRef}
			css={css`
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.3);
				z-index: 1000;
				display: flex;
				justify-content: center;
			`}
		>
			{modals.map((modal, idx) =>
				React.cloneElement(modal, {
					key: idx,
				})
			)}
		</div>
	)
}

export default function ModalsPresenter({
	children,
}: {
	children: React.Node,
}) {
	const [modals, dispatch] = useReducer<State, Action>(modalsReducer, [])

	const modalContextValue = React.useMemo(
		() => ({
			modals,
			showModal: modal => dispatch({ type: 'SHOW_MODAL', payload: modal }),
			closeModal: () => dispatch({ type: 'HIDE_MODAL' }),
		}),
		[modals, dispatch]
	)
	return (
		<ModalContext.Provider value={modalContextValue}>
			{children}
			<Presenter {...modalContextValue} />
		</ModalContext.Provider>
	)
}
