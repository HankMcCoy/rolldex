import * as React from 'react'
import styled from 'styled-components/macro'

export const Spacer: React.ComponentType<{
	width?: number
	height?: number
}> = styled.div`
	flex: 0 0 auto;
	height: ${({ height }) => height}px;
	width: ${({ width }) => width}px;
`

export const SpaceChildren: React.ComponentType<{
	width?: Number
	height?: number
}> = styled.div`
	& > *:not(:last-child) {
		margin-bottom: ${({ height }) => height}px;
		margin-right: ${({ width }) => width}px;
	}
`
