// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { withRouter } from 'react-router-dom'

import H1 from 'r/components/h1'
import { fromTheme } from 'r/theme'
import { getSubAppColor } from 'r/util'

const Root = styled('div')`
  background: ${getSubAppColor};
  height: ${fromTheme('topBarHeight')};
  flex: 0 0 ${fromTheme('topBarHeight')};
  line-height: ${fromTheme('topBarHeight')};
  padding-left: ${fromTheme('pageHzPadding')};
  padding-right: ${fromTheme('pageHzPadding')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled('div')`
  flex: 0 0 auto;
`

const Right = styled('div')`
  flex: 0 0 auto;
`

const Heading = styled(H1)`
  color: ${fromTheme('white')};
`

type Props = {
  title: string,
  match: {
    path: string,
  },
  controls?: React.Node,
}
function PageHeader({ title, match, controls }: Props) {
  return (
    <Root match={match}>
      <Left>
        <Heading>{title}</Heading>
      </Left>
      <Right>{controls}</Right>
    </Root>
  )
}

export default withRouter(PageHeader)
