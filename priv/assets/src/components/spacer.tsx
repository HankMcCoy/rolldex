import styled from 'styled-components/macro'

interface Dimensions {
	width?: number
	height?: number
}

export const Spacer = styled.div<Dimensions>`
	flex: 0 0 auto;
	height: ${({ height }) => height}px;
	width: ${({ width }) => width}px;
`

export const SpaceChildren = styled.div<Dimensions>`
	& > *:not(:last-child) {
		margin-bottom: ${({ height }) => height}px;
		margin-right: ${({ width }) => width}px;
	}
`
