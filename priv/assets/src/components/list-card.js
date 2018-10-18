// @flow
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'

const getPaddingSize = val => (val === undefined ? '10px' : val)
const ListCard = styled.div`
	background: ${fromTheme('gray97')};
	border: 1px solid ${fromTheme('gray87')};
	color: ${fromTheme('textColor')};
	display: block;
	padding-top: ${({ paddingTop }) => getPaddingSize(paddingTop)};
	padding-right: ${({ paddingRight }) => getPaddingSize(paddingRight)};
	padding-bottom: ${({ paddingBottom }) => getPaddingSize(paddingBottom)};
	padding-left: ${({ paddingLeft }) => getPaddingSize(paddingLeft)};
	text-decoration: none;
`

export default ListCard
