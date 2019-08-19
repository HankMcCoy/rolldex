import styled from 'styled-components/macro'

import theme from 'r/theme'

const getPaddingSize = (val?: number) => (val === undefined ? '10px' : val)
interface Props {
	paddingTop?: number
	paddingRight?: number
	paddingBottom?: number
	paddingLeft?: number
}
const ListCard = styled.div<Props>`
	background: ${theme.gray97};
	border: 1px solid ${theme.gray87};
	color: ${theme.textColor};
	display: block;
	padding-top: ${({ paddingTop }) => getPaddingSize(paddingTop)};
	padding-right: ${({ paddingRight }) => getPaddingSize(paddingRight)};
	padding-bottom: ${({ paddingBottom }) => getPaddingSize(paddingBottom)};
	padding-left: ${({ paddingLeft }) => getPaddingSize(paddingLeft)};
	text-decoration: none;
`

export default ListCard
