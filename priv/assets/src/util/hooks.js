// @flow
import { useEffect, useRef } from 'react'

export const useClick = (
	el: HTMLElement | Document,
	listener: MouseEvent => void,
	deps: ?$ReadOnlyArray<mixed>
) => {
	return useEffect(() => {
		el.addEventListener('click', listener)
		return () => el.removeEventListener('click', listener)
	}, deps)
}

export const useKeydown = (
	el: HTMLElement | Document,
	listener: KeyboardEvent => void,
	deps: ?$ReadOnlyArray<mixed>
) => {
	return useEffect(() => {
		el.addEventListener('keydown', listener)
		return () => el.removeEventListener('keydown', listener)
	}, deps)
}

export const usePrevious = <T>(value: T): T | null => {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
