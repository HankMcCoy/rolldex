// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { withRouter, matchPath } from 'react-router-dom'

import H1 from 'r/components/h1'
import { fromTheme } from 'r/theme'

const Root = styled('div')`
  background: ${({ subApp, theme }) =>
    subApp === 'campaigns' ? theme.campaignPurple : theme.systemBlue};
  height: ${fromTheme('topBarHeight')};
  line-height: ${fromTheme('topBarHeight')};
  padding-left: ${fromTheme('pageHzPadding')};
  padding-right: ${fromTheme('pageHzPadding')};
`

const Heading = styled(H1)`
  color: ${fromTheme('white')};
`

type SubApp = 'campaigns' | 'systems'
const getSubApp = (path: string): SubApp => {
  if (matchPath(path, { path: '/campaigns' })) return 'campaigns'
  if (matchPath(path, { path: '/systems' })) return 'systems'
  throw new Error('HOW STYLE HEADERS??')
}

type Props = {
  title: string,
  match: Object,
}
function PageHeader({ title, match }: Props) {
  const subApp = getSubApp(match.path)
  return (
    <Root subApp={subApp}>
      <Heading>{title}</Heading>
    </Root>
  )
}

export default withRouter(PageHeader)
