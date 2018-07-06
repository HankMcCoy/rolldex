// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { fromTheme } from 'r/theme'
import H3 from 'r/components/h3'

const StyledLink = styled(Link)`
  background: ${fromTheme('gray97')};
  border: 1px solid ${fromTheme('gray87')};
  color: ${fromTheme('textColor')};
  display: block;
  padding: 10px;
  text-decoration: none;
`

type Props = {
  title: string,
  description: string,
  to: string,
}
export default function ListCard({ title, description, to }: Props) {
  return (
    <StyledLink to={to}>
      <H3>{title}</H3>
      <div>{description}</div>
    </StyledLink>
  )
}
