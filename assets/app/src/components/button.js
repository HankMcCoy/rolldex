// @flow
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { fromTheme } from 'r/theme'

export const Button = styled('button')`
  background: none;
  border: none;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: Roboto;
  height: 34px;
  width: 100px;
  cursor: pointer;
`

const UnstyledLink = styled(Link)`
  text-decoration: none;
`

export const LinkButton = Button.withComponent(UnstyledLink)

export const PrimaryButton = styled(Button)`
  background: ${fromTheme('primaryGreen')};
  color: ${fromTheme('white')};
`

export const SecondaryButton = styled(Button)`
  border: 1px solid ${fromTheme('gray20')};
  color: ${fromTheme('gray20')};
`

export default Button
