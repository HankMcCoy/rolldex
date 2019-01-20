// @flow

import styled from '@emotion/styled/macro'

export default styled('h1')`
	font-family: ${({ theme }) => theme.titleFont.family};
	font-size: 36px;
	font-weight: ${({ theme }) => theme.titleFont.weights.veryLight};
`
