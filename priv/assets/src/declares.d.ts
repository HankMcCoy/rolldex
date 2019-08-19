import { CSSProp } from 'styled-components'

interface MyTheme {}

declare module 'react' {
	interface Attributes {
		css?: CSSProp<MyTheme>
	}
}

declare module 'hot-formula-parser'
