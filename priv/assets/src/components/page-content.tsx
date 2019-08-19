import * as React from 'react'
import styled from 'styled-components/macro'
import theme from 'r/theme'

const Root = styled('div')`
	padding-top: 20px;
	padding-right: ${theme.pageHzPadding};
	padding-bottom: 20px;
	padding-left: ${theme.pageHzPadding};
	flex: 1 0 0%;
`

type Props = {
	children: React.ReactNode
}
export default function PageContent({ children }: Props) {
	return <Root>{children}</Root>
}
