// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { fromTheme } from 'theme'

const StyledLink = styled(Link)`
  align-items: center;
  background-color: ${fromTheme('gray20')};
  color: ${fromTheme('white')};
  font-size: 36px;
  font-weight: 300;
  display: flex;
  height: ${fromTheme('topBarHeight')};
  line-height: ${fromTheme('topBarHeight')};
  padding-left: ${fromTheme('sidebarHzPadding')};
  text-decoration: none;
`
type Props = {}
export default function Logo() {
  return <StyledLink to="/">Rolldex</StyledLink>
}
