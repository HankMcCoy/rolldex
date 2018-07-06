// @flow
import * as React from 'react'
import styled from 'react-emotion'

const SSpacer = styled('div')`
  flex: 0 0 auto;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`
type Props = {
  width?: number,
  height?: number,
}
export default function Spacer(props: Props) {
  return <SSpacer {...props} />
}
