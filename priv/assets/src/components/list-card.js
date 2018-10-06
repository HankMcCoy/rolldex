// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { fromTheme } from 'r/theme'
import H3 from './h3'
import Spacer from './spacer'

const Root = styled.div`
  background: ${fromTheme('gray97')};
  border: 1px solid ${fromTheme('gray87')};
  color: ${fromTheme('textColor')};
  display: block;
  padding: 10px;
  text-decoration: none;
`
const StyledLink = Root.withComponent(Link)

type Props = {
  title: string,
  description?: string,
  to?: string,
}
export default function ListCard({ title, description, to }: Props) {
  const content = description ? (
    <React.Fragment>
      <H3>{title}</H3>
      <Spacer height={10} />
      {description}
    </React.Fragment>
  ) : (
    <H3>{title}</H3>
  )

  return to ? (
    <StyledLink to={to}>{content}</StyledLink>
  ) : (
    <Root>{content}</Root>
  )
}
