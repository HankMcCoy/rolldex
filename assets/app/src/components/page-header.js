import * as React from 'react'
import styled from 'react-emotion'

import H1 from 'components/h1'
import { fromTheme } from 'theme'

const Root = styled('div')`
  background: ${fromTheme('campaignPurple')};
  height: ${fromTheme('topBarHeight')};
  line-height: ${fromTheme('topBarHeight')};
  padding-left: ${fromTheme('pageHzPadding')};
  padding-right: ${fromTheme('pageHzPadding')};
`

const Heading = styled(H1)`
  color: ${fromTheme('white')};
`

type Props = {
  title: string,
}
export default function PageHeader({ title }) {
  return (
    <Root>
      <Heading>{title}</Heading>
    </Root>
  )
}
