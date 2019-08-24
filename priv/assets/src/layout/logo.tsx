import * as React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import theme from 'r/theme'

const StyledLink = styled(Link)`
	align-items: center;
	background-color: ${theme.gray20};
	color: ${theme.white};
	font-size: 36px;
	font-weight: 300;
	display: flex;
	height: ${theme.topBarHeight};
	line-height: ${theme.topBarHeight};
	padding-left: ${theme.sidebarHzPadding}px;
	text-decoration: none;
`
export default function Logo() {
	return <StyledLink to="/">Rolldex</StyledLink>
}
