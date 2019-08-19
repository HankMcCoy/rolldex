import * as React from 'react'
import styled from 'styled-components'

import theme from 'r/theme'

export const Column = styled.div`
	flex: 1 0 0%;
	min-width: 0;
	@media (max-width: ${theme.breakpoints.phone}px) {
		flex: 0 0 auto;
	}
`

// prettier-ignore
const ColumnWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	${Column}:not(.last-child) {
		margin-right: ${props => props.gutterWidth}px;
	}

	@media (max-width: ${theme.breakpoints.phone}px) {
		flex-direction: column;
		${Column}:not(:last-child) {
			margin-right: 0;
			margin-bottom: ${props => props.gutterWidth}px;
		}
	}
`

type ColumnEl = React.ReactElement<typeof Column>

type Props = {
	gutterWidth?: number
	children: React.ReactNode
}
export default function ColumnView({ children, gutterWidth = 10 }: Props) {
	return <ColumnWrapper gutterWidth={gutterWidth}>{children}</ColumnWrapper>
}
