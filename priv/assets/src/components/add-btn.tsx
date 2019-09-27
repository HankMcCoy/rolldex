import * as React from 'react'
import styled, { css } from 'styled-components/macro'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'

import theme from 'r/theme'
import PlainLink from 'r/components/plain-link'
import { getSubAppColor } from 'r/util'

const commonStyles = css`
	text-decoration: none;
	height: 34px;
	width: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	border-radius: 3px;
	cursor: pointer;
	border: none;
`
const commonDynamicStyles = ({
	invertedFoo,
	match,
}: {
	invertedFoo: boolean
	match: { path: string }
}) => css`
	background: ${invertedFoo ? theme.white : getSubAppColor({ match })};
	color: ${invertedFoo ? getSubAppColor({ match }) : theme.white};
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
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
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
