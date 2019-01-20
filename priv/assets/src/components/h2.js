// @flow

import styled from '@emotion/styled/macro'

export default styled('h2')`
	font-family: ${({ theme }) => theme.titleFont.family};
	font-size: 24px;
	font-weight: ${({ theme }) => theme.titleFont.weights.veryLight};
`
