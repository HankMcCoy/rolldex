import * as React from 'react'
import styled, { css } from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'

import PlainLink from 'r/components/plain-link'
import { getSubAppColor } from 'r/util'

const commonStyles = css`
	textdecoration: none;
	height: 34px;
	width: 34px;
	display: flex;
	alignitems: center;
	justifycontent: center;
	fontsize: 24px;
	borderradius: 3px;
	cursor: pointer;
	border: none;
`
const commonDynamicStyles = ({ invertedFoo, match, theme }) => css`
	background: ${invertedFoo ? theme.white : getSubAppColor({ match, theme })};
	color: ${invertedFoo ? getSubAppColor({ match, theme }) : theme.white};
`
const StyledButton = styled.button`
	${commonStyles};
	${commonDynamicStyles};
`

const StyledLink = styled(PlainLink)`
	${commonStyles};
	${commonDynamicStyles};
`

type Props<MP> = {
	inverted?: boolean
	onClick?: (MouseEvent) => void
	to?: string
} & RouteComponentProps<MP>
function AddBtn<MatchParams>({
	inverted = false,
	onClick,
	to,
	match,
}: Props<MatchParams>) {
	if (onClick) {
		return (
			<StyledButton onClick={onClick} invertedFoo={inverted} match={match}>
				+
			</StyledButton>
		)
	}
	if (to) {
		return (
			<StyledLink to={to} invertedFoo={inverted} match={match}>
				+
			</StyledLink>
		)
	}
	throw new Error(
		'AddBtn requires either `onClick` or `to` to be provided as props'
	)
}

export default withRouter(AddBtn)
