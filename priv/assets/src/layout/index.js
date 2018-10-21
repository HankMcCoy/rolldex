// @flow

import * as React from 'react'
import styled from 'react-emotion'

import ScrollToTop from 'r/components/scroll-to-top'

import Sidebar from './sidebar'

const Root = styled('div')`
	display: flex;
	height: 100vh;
`

const SidebarContainer = styled('div')`
	flex: 0 0 300px;
	overflow-y: auto;
	display: flex;
`

const ContentContainer = styled('div')`
	flex: 1 0 0%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
`

type Props = {
	children: React.Node,
}
export default function Layout({ children }: Props) {
	return (
		<Root>
			<SidebarContainer>
				<Sidebar />
			</SidebarContainer>
			<ScrollToTop>
				<ContentContainer>{children}</ContentContainer>
			</ScrollToTop>
		</Root>
	)
}
