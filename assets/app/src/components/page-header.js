// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { withRouter, Link } from 'react-router-dom'

import H1 from 'r/components/h1'
import Spacer from 'r/components/spacer'
import { LinkButton } from 'r/components/button'
import { fromTheme } from 'r/theme'
import { getSubAppColor, intersperse } from 'r/util'

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
  height: 40px;
  line-height: 30px;
  color: ${fromTheme('white')};
`

const BreadcrumbsWrapper = styled.div`
  display: flex;
  opacity: 0.85;
`

const Breadcrumb = styled(Link)`
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  color: ${fromTheme('white')};
`

const Separator = styled.div`
  display: flex;
  color: ${fromTheme('white')};
  &::before {
    content: '>';
    display: block;
    text-align: center;
    line-height: 40px;
    width: 15px;
  }
`

export const HeaderButton = styled(LinkButton)`
  width: auto;
  height: 45px;
  padding: 0 15px;
  border: 1px solid ${fromTheme('white')};
  color: ${fromTheme('white')};
`

type BreadcrumbDesc = {
  text: string,
  to: string,
}
type ExternalProps = {|
  title: string,
  breadcrumbs?: Array<BreadcrumbDesc>,
  controls?: React.Node,
|}
type RouterProps = {
  match: {
    path: string,
  },
}
function PageHeader({
  title,
  match,
  breadcrumbs,
  controls,
}: ExternalProps & RouterProps) {
  return (
    <Root match={match}>
      <Left>
        <Spacer height={10} />
        {breadcrumbs && (
          <BreadcrumbsWrapper>
            {intersperse(
              breadcrumbs.map(({ text, to }) => (
                <Breadcrumb to={to}>{text}</Breadcrumb>
              )),
              i => <Separator key={`sep-${i}`} />,
            )}
          </BreadcrumbsWrapper>
        )}
        <Heading>{title}</Heading>
        <Spacer height={10} />
      </Left>
      <Right>{controls}</Right>
    </Root>
  )
}

const PageHeaderExport: React.ComponentType<ExternalProps> = withRouter(
  PageHeader,
)
export default PageHeaderExport
