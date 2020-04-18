import * as React from 'react'
import styled from 'styled-components/macro'

import { useScrollToTop } from 'r/components/scroll-to-top'
import theme from 'r/theme'

import Sidebar from './sidebar'

const Root = styled('div')`
	display: flex;
	@media (min-width: ${theme.breakpoints.smallDesktop + 1}px) {
		height: 100vh;
	}
`

const SidebarContainer = styled('div')`
	flex: 0 0 300px;
	overflow-y: auto;
	display: flex;
	@media (max-width: ${theme.breakpoints.smallDesktop}px) {
		flex: 0;
	}
`

const ContentContainer = styled.div`
	flex: 1 0 0%;
	display: flex;
	flex-direction: column;
	@media (min-width: ${theme.breakpoints.smallDesktop + 1}px) {
		overflow-y: auto;
	}
`

type Props = {
	children: React.ReactNode
}
export default function Layout({ children }: Props) {
	const ref = React.createRef<HTMLDivElement>()
	useScrollToTop({ ref })

	return (
		<Root>
			<SidebarContainer>
				<Sidebar />
			</SidebarContainer>
			<ContentContainer ref={ref}>{children}</ContentContainer>
		</Root>
	)
}
