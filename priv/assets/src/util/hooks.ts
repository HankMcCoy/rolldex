import { useEffect, useState, useRef, useMemo, useReducer } from 'react'

export { useModals } from '../modals/presenter'

export const useClick = (
	el: HTMLElement | Document,
	listener: (e: MouseEvent) => void,
	deps: any[]
) => {
	return useEffect(() => {
		el.addEventListener('click', listener as any)
		return () => el.removeEventListener('click', listener as any)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [el, listener, ...deps])
}

export const useKeydown = (
	el: HTMLElement | Document,
	listener: (e: KeyboardEvent) => void,
	deps: any[]
) => {
	return useEffect(() => {
		el.addEventListener('keydown', listener as any)
		return () => el.removeEventListener('keydown', listener as any)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [el, listener, ...deps])
}

export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T>()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export function useHover(): [
	React.MutableRefObject<HTMLElement | null>,
	boolean
] {
	const [value, setValue] = useState(false)

	const ref = useRef<HTMLElement | null>(null)

	const handleMouseOver = () => setValue(true)
	const handleMouseOut = () => setValue(false)

	useEffect(() => {
		const node = ref.current
		if (node) {
			node.addEventListener('mouseover', handleMouseOver)
			node.addEventListener('mouseout', handleMouseOut)

			return () => {
				node.removeEventListener('mouseover', handleMouseOver)
				node.removeEventListener('mouseout', handleMouseOut)
			}
		}
	}, [])

	return [ref, value]
}

export function useHoverCombo(
	delay: number = 150
): [
	React.MutableRefObject<HTMLElement | null>,
	React.MutableRefObject<HTMLElement | null>,
	boolean
] {
	const [isHovering, setIsHovering] = useState(false)
	const [refA, isHoveringA] = useHover()
	const [refB, isHoveringB] = useHover()
	const timeoutRef = useRef<number>()
	const latestHoveringA = useRef(isHoveringA)
	const latestHoveringB = useRef(isHoveringB)

	useEffect(() => {
		latestHoveringA.current = isHoveringA
		latestHoveringB.current = isHoveringB

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		if (isHoveringA || isHoveringB) {
			timeoutRef.current = setTimeout(() => {
				if (latestHoveringA.current || latestHoveringB.current) {
					setIsHovering(true)
				}
			}, delay)
		} else {
			timeoutRef.current = setTimeout(() => {
				if (!latestHoveringA.current && !latestHoveringB.current) {
					setIsHovering(false)
				}
			}, delay)
		}
	}, [isHoveringA, isHoveringB, delay])

	return [refA, refB, isHovering]
}

export function useInput(initValue?: string) {
	const [value, setValue] = useState(initValue || '')
	return {
		value,
		onChange: (e: { target: { value: string } }) => setValue(e.target.value),
	}
}

interface Action {
	type: any
}
function addLogging<S, A extends Action>(
	reducer: (state: S, action: A) => S
): (state: S, action: A) => S {
	return function loggingReducer(s, a) {
		const before = s
		const after = reducer(s, a)

		console.groupCollapsed(`%c${a.type}`, 'color: #444')
		console.log(
			'%cPrevious State:',
			'color: #9E9E9E; font-weight: 700;',
			before
		)
		console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', a)
		console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', after)
		console.groupEnd()
		return after
	}
}

function useReducerWithLogging<S, A extends Action>(
	reducer: (state: S, action: A) => S,
	initState: S
): [S, (action: A) => void] {
	const reducerWithLogging = useMemo(() => addLogging(reducer), [reducer])
	return useReducer(reducerWithLogging, initState)
}

export { useReducerWithLogging as useReducer }
