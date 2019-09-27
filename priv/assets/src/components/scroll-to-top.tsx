import * as React from 'react'
import { useLocation } from 'react-router'

export function useScrollToTop<T>({ ref }: { ref: React.RefObject<T> }) {
	const location = useLocation()
	React.useEffect(() => {
		if (ref.current && ref.current instanceof HTMLElement) {
			ref.current.scrollTop = 0
		}
	}, [location, ref])
}
