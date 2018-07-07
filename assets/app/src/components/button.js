// @flow
import * as React from 'react'
import styled from 'react-emotion'

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

export const PrimaryButton = styled(Button)`
  background: ${fromTheme('primaryGreen')};
  color: ${fromTheme('white')};
`

export const SecondaryButton = styled(Button)`
  border: 1px solid ${fromTheme('gray20')};
  color: ${fromTheme('gray20')};
`

export default Button
