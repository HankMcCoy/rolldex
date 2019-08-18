import styled, { css } from 'styled-components'
import theme from 'r/theme'

const commonStyles = css`
	font-family: ${theme.titleFont.family};
	margin: 0;
`

export const H1 = styled('h1')`
	${commonStyles}
	font-size: 36px;
	font-weight: ${theme.titleFont.weights.veryLight};
`

export const H2 = styled('h2')`
	${commonStyles}
	font-size: 24px;
	font-weight: ${theme.titleFont.weights.veryLight};
`

export const H3 = styled('h3')`
	${commonStyles}
	font-size: 18px;
	font-weight: ${theme.titleFont.weights.light};
`
