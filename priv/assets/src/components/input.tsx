import styled, { css } from 'styled-components/macro'
import theme from 'r/theme'

const commonStyle = (props: { error?: string }) => css`
	border-width: 1px;
	border-style: solid;
	border-color: ${props.error ? theme.dangerRed : theme.gray50};
	border-radius: 2px;
	background: #fff;
	font: unset;
	width: 100%;
	max-width: 100%;
	min-width: 100%;
`

const singleLineStyle = css`
	height: 34px;
	line-height: 34px;
	padding: 5px 10px;
`
export const Input = styled.input`
	${commonStyle}
	${singleLineStyle}
`

export const Select = styled.select`
	${commonStyle}
	${singleLineStyle}
  & > option {
		font: unset;
	}
`
export const Textarea = styled.textarea`
	${commonStyle}
	line-height: 1.3;
	padding: 10px;
`
