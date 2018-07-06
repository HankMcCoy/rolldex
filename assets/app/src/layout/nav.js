// @flow
import * as React from 'react'
import { css } from 'emotion'
import styled from 'react-emotion'
import { NavLink } from 'react-router-dom'

import theme, { fromTheme } from 'r/theme'

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

const active = css`
  background-color: ${theme.gray30};
`

export default function Nav() {
  return (
    <StyledNav>
      <StyledLink to="/systems" activeClassName={active}>
        Systems
      </StyledLink>
      <StyledLink to="/campaigns" activeClassName={active}>
        Campaigns
      </StyledLink>
    </StyledNav>
  )
}
