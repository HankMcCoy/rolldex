import * as React from 'react'
import styled from 'styled-components'

import Logo from './logo'
import Nav from './nav'

const Root = styled('div')`
	background-color: ${({ theme }) => theme.gray38};
	display: flex;
	flex-direction: column;
	flex: 1 0 0%;
`

const LogoWrp = styled('div')`
	flex: 0 0 ${({ theme }) => theme.topBarHeight};
`

const NavWrp = styled('div')`
	flex: 1 0 0%;
`

export default function Sidebar() {
	return (
		<Root>
			<LogoWrp>
				<Logo />
			</LogoWrp>
			<NavWrp>
				<Nav />
			</NavWrp>
		</Root>
	)
}
