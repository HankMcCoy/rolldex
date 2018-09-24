// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { fromTheme } from 'r/theme'

const Root = styled('div')`
  padding-top: 20px;
  padding-right: ${fromTheme('pageHzPadding')};
  padding-bottom: 20px;
  padding-left: ${fromTheme('pageHzPadding')};
  flex: 1 0 0%;
`

type Props = {
  children: React.Node,
}
export default function PageContent({ children }: Props) {
  return <Root>{children}</Root>
}
