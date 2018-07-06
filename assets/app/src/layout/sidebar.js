// @flow
import * as React from 'react'
import { css } from 'emotion'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import Logo from './logo'
import Nav from './nav'

const Root = styled('div')`
  background-color: ${({ theme }) => theme.gray38};
  display: flex;
  flex-direction: column;
  flex: 1 0 0%;
`

const LogoWrp = styled('div')`
  flex: 0 0 ${({ theme }) => theme.topBarHeight};
`

const NavWrp = styled('div')`
  flex: 1 0 0%;
`

type Props = {}
export default function Sidebar({  }: Props) {
  return (
    <Root>
      <LogoWrp>
        <Logo />
      </LogoWrp>
      <NavWrp>
        <Nav />
      </NavWrp>
    </Root>
  )
}
