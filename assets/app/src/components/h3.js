// @flow

import styled from 'react-emotion'

export default styled('h3')`
  font-family: ${({ theme }) => theme.titleFont.family};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.titleFont.weights.light};
`
