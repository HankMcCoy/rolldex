// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'
import { css } from '@emotion/core'
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

export const SecondaryButton = styled(Button)`
	border: 1px solid ${theme.gray87};
	color: ${theme.gray38};
	&:hover {
		border-color: ${theme.gray38};
		color: ${theme.gray20};
	}
`

export const SecondaryLinkButton = SecondaryButton.withComponent(UnstyledLink)

export const IconButton = ({
	Icon,
	...props
}: {
	Icon: React.ComponentType<{}>,
}) => {
	return (
		<SecondaryLinkButton
			css={css`
				width: 34px;
				height: 34px;
				padding: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				path {
					stroke: ${theme.gray38};
				}
				&:hover path {
					stroke: ${theme.gray20};
				}
			`}
			{...props}
		>
			<Icon
				css={css`
					width: 16px;
					height: 16px;
				`}
			/>
		</SecondaryLinkButton>
	)
}

export default Button
