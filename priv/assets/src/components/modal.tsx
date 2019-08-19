import * as React from 'react'

import styled from 'styled-components/macro'

export const Modal = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => (
	<div
		css={`
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
			css={`
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
