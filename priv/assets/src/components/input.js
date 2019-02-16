import styled from '@emotion/styled/macro'
import { css } from '@emotion/core'

const commonStyle = css`
	border: 1px solid #484d4b;
	border-radius: 2px;
	background: #fff;
	font: unset;
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
