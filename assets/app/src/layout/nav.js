// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { NavLink } from 'react-router-dom'

import { fromTheme } from 'theme'

const StyledNav = styled('div')`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(NavLink)`
  color: ${fromTheme('white')};
  font-size: 24px;
  font-weight: ${fromTheme('contentFont.weights.veryLight')};
  height: 45px;
  line-height: 45px;
  padding-left: ${fromTheme('sidebarHzPadding')};
  text-decoration: none;
`

type Props = {}
export default function Nav({  }: Props) {
  return (
    <StyledNav>
      <StyledLink to="/systems">Systems</StyledLink>
      <StyledLink to="/campaigns">Campaigns</StyledLink>
    </StyledNav>
  )
}
