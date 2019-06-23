// @flow
import * as React from 'react'

import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'

export const Modal = ({
	children,
	className,
}: {
	children: React.Node,
	className?: string,
}) => (
	<div
		css={css`
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: flex-start;
		`}
	>
		<div
			css={css`
				position: relative;
				top: 20vh;
				background: #fff;
			`}
			className={className}
		>
			{children}
		</div>
	</div>
)

export const Header = styled.div`
	padding: 20px;
`
export const Body = styled.div`
	padding: 10px 20px;
`
export const ButtonSection = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 20px;
`
