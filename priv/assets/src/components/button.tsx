import styled, { css } from 'styled-components/macro'
import { Link } from 'react-router-dom'

import theme from 'r/theme'

export const UnstyledButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	font: unset;
`

export const Button = styled(UnstyledButton)`
	border-radius: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-family: Roboto;
	height: 34px;
	line-height: 1;
	width: 100px;
	text-align: center;
`

export const UnstyledLink = styled(Link)`
	color: unset;
	text-decoration: none;
`

export const LinkButton = Button.withComponent(UnstyledLink)

export const PrimaryButton = styled(Button)`
	background: ${theme.primaryGreen};
	color: ${theme.white};
	&:hover {
		background: ${theme.primaryGreenLight};
	}
`

const secondaryStyles = css`
	border: 1px solid rgba(0, 0, 0, 0.3);
	color: ${theme.gray38};
	background: rgba(255, 255, 255, 0.15);
	&:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(0, 0, 0, 0.5);
		color: ${theme.gray20};
	}
`
export const SecondaryButton = styled(Button)`
	${secondaryStyles}
`

export const SecondaryLinkButton = styled(LinkButton)`
	${secondaryStyles}
`

export default Button
