import * as React from 'react'
import styled from 'react-emotion'
import XSvg from 'r/svg/x'

const XBtnRoot = styled.button`
	background: none;
	border: none;
	width: 34px;
	height: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	& svg {
		stroke: #ccc;
		width: 14px;
		height: 14px;
	}
	&:hover svg {
		stroke: #888;
	}
	&:focus {
		outline: 1px solid rgba(0, 0, 0, 0.1);
	}
`

export default props => {
	return (
		<XBtnRoot {...props}>
			<XSvg />
		</XBtnRoot>
	)
}
