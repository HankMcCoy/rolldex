// @flow
import { useEffect, useState, useRef } from 'react'

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

export function useHover() {
	const [value, setValue] = useState(false)

	const ref = useRef<HTMLElement>(null)

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
	}, [ref.current])

	return [ref, value]
}
