import * as React from 'react'
import styled, { css } from 'styled-components/macro'

import theme from 'r/theme'
import PlainLink from 'r/components/plain-link'
import { useSubAppColor } from 'r/util'

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
	color,
}: {
	invertedFoo: boolean
	color: string
}) => css`
	background: ${invertedFoo ? theme.white : color};
	color: ${invertedFoo ? color : theme.white};
`
const StyledButton = styled.button`
	${commonStyles};
	${commonDynamicStyles};
`

const StyledLink = styled(PlainLink)`
	${commonStyles};
	${commonDynamicStyles};
`

type Props = {
	inverted?: boolean
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	to?: string
}
function AddBtn({ inverted = false, onClick, to }: Props) {
	const color = useSubAppColor()
	if (onClick) {
		return (
			<StyledButton onClick={onClick} invertedFoo={inverted} color={color}>
				+
			</StyledButton>
		)
	}
	if (to) {
		return (
			<StyledLink to={to} invertedFoo={inverted} color={color}>
				+
			</StyledLink>
		)
	}
	throw new Error(
		'AddBtn requires either `onClick` or `to` to be provided as props'
	)
}

export default AddBtn
