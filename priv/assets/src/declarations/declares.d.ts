import { CSSProp } from 'styled-components/macro'

interface MyTheme {}

declare module 'react' {
	interface Attributes {
		css?: CSSProp<MyTheme>
	}
}

declare module 'use-debounce' {
	declare let useDebounce: <T>(val: T, delay: number) => T
	export default useDebounce
}
